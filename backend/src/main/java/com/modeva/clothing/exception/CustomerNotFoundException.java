package com.modeva.clothing.exception;

public class CustomerNotFoundException
        extends RuntimeException {

    public CustomerNotFoundException(
            String message
    ) {
        super(message);
    }
}