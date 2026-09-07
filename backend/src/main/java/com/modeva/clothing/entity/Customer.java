package com.modeva.clothing.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "customers",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_customer_email",
                        columnNames = "email"
                ),
                @UniqueConstraint(
                        name = "uk_customer_keycloak_user_id",
                        columnNames = "keycloak_user_id"
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    /*
     * The stable identity from Keycloak.
     *
     * This is the "sub" claim from the JWT.
     *
     * Nullable for now because older customer
     * records may already exist without it.
     */
    @Column(
            name = "keycloak_user_id",
            unique = true,
            length = 100
    )
    private String keycloakUserId;

    @Column(nullable = false)
    private String name;

    @Column(
            nullable = false,
            unique = true
    )
    private String email;

    @Column(nullable = false)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CustomerStatus status;

    @Column(nullable = false)
    private LocalDateTime joinedAt;

    @PrePersist
    public void prePersist() {

        if (joinedAt == null) {
            joinedAt =
                    LocalDateTime.now();
        }

        if (status == null) {
            status =
                    CustomerStatus.ACTIVE;
        }
    }
}