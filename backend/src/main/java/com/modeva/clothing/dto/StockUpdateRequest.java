package com.modeva.clothing.dto;

import jakarta.validation.constraints.Min;

public record StockUpdateRequest(

        @Min(
                value = 1,
                message = "Amount must be at least 1"
        )
        int amount

) {
}