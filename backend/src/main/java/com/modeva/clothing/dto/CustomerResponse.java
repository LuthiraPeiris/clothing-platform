package com.modeva.clothing.dto;

import com.modeva.clothing.entity.CustomerStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record CustomerResponse(

        Long id,

        String name,

        String email,

        String phone,

        long orders,

        BigDecimal totalSpent,

        LocalDateTime joinedAt,

        CustomerStatus status

) {
}