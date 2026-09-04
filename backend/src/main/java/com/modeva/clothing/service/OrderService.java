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

    private final OrderRepository
            orderRepository;

    private final ProductRepository
            productRepository;

    private final InventoryRepository
            inventoryRepository;

    private final CustomerService
            customerService;

    private static final BigDecimal SHIPPING_FEE =
            new BigDecimal(
                    "500.00"
            );

    /*
     * ADMIN ONLY
     *
     * SecurityConfig prevents customers
     * from calling this operation.
     */
    public List<OrderResponse>
    getAllOrders() {

        return orderRepository
                .findAll()
                .stream()
                .map(
                        this::mapToResponse
                )
                .toList();
    }

    /*
     * CUSTOMER ONLY
     *
     * Returns only orders owned by the
     * authenticated Keycloak account.
     */
    public List<OrderResponse>
    getOrdersForCustomer(
            String keycloakUserId
    ) {

        return orderRepository
                .findAllByKeycloakUserIdOrderByCreatedAtDesc(
                        keycloakUserId
                )
                .stream()
                .map(
                        this::mapToResponse
                )
                .toList();
    }

    /*
     * CUSTOMER or ADMIN
     *
     * ADMIN:
     * Can retrieve any order.
     *
     * CUSTOMER:
     * Order ID AND Keycloak owner
     * must match.
     */
    public OrderResponse getOrderById(
            Long id,
            String keycloakUserId,
            boolean admin
    ) {

        Order order;

        if (admin) {

            order =
                    orderRepository
                            .findById(id)
                            .orElseThrow(
                                    () ->
                                            new OrderNotFoundException(
                                                    "Order not found with id: "
                                                            + id
                                            )
                            );

        } else {

            order =
                    orderRepository
                            .findByIdAndKeycloakUserId(
                                    id,
                                    keycloakUserId
                            )
                            .orElseThrow(
                                    () ->
                                            new OrderNotFoundException(
                                                    "Order not found."
                                            )
                            );
        }

        return mapToResponse(
                order
        );
    }

    /*
     * CUSTOMER or ADMIN
     *
     * Same ownership protection when
     * looking up by order number.
     */
    public OrderResponse
    getOrderByOrderNumber(
            String orderNumber,
            String keycloakUserId,
            boolean admin
    ) {

        Order order;

        if (admin) {

            order =
                    orderRepository
                            .findByOrderNumber(
                                    orderNumber
                            )
                            .orElseThrow(
                                    () ->
                                            new OrderNotFoundException(
                                                    "Order not found with order number: "
                                                            + orderNumber
                                            )
                            );

        } else {

            order =
                    orderRepository
                            .findByOrderNumberAndKeycloakUserId(
                                    orderNumber,
                                    keycloakUserId
                            )
                            .orElseThrow(
                                    () ->
                                            new OrderNotFoundException(
                                                    "Order not found."
                                            )
                            );
        }

        return mapToResponse(
                order
        );
    }

    /*
     * CUSTOMER ONLY
     *
     * keycloakUserId does NOT come
     * from the browser request body.
     *
     * It comes from the validated JWT.
     */
    @Transactional
    public OrderResponse createOrder(
            OrderRequest request,
            String keycloakUserId
    ) {

        if (
                keycloakUserId == null ||
                keycloakUserId.isBlank()
        ) {
            throw new IllegalArgumentException(
                    "Authenticated user ID is required."
            );
        }

        /*
         * Maintain the existing customer
         * information behavior.
         */
        customerService
                .registerOrUpdateCustomer(
                        request.customerName(),
                        request.email(),
                        request.phone()
                );

        String normalizedEmail =
                request.email()
                        .trim()
                        .toLowerCase();

        Order order =
                Order.builder()

                        /*
                         * Ownership comes from JWT.
                         */
                        .keycloakUserId(
                                keycloakUserId
                        )

                        .orderNumber(
                                generateOrderNumber()
                        )

                        .customerName(
                                request.customerName()
                                        .trim()
                        )

                        .email(
                                normalizedEmail
                        )

                        .phone(
                                request.phone()
                                        .trim()
                        )

                        .shippingAddress(
                                request.shippingAddress()
                                        .trim()
                        )

                        .city(
                                request.city()
                                        .trim()
                        )

                        .postalCode(
                                request.postalCode()
                                        != null
                                        ? request.postalCode()
                                        .trim()
                                        : null
                        )

                        .status(
                                OrderStatus.PENDING
                        )

                        .subtotal(
                                BigDecimal.ZERO
                        )

                        .shippingFee(
                                SHIPPING_FEE
                        )

                        .total(
                                BigDecimal.ZERO
                        )

                        .build();

        BigDecimal subtotal =
                BigDecimal.ZERO;

        for (
                OrderItemRequest itemRequest
                : request.items()
        ) {

            Product product =
                    productRepository
                            .findById(
                                    itemRequest.productId()
                            )
                            .orElseThrow(
                                    () ->
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
                            .orElseThrow(
                                    () ->
                                            new InventoryNotFoundException(
                                                    "Inventory not found for product id: "
                                                            + product.getId()
                                            )
                            );

            if (
                    inventory.getStock()
                            <
                            itemRequest.quantity()
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

                            .productId(
                                    product.getId()
                            )

                            .productName(
                                    product.getName()
                            )

                            .productImage(
                                    product.getImage()
                            )

                            .quantity(
                                    itemRequest.quantity()
                            )

                            .price(
                                    product.getPrice()
                            )

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

            /*
             * Reduce inventory stock.
             */
            inventory.setStock(
                    inventory.getStock()
                            -
                            itemRequest.quantity()
            );

            inventoryRepository
                    .save(
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
                orderRepository
                        .save(
                                order
                        );

        return mapToResponse(
                savedOrder
        );
    }

    /*
     * ADMIN ONLY
     */
    @Transactional
    public OrderResponse
    updateOrderStatus(
            Long id,
            OrderStatus status
    ) {

        Order order =
                orderRepository
                        .findById(id)
                        .orElseThrow(
                                () ->
                                        new OrderNotFoundException(
                                                "Order not found with id: "
                                                        + id
                                        )
                        );

        order.setStatus(
                status
        );

        Order updatedOrder =
                orderRepository
                        .save(
                                order
                        );

        return mapToResponse(
                updatedOrder
        );
    }

    private String
    generateOrderNumber() {

        String randomPart =
                UUID.randomUUID()
                        .toString()
                        .substring(
                                0,
                                8
                        )
                        .toUpperCase();

        return (
                "MOD-" +
                randomPart
        );
    }

    private OrderResponse mapToResponse(
            Order order
    ) {

        List<OrderItemResponse> items =
                order.getItems()
                        .stream()
                        .map(
                                item ->
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

        /*
         * Notice that keycloakUserId
         * is intentionally NOT exposed
         * in OrderResponse.
         */
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