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

    public List<CustomerResponse>
    getAllCustomers() {

        return customerRepository
                .findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public CustomerResponse
    getCustomerById(
            Long id
    ) {

        Customer customer =
                customerRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new CustomerNotFoundException(
                                        "Customer not found with id: "
                                                + id
                                )
                        );

        return mapToResponse(
                customer
        );
    }

    @Transactional
    public Customer registerOrUpdateCustomer(
            String name,
            String email,
            String phone
    ) {

        String normalizedEmail =
                email
                        .trim()
                        .toLowerCase();

        Customer customer =
                customerRepository
                        .findByEmail(
                                normalizedEmail
                        )
                        .orElseGet(() ->
                                Customer.builder()
                                        .name(name)
                                        .email(
                                                normalizedEmail
                                        )
                                        .phone(phone)
                                        .status(
                                                CustomerStatus.ACTIVE
                                        )
                                        .build()
                        );

        customer.setName(name);
        customer.setPhone(phone);

        return customerRepository.save(
                customer
        );
    }

    @Transactional
    public CustomerResponse
    updateCustomerStatus(
            Long id,
            CustomerStatus status
    ) {

        Customer customer =
                customerRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new CustomerNotFoundException(
                                        "Customer not found with id: "
                                                + id
                                )
                        );

        customer.setStatus(
                status
        );

        Customer updatedCustomer =
                customerRepository.save(
                        customer
                );

        return mapToResponse(
                updatedCustomer
        );
    }

    private CustomerResponse mapToResponse(
            Customer customer
    ) {

        List<Order> orders =
                orderRepository
                        .findAllByEmail(
                                customer.getEmail()
                        );

        BigDecimal totalSpent =
                orders.stream()
                        .map(Order::getTotal)
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