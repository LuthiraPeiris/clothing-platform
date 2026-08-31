package com.modeva.clothing.repository;

import com.modeva.clothing.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InventoryRepository
        extends JpaRepository<Inventory, Long> {

    Optional<Inventory> findByProductId(Long productId);

    boolean existsByProductId(Long productId);

    boolean existsBySku(String sku);

    void deleteByProductId(Long productId);
}