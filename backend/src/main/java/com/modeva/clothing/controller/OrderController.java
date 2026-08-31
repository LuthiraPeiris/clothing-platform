package com.modeva.clothing.controller;

import com.modeva.clothing.dto.OrderRequest;
import com.modeva.clothing.dto.OrderResponse;
import com.modeva.clothing.dto.OrderStatusUpdateRequest;
import com.modeva.clothing.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getAllOrders() {

        return ResponseEntity.ok(
                orderService.getAllOrders()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrderById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                orderService.getOrderById(id)
        );
    }

    @GetMapping("/number/{orderNumber}")
    public ResponseEntity<OrderResponse> getOrderByOrderNumber(
            @PathVariable String orderNumber
    ) {

        return ResponseEntity.ok(
                orderService.getOrderByOrderNumber(
                        orderNumber
                )
        );
    }

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(
            @Valid
            @RequestBody
            OrderRequest request
    ) {

        OrderResponse createdOrder =
                orderService.createOrder(
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdOrder);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<OrderResponse> updateOrderStatus(
            @PathVariable Long id,
            @Valid
            @RequestBody
            OrderStatusUpdateRequest request
    ) {

        return ResponseEntity.ok(
                orderService.updateOrderStatus(
                        id,
                        request.status()
                )
        );
    }
}