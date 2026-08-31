package com.modeva.clothing.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.List;

public record ProductRequest(

        @NotBlank(message = "Product name is required")
        String name,

        @NotBlank(message = "Product slug is required")
        String slug,

        @NotBlank(message = "Category is required")
        String category,

        @NotNull(message = "Price is required")
        @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
        BigDecimal price,

        BigDecimal oldPrice,

        String image,

        String badge,

        List<String> colors,

        List<String> sizes,

        boolean featured,

        boolean newArrival
) {
}