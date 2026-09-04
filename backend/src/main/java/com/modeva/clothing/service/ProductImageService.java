package com.modeva.clothing.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Set;
import java.util.UUID;

@Service
public class ProductImageService {

    private static final long MAX_FILE_SIZE =
            5 * 1024 * 1024;

    private static final Set<String> ALLOWED_CONTENT_TYPES =
            Set.of(
                    "image/jpeg",
                    "image/png",
                    "image/webp"
            );

    private final Path uploadDirectory =
            Path.of(
                    "uploads",
                    "products"
            )
            .toAbsolutePath()
            .normalize();

    public String storeImage(
            MultipartFile file
    ) {

        validateFile(file);

        try {
            Files.createDirectories(
                    uploadDirectory
            );

            String extension =
                    getExtension(
                            file.getContentType()
                    );

            String fileName =
                    UUID.randomUUID()
                            + extension;

            Path targetPath =
                    uploadDirectory
                            .resolve(fileName)
                            .normalize();

            /*
             * Prevent path traversal.
             */
            if (
                    !targetPath.startsWith(
                            uploadDirectory
                    )
            ) {
                throw new IllegalArgumentException(
                        "Invalid image path."
                );
            }

            try (
                    InputStream inputStream =
                            file.getInputStream()
            ) {
                Files.copy(
                        inputStream,
                        targetPath,
                        StandardCopyOption.REPLACE_EXISTING
                );
            }

            return (
                    "http://localhost:8080"
                            + "/uploads/products/"
                            + fileName
            );

        } catch (IOException exception) {

            throw new RuntimeException(
                    "Failed to store product image.",
                    exception
            );
        }
    }

    private void validateFile(
            MultipartFile file
    ) {

        if (
                file == null ||
                file.isEmpty()
        ) {
            throw new IllegalArgumentException(
                    "Please select an image."
            );
        }

        if (
                file.getSize() >
                MAX_FILE_SIZE
        ) {
            throw new IllegalArgumentException(
                    "Image must be smaller than 5 MB."
            );
        }

        String contentType =
                file.getContentType();

        if (
                contentType == null ||
                !ALLOWED_CONTENT_TYPES.contains(
                        contentType
                )
        ) {
            throw new IllegalArgumentException(
                    "Only JPG, PNG, and WebP images are allowed."
            );
        }
    }

    private String getExtension(
            String contentType
    ) {

        return switch (
                contentType
        ) {
            case "image/jpeg" ->
                    ".jpg";

            case "image/png" ->
                    ".png";

            case "image/webp" ->
                    ".webp";

            default ->
                    throw new IllegalArgumentException(
                            "Unsupported image type."
                    );
        };
    }
}