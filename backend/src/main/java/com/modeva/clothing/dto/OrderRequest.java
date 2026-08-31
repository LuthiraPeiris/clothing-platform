package com.modeva.clothing.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record OrderRequest(

        @NotBlank(message = "Customer name is required")
        String customerName,

        @NotBlank(message = "Email is required")
        @Email(message = "Email is invalid")
        String email,

        @NotBlank(message = "Phone is required")
        String phone,

        @NotBlank(message = "Shipping address is required")
        String shippingAddress,

        @NotBlank(message = "City is required")
        String city,

        String postalCode,

        @NotEmpty(message = "Order must contain at least one item")
        List<
                @Valid OrderItemRequest
        > items

) {
}