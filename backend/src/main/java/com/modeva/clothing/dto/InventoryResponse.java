package com.modeva.clothing.dto;

public record InventoryResponse(

        Long id,
        Long productId,
        String productName,
        String productImage,
        String category,
        String sku,
        int stock,
        int lowStockThreshold,
        String status

) {
}