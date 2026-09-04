package com.modeva.clothing.controller;

import com.modeva.clothing.dto.OrderRequest;
import com.modeva.clothing.dto.OrderResponse;
import com.modeva.clothing.dto.OrderStatusUpdateRequest;

import com.modeva.clothing.service.OrderService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;

import org.springframework.security.oauth2.jwt.Jwt;

import org.springframework.security.core.annotation.AuthenticationPrincipal;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(
        origins = "http://localhost:3000"
)
public class OrderController {

    private final OrderService
            orderService;

    /*
     * ADMIN ONLY
     *
     * GET /api/orders
     */
    @GetMapping
    public ResponseEntity<
            List<OrderResponse>
    > getAllOrders() {

        return ResponseEntity.ok(
                orderService
                        .getAllOrders()
        );
    }

    /*
     * CUSTOMER ONLY
     *
     * GET /api/orders/my
     */
    @GetMapping("/my")
    public ResponseEntity<
            List<OrderResponse>
    > getMyOrders(
            @AuthenticationPrincipal
            Jwt jwt
    ) {

        return ResponseEntity.ok(
                orderService
                        .getOrdersForCustomer(
                                jwt.getSubject()
                        )
        );
    }

    /*
     * CUSTOMER or ADMIN
     *
     * Customer ownership is checked
     * inside OrderService.
     */
    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse>
    getOrderById(
            @PathVariable Long id,

            @AuthenticationPrincipal
            Jwt jwt,

            Authentication authentication
    ) {

        return ResponseEntity.ok(
                orderService
                        .getOrderById(
                                id,
                                jwt.getSubject(),
                                isAdmin(
                                        authentication
                                )
                        )
        );
    }

    /*
     * CUSTOMER or ADMIN
     */
    @GetMapping(
            "/number/{orderNumber}"
    )
    public ResponseEntity<OrderResponse>
    getOrderByOrderNumber(
            @PathVariable
            String orderNumber,

            @AuthenticationPrincipal
            Jwt jwt,

            Authentication authentication
    ) {

        return ResponseEntity.ok(
                orderService
                        .getOrderByOrderNumber(
                                orderNumber,
                                jwt.getSubject(),
                                isAdmin(
                                        authentication
                                )
                        )
        );
    }

    /*
     * CUSTOMER ONLY
     *
     * The owner comes from jwt.getSubject().
     */
    @PostMapping
    public ResponseEntity<OrderResponse>
    createOrder(
            @Valid
            @RequestBody
            OrderRequest request,

            @AuthenticationPrincipal
            Jwt jwt
    ) {

        OrderResponse createdOrder =
                orderService
                        .createOrder(
                                request,
                                jwt.getSubject()
                        );

        return ResponseEntity
                .status(
                        HttpStatus.CREATED
                )
                .body(
                        createdOrder
                );
    }

    /*
     * ADMIN ONLY
     */
    @PatchMapping(
            "/{id}/status"
    )
    public ResponseEntity<OrderResponse>
    updateOrderStatus(
            @PathVariable Long id,

            @Valid
            @RequestBody
            OrderStatusUpdateRequest request
    ) {

        return ResponseEntity.ok(
                orderService
                        .updateOrderStatus(
                                id,
                                request.status()
                        )
        );
    }

    private boolean isAdmin(
            Authentication authentication
    ) {

        return authentication
                .getAuthorities()
                .stream()
                .anyMatch(
                        authority ->
                                authority
                                        .getAuthority()
                                        .equals(
                                                "ROLE_ADMIN"
                                        )
                );
    }
}