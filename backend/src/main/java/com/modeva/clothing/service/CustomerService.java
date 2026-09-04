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
     * Returns all registered customers.
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
     * Called when a customer places
     * an order.
     *
     * If the email already exists,
     * update the customer's latest
     * name and phone number.
     *
     * Otherwise create a new
     * customer record.
     */
    @Transactional
    public Customer
    registerOrUpdateCustomer(
            String name,
            String email,
            String phone
    ) {

        String normalizedEmail =
                email
                        .trim()
                        .toLowerCase();

        String normalizedName =
                name.trim();

        String normalizedPhone =
                phone.trim();

        Customer customer =
                customerRepository
                        .findByEmail(
                                normalizedEmail
                        )
                        .orElseGet(
                                () ->
                                        Customer.builder()
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
                                                .build()
                        );

        customer.setName(
                normalizedName
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
     * Existing customer records are
     * currently identified by email,
     * so we match historical orders
     * using normalized email.
     */
    private CustomerResponse
    mapToResponse(
            Customer customer
    ) {

        String customerEmail =
                customer
                        .getEmail()
                        .trim()
                        .toLowerCase();

        List<Order> orders =
                orderRepository
                        .findAll()
                        .stream()
                        .filter(
                                order ->
                                        order.getEmail() != null
                                                &&
                                                order.getEmail()
                                                        .trim()
                                                        .equalsIgnoreCase(
                                                                customerEmail
                                                        )
                        )
                        .toList();

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