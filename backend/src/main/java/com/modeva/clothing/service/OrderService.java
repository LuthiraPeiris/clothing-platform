package com.modeva.clothing.service;

import com.modeva.clothing.dto.OrderItemRequest;
import com.modeva.clothing.dto.OrderItemResponse;
import com.modeva.clothing.dto.OrderRequest;
import com.modeva.clothing.dto.OrderResponse;
import com.modeva.clothing.entity.Inventory;
import com.modeva.clothing.entity.Order;
import com.modeva.clothing.entity.OrderItem;
import com.modeva.clothing.entity.OrderStatus;
import com.modeva.clothing.entity.Product;
import com.modeva.clothing.exception.InventoryNotFoundException;
import com.modeva.clothing.exception.OrderNotFoundException;
import com.modeva.clothing.exception.ProductNotFoundException;
import com.modeva.clothing.repository.InventoryRepository;
import com.modeva.clothing.repository.OrderRepository;
import com.modeva.clothing.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final InventoryRepository inventoryRepository;

    private static final BigDecimal SHIPPING_FEE =
            new BigDecimal("500.00");

    public List<OrderResponse> getAllOrders() {

        return orderRepository
                .findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public OrderResponse getOrderById(Long id) {

        Order order = orderRepository
                .findById(id)
                .orElseThrow(() ->
                        new OrderNotFoundException(
                                "Order not found with id: " + id
                        )
                );

        return mapToResponse(order);
    }

    public OrderResponse getOrderByOrderNumber(
            String orderNumber
    ) {

        Order order = orderRepository
                .findByOrderNumber(orderNumber)
                .orElseThrow(() ->
                        new OrderNotFoundException(
                                "Order not found with order number: "
                                        + orderNumber
                        )
                );

        return mapToResponse(order);
    }

    @Transactional
    public OrderResponse createOrder(
            OrderRequest request
    ) {

        Order order = Order.builder()
                .orderNumber(generateOrderNumber())
                .customerName(request.customerName())
                .email(request.email())
                .phone(request.phone())
                .shippingAddress(request.shippingAddress())
                .city(request.city())
                .postalCode(request.postalCode())
                .status(OrderStatus.PENDING)
                .subtotal(BigDecimal.ZERO)
                .shippingFee(SHIPPING_FEE)
                .total(BigDecimal.ZERO)
                .build();

        BigDecimal subtotal =
                BigDecimal.ZERO;

        for (
                OrderItemRequest itemRequest
                : request.items()
        ) {

            Product product =
                    productRepository
                            .findById(itemRequest.productId())
                            .orElseThrow(() ->
                                    new ProductNotFoundException(
                                            "Product not found with id: "
                                                    + itemRequest.productId()
                                    )
                            );

            Inventory inventory =
                    inventoryRepository
                            .findByProductId(
                                    product.getId()
                            )
                            .orElseThrow(() ->
                                    new InventoryNotFoundException(
                                            "Inventory not found for product id: "
                                                    + product.getId()
                                    )
                            );

            if (
                    inventory.getStock()
                            < itemRequest.quantity()
            ) {
                throw new IllegalArgumentException(
                        "Insufficient stock for product: "
                                + product.getName()
                );
            }

            BigDecimal itemTotal =
                    product.getPrice()
                            .multiply(
                                    BigDecimal.valueOf(
                                            itemRequest.quantity()
                                    )
                            );

            subtotal =
                    subtotal.add(
                            itemTotal
                    );

            OrderItem orderItem =
                    OrderItem.builder()
                            .productId(product.getId())
                            .productName(product.getName())
                            .productImage(product.getImage())
                            .quantity(itemRequest.quantity())
                            .price(product.getPrice())
                            .selectedSize(
                                    itemRequest.selectedSize()
                            )
                            .selectedColor(
                                    itemRequest.selectedColor()
                            )
                            .build();

            order.addItem(
                    orderItem
            );

            inventory.setStock(
                    inventory.getStock()
                            - itemRequest.quantity()
            );

            inventoryRepository.save(
                    inventory
            );
        }

        order.setSubtotal(
                subtotal
        );

        order.setTotal(
                subtotal.add(
                        SHIPPING_FEE
                )
        );

        Order savedOrder =
                orderRepository.save(
                        order
                );

        return mapToResponse(
                savedOrder
        );
    }

    @Transactional
    public OrderResponse updateOrderStatus(
            Long id,
            OrderStatus status
    ) {

        Order order = orderRepository
                .findById(id)
                .orElseThrow(() ->
                        new OrderNotFoundException(
                                "Order not found with id: " + id
                        )
                );

        order.setStatus(
                status
        );

        Order updatedOrder =
                orderRepository.save(
                        order
                );

        return mapToResponse(
                updatedOrder
        );
    }

    private String generateOrderNumber() {

        String randomPart =
                UUID.randomUUID()
                        .toString()
                        .substring(0, 8)
                        .toUpperCase();

        return "MOD-" + randomPart;
    }

    private OrderResponse mapToResponse(
            Order order
    ) {

        List<OrderItemResponse> items =
                order.getItems()
                        .stream()
                        .map(item ->
                                new OrderItemResponse(
                                        item.getId(),
                                        item.getProductId(),
                                        item.getProductName(),
                                        item.getProductImage(),
                                        item.getQuantity(),
                                        item.getPrice(),
                                        item.getSelectedSize(),
                                        item.getSelectedColor()
                                )
                        )
                        .toList();

        return new OrderResponse(
                order.getId(),
                order.getOrderNumber(),
                order.getCustomerName(),
                order.getEmail(),
                order.getPhone(),
                order.getShippingAddress(),
                order.getCity(),
                order.getPostalCode(),
                order.getStatus(),
                order.getSubtotal(),
                order.getShippingFee(),
                order.getTotal(),
                order.getCreatedAt(),
                items
        );
    }
}