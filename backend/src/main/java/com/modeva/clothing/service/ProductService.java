package com.modeva.clothing.service;

import com.modeva.clothing.dto.ProductRequest;
import com.modeva.clothing.dto.ProductResponse;

import com.modeva.clothing.entity.Inventory;
import com.modeva.clothing.entity.Product;

import com.modeva.clothing.exception.DuplicateProductException;
import com.modeva.clothing.exception.ProductNotFoundException;

import com.modeva.clothing.repository.InventoryRepository;
import com.modeva.clothing.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private static final int
            DEFAULT_LOW_STOCK_THRESHOLD = 5;

    private final ProductRepository
            productRepository;

    private final InventoryRepository
            inventoryRepository;

    public List<ProductResponse>
    getAllProducts() {

        return productRepository
                .findAll()
                .stream()
                .map(
                        this::mapToResponse
                )
                .toList();
    }

    public ProductResponse
    getProductById(
            Long id
    ) {

        Product product =
                productRepository
                        .findById(id)
                        .orElseThrow(
                                () ->
                                        new ProductNotFoundException(
                                                "Product not found with id: "
                                                        + id
                                        )
                        );

        return mapToResponse(
                product
        );
    }

    public ProductResponse
    getProductBySlug(
            String slug
    ) {

        Product product =
                productRepository
                        .findBySlug(
                                slug
                        )
                        .orElseThrow(
                                () ->
                                        new ProductNotFoundException(
                                                "Product not found with slug: "
                                                        + slug
                                        )
                        );

        return mapToResponse(
                product
        );
    }

    @Transactional
    public ProductResponse
    createProduct(
            ProductRequest request
    ) {

        if (
                productRepository
                        .existsBySlug(
                                request.slug()
                        )
        ) {

            throw new DuplicateProductException(
                    "Product with slug '"
                            + request.slug()
                            + "' already exists"
            );
        }

        int initialStock =
                request.initialStock() != null
                        ? request.initialStock()
                        : 0;

        if (
                initialStock < 0
        ) {
            throw new IllegalArgumentException(
                    "Initial stock cannot be negative."
            );
        }

        Product product =
                Product.builder()

                        .name(
                                request.name()
                                        .trim()
                        )

                        .slug(
                                request.slug()
                                        .trim()
                                        .toLowerCase()
                        )

                        .category(
                                request.category()
                        )

                        .price(
                                request.price()
                        )

                        .oldPrice(
                                request.oldPrice()
                        )

                        .image(
                                request.image()
                        )

                        .badge(
                                request.badge()
                        )

                        .colors(
                                request.colors()
                                        != null
                                        ? new ArrayList<>(
                                                request.colors()
                                        )
                                        : new ArrayList<>()
                        )

                        .sizes(
                                request.sizes()
                                        != null
                                        ? new ArrayList<>(
                                                request.sizes()
                                        )
                                        : new ArrayList<>()
                        )

                        .featured(
                                request.featured()
                        )

                        .newArrival(
                                request.newArrival()
                        )

                        .build();

        Product savedProduct =
                productRepository
                        .save(
                                product
                        );

        Inventory inventory =
                Inventory.builder()

                        .product(
                                savedProduct
                        )

                        .sku(
                                generateSku(
                                        savedProduct
                                )
                        )

                        .stock(
                                initialStock
                        )

                        .lowStockThreshold(
                                DEFAULT_LOW_STOCK_THRESHOLD
                        )

                        .build();

        inventoryRepository
                .save(
                        inventory
                );

        return mapToResponse(
                savedProduct
        );
    }

    @Transactional
    public ProductResponse
    updateProduct(
            Long id,
            ProductRequest request
    ) {

        Product product =
                productRepository
                        .findById(id)
                        .orElseThrow(
                                () ->
                                        new ProductNotFoundException(
                                                "Product not found with id: "
                                                        + id
                                        )
                        );

        productRepository
                .findBySlug(
                        request.slug()
                )
                .filter(
                        existingProduct ->
                                !existingProduct
                                        .getId()
                                        .equals(id)
                )
                .ifPresent(
                        existingProduct -> {

                            throw new DuplicateProductException(
                                    "Product with slug '"
                                            + request.slug()
                                            + "' already exists"
                            );
                        }
                );

        product.setName(
                request.name()
                        .trim()
        );

        product.setSlug(
                request.slug()
                        .trim()
                        .toLowerCase()
        );

        product.setCategory(
                request.category()
        );

        product.setPrice(
                request.price()
        );

        product.setOldPrice(
                request.oldPrice()
        );

        product.setImage(
                request.image()
        );

        product.setBadge(
                request.badge()
        );

        product.setColors(
                request.colors()
                        != null
                        ? new ArrayList<>(
                                request.colors()
                        )
                        : new ArrayList<>()
        );

        product.setSizes(
                request.sizes()
                        != null
                        ? new ArrayList<>(
                                request.sizes()
                        )
                        : new ArrayList<>()
        );

        product.setFeatured(
                request.featured()
        );

        product.setNewArrival(
                request.newArrival()
        );

        Product updatedProduct =
                productRepository
                        .save(
                                product
                        );

        return mapToResponse(
                updatedProduct
        );
    }

    @Transactional
    public void deleteProduct(
            Long id
    ) {

        Product product =
                productRepository
                        .findById(id)
                        .orElseThrow(
                                () ->
                                        new ProductNotFoundException(
                                                "Product not found with id: "
                                                        + id
                                        )
                        );

        inventoryRepository
                .deleteByProductId(
                        id
                );

        productRepository
                .delete(
                        product
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

    private ProductResponse
    mapToResponse(
            Product product
    ) {

        int stock =
                inventoryRepository
                        .findByProductId(
                                product.getId()
                        )
                        .map(
                                Inventory::getStock
                        )
                        .orElse(
                                0
                        );

        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getSlug(),
                product.getCategory(),
                product.getPrice(),
                product.getOldPrice(),
                product.getImage(),
                product.getBadge(),
                product.getColors(),
                product.getSizes(),
                product.isFeatured(),
                product.isNewArrival(),
                stock
        );
    }
}