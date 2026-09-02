package com.modeva.clothing.controller;

import com.modeva.clothing.dto.CustomerResponse;
import com.modeva.clothing.dto.CustomerStatusUpdateRequest;
import com.modeva.clothing.service.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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

    @GetMapping
    public ResponseEntity<
            List<CustomerResponse>
            > getAllCustomers() {

        return ResponseEntity.ok(
                customerService
                        .getAllCustomers()
        );
    }

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