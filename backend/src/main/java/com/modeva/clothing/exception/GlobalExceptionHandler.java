package com.modeva.clothing.exception;
import com.modeva.clothing.exception.DuplicateInventoryException;
import com.modeva.clothing.exception.InventoryNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleProductNotFound(
            ProductNotFoundException exception
    ) {

        Map<String, Object> response = new HashMap<>();

        response.put("timestamp", LocalDateTime.now());
        response.put("status", HttpStatus.NOT_FOUND.value());
        response.put("error", "Not Found");
        response.put("message", exception.getMessage());

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }

    @ExceptionHandler(DuplicateProductException.class)
    public ResponseEntity<Map<String, Object>> handleDuplicateProduct(
            DuplicateProductException exception
    ) {

        Map<String, Object> response = new HashMap<>();

        response.put("timestamp", LocalDateTime.now());
        response.put("status", HttpStatus.CONFLICT.value());
        response.put("error", "Conflict");
        response.put("message", exception.getMessage());

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationErrors(
            MethodArgumentNotValidException exception
    ) {

        Map<String, String> validationErrors = new HashMap<>();

        exception.getBindingResult()
                .getFieldErrors()
                .forEach(error ->
                        validationErrors.put(
                                error.getField(),
                                error.getDefaultMessage()
                        )
                );

        Map<String, Object> response = new HashMap<>();

        response.put("timestamp", LocalDateTime.now());
        response.put("status", HttpStatus.BAD_REQUEST.value());
        response.put("error", "Validation Failed");
        response.put("errors", validationErrors);

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneralException(
            Exception exception
    ) {

        Map<String, Object> response = new HashMap<>();

        response.put("timestamp", LocalDateTime.now());
        response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        response.put("error", "Internal Server Error");
        response.put("message", "Something went wrong");

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(response);
    }

    @ExceptionHandler(InventoryNotFoundException.class)
public ResponseEntity<Map<String, Object>> handleInventoryNotFound(
        InventoryNotFoundException exception
) {

    Map<String, Object> response = new HashMap<>();

    response.put(
            "timestamp",
            LocalDateTime.now()
    );

    response.put(
            "status",
            HttpStatus.NOT_FOUND.value()
    );

    response.put(
            "error",
            "Not Found"
    );

    response.put(
            "message",
            exception.getMessage()
    );

    return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(response);
}

@ExceptionHandler(DuplicateInventoryException.class)
public ResponseEntity<Map<String, Object>> handleDuplicateInventory(
        DuplicateInventoryException exception
) {

    Map<String, Object> response = new HashMap<>();

    response.put(
            "timestamp",
            LocalDateTime.now()
    );

    response.put(
            "status",
            HttpStatus.CONFLICT.value()
    );

    response.put(
            "error",
            "Conflict"
    );

    response.put(
            "message",
            exception.getMessage()
    );

    return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(response);
}

@ExceptionHandler(OrderNotFoundException.class)
public ResponseEntity<Map<String, Object>> handleOrderNotFound(
        OrderNotFoundException exception
) {

    Map<String, Object> response = new HashMap<>();

    response.put(
            "timestamp",
            LocalDateTime.now()
    );

    response.put(
            "status",
            HttpStatus.NOT_FOUND.value()
    );

    response.put(
            "error",
            "Not Found"
    );

    response.put(
            "message",
            exception.getMessage()
    );

    return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(response);
}

@ExceptionHandler(
        CustomerNotFoundException.class
)
public ResponseEntity<
        Map<String, Object>
        > handleCustomerNotFound(
        CustomerNotFoundException exception
) {

    Map<String, Object> response =
            new HashMap<>();

    response.put(
            "timestamp",
            LocalDateTime.now()
    );

    response.put(
            "status",
            HttpStatus.NOT_FOUND.value()
    );

    response.put(
            "error",
            "Not Found"
    );

    response.put(
            "message",
            exception.getMessage()
    );

    return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(response);
}
}