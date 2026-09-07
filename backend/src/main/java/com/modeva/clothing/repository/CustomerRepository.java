package com.modeva.clothing.repository;

import com.modeva.clothing.entity.Customer;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository
        extends JpaRepository<Customer, Long> {

    Optional<Customer>
    findByKeycloakUserId(
            String keycloakUserId
    );

    Optional<Customer>
    findByEmail(
            String email
    );

    boolean existsByKeycloakUserId(
            String keycloakUserId
    );

    boolean existsByEmail(
            String email
    );
}