package com.modeva.clothing.dto;

import com.modeva.clothing.entity.OrderStatus;
import jakarta.validation.constraints.NotNull;

public record OrderStatusUpdateRequest(

        @NotNull(message = "Order status is required")
        OrderStatus status

) {
}