package com.modeva.clothing.dto;

import java.math.BigDecimal;

public record OrderItemResponse(

        Long id,
        Long productId,
        String productName,
        String productImage,
        int quantity,
        BigDecimal price,
        String selectedSize,
        String selectedColor

) {
}