package com.modeva.clothing.repository;

import com.modeva.clothing.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository
        extends JpaRepository<Order, Long> {

    Optional<Order> findByOrderNumber(
            String orderNumber
    );

    List<Order> findAllByEmail(
            String email
    );

    long countByEmail(
            String email
    );
}