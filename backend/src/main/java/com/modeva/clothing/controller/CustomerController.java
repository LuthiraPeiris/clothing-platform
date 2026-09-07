package com.modeva.clothing.controller;

import com.modeva.clothing.dto.CustomerProfileUpdateRequest;
import com.modeva.clothing.dto.CustomerResponse;
import com.modeva.clothing.dto.CustomerStatusUpdateRequest;

import com.modeva.clothing.service.CustomerService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;

import org.springframework.security.oauth2.jwt.Jwt;

import org.springframework.security.core.annotation.AuthenticationPrincipal;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(
        "/api/customers"
)
@RequiredArgsConstructor
@CrossOrigin(
        origins =
                "http://localhost:3000"
)
public class CustomerController {

    private final CustomerService
            customerService;

    /*
     * CUSTOMER
     *
     * Current authenticated customer's
     * own profile.
     */
        @PostMapping("/me/sync")
public ResponseEntity<CustomerResponse>
syncCurrentCustomer(

        @AuthenticationPrincipal
        Jwt jwt

) {

    String email =
            jwt.getClaimAsString(
                    "email"
            );

    String displayName =
            jwt.getClaimAsString(
                    "name"
            );

    if (
            displayName == null ||
            displayName.isBlank()
    ) {
        displayName =
                jwt.getClaimAsString(
                        "preferred_username"
                );
    }

    return ResponseEntity.ok(
            customerService
                    .syncCurrentCustomer(
                            jwt.getSubject(),
                            email,
                            displayName
                    )
    );
}



    @GetMapping("/me")
    public ResponseEntity<
            CustomerResponse
            > getCurrentCustomer(

            @AuthenticationPrincipal
            Jwt jwt

    ) {

        return ResponseEntity.ok(
                customerService
                        .getCurrentCustomer(
                                jwt.getSubject()
                        )
        );
    }

    /*
     * CUSTOMER
     *
     * Update own profile.
     */
    @PutMapping("/me")
    public ResponseEntity<
            CustomerResponse
            > updateCurrentCustomer(

            @AuthenticationPrincipal
            Jwt jwt,

            @Valid
            @RequestBody
            CustomerProfileUpdateRequest
                    request

    ) {

        return ResponseEntity.ok(
                customerService
                        .updateCurrentCustomer(
                                jwt.getSubject(),
                                request.name(),
                                request.phone()
                        )
        );
    }

    /*
     * ADMIN
     */
    @GetMapping
    public ResponseEntity<
            List<CustomerResponse>
            > getAllCustomers() {

        return ResponseEntity.ok(
                customerService
                        .getAllCustomers()
        );
    }

    /*
     * ADMIN
     */
    @GetMapping("/{id}")
    public ResponseEntity<
            CustomerResponse
            > getCustomerById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                customerService
                        .getCustomerById(
                                id
                        )
        );
    }

    /*
     * ADMIN
     */
    @PatchMapping(
            "/{id}/status"
    )
    public ResponseEntity<
            CustomerResponse
            > updateCustomerStatus(

            @PathVariable Long id,

            @Valid
            @RequestBody
            CustomerStatusUpdateRequest
                    request
    ) {

        return ResponseEntity.ok(
                customerService
                        .updateCustomerStatus(
                                id,
                                request.status()
                        )
        );
    }
}