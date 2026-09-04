package com.modeva.clothing.repository;

import com.modeva.clothing.entity.Order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository
        extends JpaRepository<Order, Long> {

    Optional<Order> findByOrderNumber(
            String orderNumber
    );

    /*
     * CUSTOMER:
     * Get only orders owned by the
     * authenticated Keycloak account.
     */
    List<Order>
    findAllByKeycloakUserIdOrderByCreatedAtDesc(
            String keycloakUserId
    );

    /*
     * CUSTOMER:
     * Find order only when both
     * ID and owner match.
     */
    Optional<Order>
    findByIdAndKeycloakUserId(
            Long id,
            String keycloakUserId
    );

    /*
     * CUSTOMER:
     * Same ownership check when
     * using the public order number.
     */
    Optional<Order>
    findByOrderNumberAndKeycloakUserId(
            String orderNumber,
            String keycloakUserId
    );
}