package com.modeva.clothing.service;

import com.modeva.clothing.dto.InventoryRequest;
import com.modeva.clothing.dto.InventoryResponse;

import com.modeva.clothing.entity.Inventory;
import com.modeva.clothing.entity.Product;

import com.modeva.clothing.exception.DuplicateInventoryException;
import com.modeva.clothing.exception.InventoryNotFoundException;
import com.modeva.clothing.exception.ProductNotFoundException;

import com.modeva.clothing.repository.InventoryRepository;
import com.modeva.clothing.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private static final int
            DEFAULT_LOW_STOCK_THRESHOLD = 5;

    private final InventoryRepository inventoryRepository;

    private final ProductRepository productRepository;

    public List<InventoryResponse> getAllInventory() {

        return inventoryRepository
                .findAll()
                .stream()
                .map(
                        this::mapToResponse
                )
                .toList();
    }

    public InventoryResponse getInventoryByProductId(
            Long productId
    ) {

        Inventory inventory =
                inventoryRepository
                        .findByProductId(
                                productId
                        )
                        .orElseThrow(
                                () ->
                                        new InventoryNotFoundException(
                                                "Inventory not found for product id: "
                                                        + productId
                                        )
                        );

        return mapToResponse(
                inventory
        );
    }

    @Transactional
    public InventoryResponse createInventory(
            InventoryRequest request
    ) {

        Product product =
                productRepository
                        .findById(
                                request.productId()
                        )
                        .orElseThrow(
                                () ->
                                        new ProductNotFoundException(
                                                "Product not found with id: "
                                                        + request.productId()
                                        )
                        );

        if (
                inventoryRepository
                        .existsByProductId(
                                request.productId()
                        )
        ) {

            throw new DuplicateInventoryException(
                    "Inventory already exists for product id: "
                            + request.productId()
            );
        }

        if (
                inventoryRepository
                        .existsBySku(
                                request.sku()
                        )
        ) {

            throw new DuplicateInventoryException(
                    "Inventory with SKU '"
                            + request.sku()
                            + "' already exists"
            );
        }

        Inventory inventory =
                Inventory.builder()

                        .product(
                                product
                        )

                        .sku(
                                request.sku()
                        )

                        .stock(
                                request.stock()
                        )

                        .lowStockThreshold(
                                request.lowStockThreshold()
                        )

                        .build();

        Inventory savedInventory =
                inventoryRepository
                        .save(
                                inventory
                        );

        return mapToResponse(
                savedInventory
        );
    }

    @Transactional
    public InventoryResponse updateInventory(
            Long productId,
            InventoryRequest request
    ) {

        Inventory inventory =
                getInventoryEntity(
                        productId
                );

        if (
                !inventory
                        .getSku()
                        .equals(
                                request.sku()
                        )
                &&
                inventoryRepository
                        .existsBySku(
                                request.sku()
                        )
        ) {

            throw new DuplicateInventoryException(
                    "Inventory with SKU '"
                            + request.sku()
                            + "' already exists"
            );
        }

        inventory.setSku(
                request.sku()
        );

        inventory.setStock(
                request.stock()
        );

        inventory.setLowStockThreshold(
                request.lowStockThreshold()
        );

        Inventory updatedInventory =
                inventoryRepository
                        .save(
                                inventory
                        );

        return mapToResponse(
                updatedInventory
        );
    }

    @Transactional
    public InventoryResponse increaseStock(
            Long productId,
            int amount
    ) {

        if (
                amount <= 0
        ) {

            throw new IllegalArgumentException(
                    "Amount must be greater than 0"
            );
        }

        Inventory inventory =
                getInventoryEntity(
                        productId
                );

        inventory.setStock(
                inventory.getStock()
                        + amount
        );

        Inventory updatedInventory =
                inventoryRepository
                        .save(
                                inventory
                        );

        return mapToResponse(
                updatedInventory
        );
    }

    @Transactional
    public InventoryResponse decreaseStock(
            Long productId,
            int amount
    ) {

        if (
                amount <= 0
        ) {

            throw new IllegalArgumentException(
                    "Amount must be greater than 0"
            );
        }

        Inventory inventory =
                getInventoryEntity(
                        productId
                );

        int newStock =
                inventory.getStock()
                        - amount;

        if (
                newStock < 0
        ) {

            throw new IllegalArgumentException(
                    "Insufficient stock"
            );
        }

        inventory.setStock(
                newStock
        );

        Inventory updatedInventory =
                inventoryRepository
                        .save(
                                inventory
                        );

        return mapToResponse(
                updatedInventory
        );
    }

    /*
     * Creates Inventory rows for products
     * that were created before automatic
     * inventory creation was introduced.
     *
     * Existing inventory records are
     * never modified.
     */
    @Transactional
    public int createMissingInventoryRecords() {

        List<Product> products =
                productRepository
                        .findAll();

        int createdCount =
                0;

        for (
                Product product :
                products
        ) {

            boolean inventoryExists =
                    inventoryRepository
                            .existsByProductId(
                                    product.getId()
                            );

            if (
                    inventoryExists
            ) {
                continue;
            }

            String sku =
                    generateSku(
                            product
                    );

            /*
             * This should normally be unique
             * because it is based on Product ID.
             */
            if (
                    inventoryRepository
                            .existsBySku(
                                    sku
                            )
            ) {

                throw new DuplicateInventoryException(
                        "Unable to create inventory because SKU '"
                                + sku
                                + "' already exists."
                );
            }

            Inventory inventory =
                    Inventory.builder()

                            .product(
                                    product
                            )

                            .sku(
                                    sku
                            )

                            .stock(
                                    0
                            )

                            .lowStockThreshold(
                                    DEFAULT_LOW_STOCK_THRESHOLD
                            )

                            .build();

            inventoryRepository
                    .save(
                            inventory
                    );

            createdCount++;
        }

        return createdCount;
    }

    private Inventory getInventoryEntity(
            Long productId
    ) {

        return inventoryRepository
                .findByProductId(
                        productId
                )
                .orElseThrow(
                        () ->
                                new InventoryNotFoundException(
                                        "Inventory not found for product id: "
                                                + productId
                                )
                );
    }

    private String generateSku(
            Product product
    ) {

        return String.format(
                "MOD-%06d",
                product.getId()
        );
    }

    private InventoryResponse mapToResponse(
            Inventory inventory
    ) {

        String status;

        if (
                inventory.getStock() == 0
        ) {

            status =
                    "OUT_OF_STOCK";

        } else if (
                inventory.getStock()
                        <= inventory.getLowStockThreshold()
        ) {

            status =
                    "LOW_STOCK";

        } else {

            status =
                    "IN_STOCK";
        }

        Product product =
                inventory.getProduct();

        return new InventoryResponse(
                inventory.getId(),
                product.getId(),
                product.getName(),
                product.getImage(),
                product.getCategory(),
                inventory.getSku(),
                inventory.getStock(),
                inventory.getLowStockThreshold(),
                status
        );
    }
}