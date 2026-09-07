package com.modeva.clothing.service;

import com.modeva.clothing.dto.CustomerResponse;

import com.modeva.clothing.entity.Customer;
import com.modeva.clothing.entity.CustomerStatus;
import com.modeva.clothing.entity.Order;

import com.modeva.clothing.exception.CustomerNotFoundException;

import com.modeva.clothing.repository.CustomerRepository;
import com.modeva.clothing.repository.OrderRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository
            customerRepository;

    private final OrderRepository
            orderRepository;

    /*
     * ADMIN
     *
     * Returns all customers.
     */
    public List<CustomerResponse>
    getAllCustomers() {

        return customerRepository
                .findAll()
                .stream()
                .map(
                        this::mapToResponse
                )
                .toList();
    }

    /*
     * ADMIN
     *
     * Returns one customer by database ID.
     */
    public CustomerResponse
    getCustomerById(
            Long id
    ) {

        Customer customer =
                customerRepository
                        .findById(id)
                        .orElseThrow(
                                () ->
                                        new CustomerNotFoundException(
                                                "Customer not found with id: "
                                                        + id
                                        )
                        );

        return mapToResponse(
                customer
        );
    }

    /*
     * CUSTOMER
     *
     * Called when an authenticated customer
     * places an order.
     *
     * The Keycloak user ID is the primary
     * identity.
     *
     * For older database rows, we temporarily
     * fall back to email and attach the
     * Keycloak user ID to that customer.
     */
    @Transactional
    public Customer
    registerOrUpdateCustomer(
            String keycloakUserId,
            String name,
            String email,
            String phone
    ) {

        if (
                keycloakUserId == null ||
                keycloakUserId.isBlank()
        ) {
            throw new IllegalArgumentException(
                    "Authenticated user ID is required."
            );
        }

        String normalizedKeycloakUserId =
                keycloakUserId.trim();

        String normalizedEmail =
                email
                        .trim()
                        .toLowerCase();

        String normalizedName =
                name.trim();

        String normalizedPhone =
                phone.trim();

        /*
         * First try the proper identity:
         * Keycloak user ID.
         */
        Customer customer =
                customerRepository
                        .findByKeycloakUserId(
                                normalizedKeycloakUserId
                        )
                        .orElse(null);

        /*
         * Migration compatibility:
         *
         * Older customer rows were created
         * using only email.
         *
         * If we find one, attach the current
         * Keycloak ID instead of creating
         * a duplicate customer.
         */
        if (
                customer == null
        ) {

            customer =
                    customerRepository
                            .findByEmail(
                                    normalizedEmail
                            )
                            .orElse(null);

            if (
                    customer != null
            ) {

                /*
                 * Only attach the Keycloak ID
                 * if this old customer does not
                 * already belong to another
                 * Keycloak account.
                 */
                if (
                        customer.getKeycloakUserId()
                                == null ||
                        customer.getKeycloakUserId()
                                .isBlank()
                ) {

                    customer.setKeycloakUserId(
                            normalizedKeycloakUserId
                    );

                } else if (
                        !customer.getKeycloakUserId()
                                .equals(
                                        normalizedKeycloakUserId
                                )
                ) {

                    throw new IllegalStateException(
                            "This customer email is already linked to another account."
                    );
                }
            }
        }

        /*
         * Completely new customer.
         */
        if (
                customer == null
        ) {

            customer =
                    Customer.builder()
                            .keycloakUserId(
                                    normalizedKeycloakUserId
                            )
                            .name(
                                    normalizedName
                            )
                            .email(
                                    normalizedEmail
                            )
                            .phone(
                                    normalizedPhone
                            )
                            .status(
                                    CustomerStatus.ACTIVE
                            )
                            .build();
        }

        /*
         * Update the latest customer details.
         */
        customer.setName(
                normalizedName
        );

        customer.setEmail(
                normalizedEmail
        );

        customer.setPhone(
                normalizedPhone
        );

        return customerRepository
                .save(
                        customer
                );
    }

    /*
 * CUSTOMER
 *
 * Return the currently authenticated
 * customer's profile using the Keycloak
 * subject as the identity.
 */
@Transactional
public CustomerResponse syncCurrentCustomer(
        String keycloakUserId,
        String email,
        String displayName
) {

    if (
            keycloakUserId == null ||
            keycloakUserId.isBlank()
    ) {
        throw new IllegalArgumentException(
                "Authenticated user ID is required."
        );
    }

    if (
            email == null ||
            email.isBlank()
    ) {
        throw new IllegalArgumentException(
                "Authenticated user email is required."
        );
    }

    String normalizedKeycloakUserId =
            keycloakUserId.trim();

    String normalizedEmail =
            email
                    .trim()
                    .toLowerCase();

    String normalizedName =
            displayName != null &&
            !displayName.isBlank()
                    ? displayName.trim()
                    : normalizedEmail;

    /*
     * First try the proper Keycloak identity.
     */
    Customer customer =
            customerRepository
                    .findByKeycloakUserId(
                            normalizedKeycloakUserId
                    )
                    .orElse(null);

    /*
     * Already linked customer.
     *
     * Email comes from Keycloak, so keep
     * the database email synchronized.
     *
     * Do NOT overwrite name or phone,
     * because the customer may have edited
     * those inside MODEVA.
     */
    if (
            customer != null
    ) {

        customer.setEmail(
                normalizedEmail
        );

        Customer updatedCustomer =
                customerRepository.save(
                        customer
                );

        return mapToResponse(
                updatedCustomer
        );
    }

    /*
     * Migration support:
     *
     * Customer may have existed before
     * Keycloak ID linking was introduced.
     */
    customer =
            customerRepository
                    .findByEmail(
                            normalizedEmail
                    )
                    .orElse(null);

    if (
            customer != null
    ) {

        if (
                customer.getKeycloakUserId() == null ||
                customer.getKeycloakUserId().isBlank()
        ) {

            customer.setKeycloakUserId(
                    normalizedKeycloakUserId
            );

        } else if (
                !customer.getKeycloakUserId()
                        .equals(
                                normalizedKeycloakUserId
                        )
        ) {

            throw new IllegalStateException(
                    "This email is already linked to another account."
            );
        }

        Customer linkedCustomer =
                customerRepository.save(
                        customer
                );

        return mapToResponse(
                linkedCustomer
        );
    }

    /*
     * Brand-new Keycloak user.
     *
     * Phone starts empty because Keycloak
     * currently does not provide it.
     */
    Customer newCustomer =
            Customer.builder()
                    .keycloakUserId(
                            normalizedKeycloakUserId
                    )
                    .name(
                            normalizedName
                    )
                    .email(
                            normalizedEmail
                    )
                    .phone("")
                    .status(
                            CustomerStatus.ACTIVE
                    )
                    .build();

    Customer savedCustomer =
            customerRepository.save(
                    newCustomer
            );

    return mapToResponse(
            savedCustomer
    );
}


public CustomerResponse
getCurrentCustomer(
        String keycloakUserId
) {

    if (
            keycloakUserId == null ||
            keycloakUserId.isBlank()
    ) {
        throw new IllegalArgumentException(
                "Authenticated user ID is required."
        );
    }

    Customer customer =
            customerRepository
                    .findByKeycloakUserId(
                            keycloakUserId.trim()
                    )
                    .orElseThrow(
                            () ->
                                    new CustomerNotFoundException(
                                            "Customer profile not found."
                                    )
                    );

    return mapToResponse(
            customer
    );
}


/*
 * CUSTOMER
 *
 * Update the currently authenticated
 * customer's profile.
 *
 * A customer cannot provide another
 * customer ID in the request.
 */
@Transactional
public CustomerResponse
updateCurrentCustomer(
        String keycloakUserId,
        String name,
        String phone
) {

    if (
            keycloakUserId == null ||
            keycloakUserId.isBlank()
    ) {
        throw new IllegalArgumentException(
                "Authenticated user ID is required."
        );
    }

    Customer customer =
            customerRepository
                    .findByKeycloakUserId(
                            keycloakUserId.trim()
                    )
                    .orElseThrow(
                            () ->
                                    new CustomerNotFoundException(
                                            "Customer profile not found."
                                    )
                    );

    customer.setName(
            name.trim()
    );

    customer.setPhone(
            phone.trim()
    );

    Customer updatedCustomer =
            customerRepository
                    .save(
                            customer
                    );

    return mapToResponse(
            updatedCustomer
    );
}

    /*
     * ADMIN
     *
     * Change customer status.
     */
    @Transactional
    public CustomerResponse
    updateCustomerStatus(
            Long id,
            CustomerStatus status
    ) {

        Customer customer =
                customerRepository
                        .findById(id)
                        .orElseThrow(
                                () ->
                                        new CustomerNotFoundException(
                                                "Customer not found with id: "
                                                        + id
                                        )
                        );

        customer.setStatus(
                status
        );

        Customer updatedCustomer =
                customerRepository
                        .save(
                                customer
                        );

        return mapToResponse(
                updatedCustomer
        );
    }

    /*
     * Build customer statistics.
     *
     * New customers:
     * use Keycloak ownership.
     *
     * Old customers:
     * temporarily fall back to email.
     */
    private CustomerResponse
    mapToResponse(
            Customer customer
    ) {

        List<Order> orders;

        if (
                customer.getKeycloakUserId()
                        != null &&
                !customer.getKeycloakUserId()
                        .isBlank()
        ) {

            orders =
                    orderRepository
                            .findAllByKeycloakUserIdOrderByCreatedAtDesc(
                                    customer.getKeycloakUserId()
                            );

        } else {

            String customerEmail =
                    customer
                            .getEmail()
                            .trim()
                            .toLowerCase();

            orders =
                    orderRepository
                            .findAllByEmail(
                                    customerEmail
                            );
        }

        BigDecimal totalSpent =
                orders
                        .stream()
                        .map(
                                Order::getTotal
                        )
                        .filter(
                                total ->
                                        total != null
                        )
                        .reduce(
                                BigDecimal.ZERO,
                                BigDecimal::add
                        );

        return new CustomerResponse(
                customer.getId(),
                customer.getName(),
                customer.getEmail(),
                customer.getPhone(),
                orders.size(),
                totalSpent,
                customer.getJoinedAt(),
                customer.getStatus()
        );
    }
}