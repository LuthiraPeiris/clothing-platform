package com.modeva.clothing.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            nullable = false,
            unique = true
    )
    private String orderNumber;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String shippingAddress;

    @Column(nullable = false)
    private String city;

    private String postalCode;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;

    @Column(
            nullable = false,
            precision = 12,
            scale = 2
    )
    private BigDecimal subtotal;

    @Column(
            nullable = false,
            precision = 12,
            scale = 2
    )
    private BigDecimal shippingFee;

    @Column(
            nullable = false,
            precision = 12,
            scale = 2
    )
    private BigDecimal total;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @OneToMany(
            mappedBy = "order",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @Builder.Default
    private List<OrderItem> items =
            new ArrayList<>();

    @PrePersist
    public void prePersist() {

        if (createdAt == null) {
            createdAt =
                    LocalDateTime.now();
        }

        if (status == null) {
            status =
                    OrderStatus.PENDING;
        }
    }

    public void addItem(
            OrderItem item
    ) {

        items.add(item);
        item.setOrder(this);
    }
}