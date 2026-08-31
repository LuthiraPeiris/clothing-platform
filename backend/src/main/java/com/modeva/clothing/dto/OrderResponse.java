package com.modeva.clothing.dto;

import com.modeva.clothing.entity.OrderStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record OrderResponse(

        Long id,
        String orderNumber,
        String customerName,
        String email,
        String phone,
        String shippingAddress,
        String city,
        String postalCode,
        OrderStatus status,
        BigDecimal subtotal,
        BigDecimal shippingFee,
        BigDecimal total,
        LocalDateTime createdAt,
        List<OrderItemResponse> items

) {
}