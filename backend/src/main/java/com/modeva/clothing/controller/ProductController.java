package com.modeva.clothing.controller;

import com.modeva.clothing.dto.ProductRequest;
import com.modeva.clothing.dto.ProductResponse;
import com.modeva.clothing.service.ProductImageService;
import com.modeva.clothing.service.ProductService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(
        origins = "http://localhost:3000"
)
public class ProductController {

    private final ProductService productService;

    private final ProductImageService
            productImageService;

    @GetMapping
    public ResponseEntity<
            List<ProductResponse>
    > getAllProducts() {

        return ResponseEntity.ok(
                productService
                        .getAllProducts()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse>
    getProductById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                productService
                        .getProductById(id)
        );
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<ProductResponse>
    getProductBySlug(
            @PathVariable String slug
    ) {

        return ResponseEntity.ok(
                productService
                        .getProductBySlug(
                                slug
                        )
        );
    }

    /*
     * ADMIN only.
     *
     * The SecurityConfig POST rule for
     * /api/products/** protects this endpoint.
     */
    @PostMapping(
            value = "/images",
            consumes =
                    MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<
            Map<String, String>
    > uploadProductImage(
            @RequestParam("image")
            MultipartFile image
    ) {

        String imageUrl =
                productImageService
                        .storeImage(
                                image
                        );

        return ResponseEntity
                .status(
                        HttpStatus.CREATED
                )
                .body(
                        Map.of(
                                "imageUrl",
                                imageUrl
                        )
                );
    }

    @PostMapping
    public ResponseEntity<ProductResponse>
    createProduct(
            @Valid
            @RequestBody
            ProductRequest request
    ) {

        ProductResponse createdProduct =
                productService
                        .createProduct(
                                request
                        );

        return ResponseEntity
                .status(
                        HttpStatus.CREATED
                )
                .body(
                        createdProduct
                );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse>
    updateProduct(
            @PathVariable Long id,

            @Valid
            @RequestBody
            ProductRequest request
    ) {

        return ResponseEntity.ok(
                productService
                        .updateProduct(
                                id,
                                request
                        )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>
    deleteProduct(
            @PathVariable Long id
    ) {

        productService
                .deleteProduct(
                        id
                );

        return ResponseEntity
                .noContent()
                .build();
    }
}