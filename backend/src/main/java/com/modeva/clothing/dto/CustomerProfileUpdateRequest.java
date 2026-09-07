package com.modeva.clothing.dto;

import jakarta.validation.constraints.NotBlank;

public record CustomerProfileUpdateRequest(

        @NotBlank(
                message = "Name is required."
        )
        String name,

        @NotBlank(
                message = "Phone number is required."
        )
        String phone

) {
}