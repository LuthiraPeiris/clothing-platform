package com.modeva.clothing.controller;

import com.modeva.clothing.dto.InventoryRequest;
import com.modeva.clothing.dto.InventoryResponse;
import com.modeva.clothing.dto.StockUpdateRequest;

import com.modeva.clothing.service.InventoryService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
@CrossOrigin(
        origins = "http://localhost:3000"
)
public class InventoryController {

    private final InventoryService inventoryService;

    @GetMapping
    public ResponseEntity<List<InventoryResponse>>
    getAllInventory() {

        return ResponseEntity.ok(
                inventoryService
                        .getAllInventory()
        );
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<InventoryResponse>
    getInventoryByProductId(
            @PathVariable
            Long productId
    ) {

        return ResponseEntity.ok(
                inventoryService
                        .getInventoryByProductId(
                                productId
                        )
        );
    }

    @PostMapping
    public ResponseEntity<InventoryResponse>
    createInventory(
            @Valid
            @RequestBody
            InventoryRequest request
    ) {

        return ResponseEntity
                .status(
                        HttpStatus.CREATED
                )
                .body(
                        inventoryService
                                .createInventory(
                                        request
                                )
                );
    }

    /*
     * ADMIN-only because /api/inventory/**
     * is protected in SecurityConfig.
     *
     * Creates missing inventory rows for
     * older products.
     */
    @PostMapping("/sync")
    public ResponseEntity<Map<String, Object>>
    syncMissingInventory() {

        int createdCount =
                inventoryService
                        .createMissingInventoryRecords();

        return ResponseEntity.ok(
                Map.of(
                        "success",
                        true,

                        "created",
                        createdCount,

                        "message",
                        createdCount
                                + " missing inventory record(s) created."
                )
        );
    }

    @PutMapping("/product/{productId}")
    public ResponseEntity<InventoryResponse>
    updateInventory(
            @PathVariable
            Long productId,

            @Valid
            @RequestBody
            InventoryRequest request
    ) {

        return ResponseEntity.ok(
                inventoryService
                        .updateInventory(
                                productId,
                                request
                        )
        );
    }

    @PatchMapping(
            "/product/{productId}/increase"
    )
    public ResponseEntity<InventoryResponse>
    increaseStock(
            @PathVariable
            Long productId,

            @Valid
            @RequestBody
            StockUpdateRequest request
    ) {

        return ResponseEntity.ok(
                inventoryService
                        .increaseStock(
                                productId,
                                request.amount()
                        )
        );
    }

    @PatchMapping(
            "/product/{productId}/decrease"
    )
    public ResponseEntity<InventoryResponse>
    decreaseStock(
            @PathVariable
            Long productId,

            @Valid
            @RequestBody
            StockUpdateRequest request
    ) {

        return ResponseEntity.ok(
                inventoryService
                        .decreaseStock(
                                productId,
                                request.amount()
                        )
        );
    }
}