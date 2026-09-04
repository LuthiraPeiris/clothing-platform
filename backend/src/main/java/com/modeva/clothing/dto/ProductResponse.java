package com.modeva.clothing.dto;

import java.math.BigDecimal;
import java.util.List;

public record ProductResponse(

        Long id,
        String name,
        String slug,
        String category,
        BigDecimal price,
        BigDecimal oldPrice,
        String image,
        String badge,
        List<String> colors,
        List<String> sizes,
        boolean featured,
        boolean newArrival,
        int stock

) {
}