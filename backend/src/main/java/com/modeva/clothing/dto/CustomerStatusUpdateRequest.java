package com.modeva.clothing.dto;

import com.modeva.clothing.entity.CustomerStatus;
import jakarta.validation.constraints.NotNull;

public record CustomerStatusUpdateRequest(

        @NotNull(
                message =
                        "Customer status is required"
        )
        CustomerStatus status

) {
}