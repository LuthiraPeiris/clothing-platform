package com.modeva.clothing.service;

import com.modeva.clothing.dto.ProductRequest;
import com.modeva.clothing.dto.ProductResponse;

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

        Product product =
                Product.builder()
                        .name(
                                request.name()
                        )
                        .slug(
                                request.slug()
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
                productRepository.save(
                        product
                );

        return mapToResponse(
                savedProduct
        );
    }

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
        );

        product.setSlug(
                request.slug()
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
                productRepository.save(
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

    private ProductResponse
    mapToResponse(
            Product product
    ) {

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
                product.isNewArrival()
        );
    }
}