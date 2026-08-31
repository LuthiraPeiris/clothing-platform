package com.modeva.clothing.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record InventoryRequest(

        @NotNull(message = "Product id is required")
        Long productId,

        @NotBlank(message = "SKU is required")
        String sku,

        @Min(value = 0, message = "Stock cannot be negative")
        int stock,

        @Min(
                value = 0,
                message = "Low stock threshold cannot be negative"
        )
        int lowStockThreshold

) {
}