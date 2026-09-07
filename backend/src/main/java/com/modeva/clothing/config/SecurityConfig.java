package com.modeva.clothing.config;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.core.convert.converter.Converter;

import org.springframework.http.HttpMethod;

import org.springframework.security.authentication.AbstractAuthenticationToken;

import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.core.GrantedAuthority;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.oauth2.jwt.Jwt;

import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;

import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;

import org.springframework.security.web.SecurityFilterChain;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain
    securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                /*
                 * REST API authentication is
                 * token based, so CSRF is not
                 * required here.
                 */
                .csrf(
                        csrf ->
                                csrf.disable()
                )

                /*
                 * Allow requests from the
                 * Next.js frontend.
                 */
                .cors(
                        cors ->
                                cors.configurationSource(
                                        corsConfigurationSource()
                                )
                )

                .authorizeHttpRequests(
                        auth ->
                                auth

                                        /*
                                         * Public uploaded product images.
                                         */
                                        .requestMatchers(
                                                HttpMethod.GET,
                                                "/uploads/**"
                                        )
                                        .permitAll()

                                        /*
                                         * Public product browsing.
                                         */
                                        .requestMatchers(
                                                HttpMethod.GET,
                                                "/api/products/**"
                                        )
                                        .permitAll()

                                        /*
                                         * ADMIN product creation.
                                         */
                                        .requestMatchers(
                                                HttpMethod.POST,
                                                "/api/products/**"
                                        )
                                        .hasRole(
                                                "ADMIN"
                                        )

                                        /*
                                         * ADMIN product updates.
                                         */
                                        .requestMatchers(
                                                HttpMethod.PUT,
                                                "/api/products/**"
                                        )
                                        .hasRole(
                                                "ADMIN"
                                        )

                                        .requestMatchers(
                                                HttpMethod.PATCH,
                                                "/api/products/**"
                                        )
                                        .hasRole(
                                                "ADMIN"
                                        )

                                        /*
                                         * ADMIN product deletion.
                                         */
                                        .requestMatchers(
                                                HttpMethod.DELETE,
                                                "/api/products/**"
                                        )
                                        .hasRole(
                                                "ADMIN"
                                        )

                                        /*
                                         * Inventory is ADMIN only.
                                         */
                                        .requestMatchers(
                                                "/api/inventory/**"
                                        )
                                        .hasRole(
                                                "ADMIN"
                                        )

                                        /*
                                         * General admin endpoints.
                                         */
                                        .requestMatchers(
                                                "/api/admin/**"
                                        )
                                        .hasRole(
                                                "ADMIN"
                                        )

                                        /*
                                         * CUSTOMER
                                         *
                                         * The currently authenticated
                                         * customer can read their own
                                         * profile.
                                         *
                                         * IMPORTANT:
                                         * This must appear before
                                         * /api/customers/**.
                                         */
                                        .requestMatchers(
                                                HttpMethod.GET,
                                                "/api/customers/me"
                                        )
                                        .hasRole(
                                                "CUSTOMER"
                                        )

                                        /*
                                         * CUSTOMER
                                         *
                                         * Update own profile.
                                         */
                                        .requestMatchers(
                                                HttpMethod.PUT,
                                                "/api/customers/me"
                                        )
                                        .hasRole(
                                                "CUSTOMER"
                                        )

                                        /*
                                         * ADMIN
                                         *
                                         * All remaining customer
                                         * management endpoints.
                                         *
                                         * Examples:
                                         *
                                         * GET /api/customers
                                         * GET /api/customers/{id}
                                         * PATCH /api/customers/{id}/status
                                         */
                                        .requestMatchers(
                                                HttpMethod.POST,
                                                "/api/customers/me/sync"
                                        )
                                        .hasRole(
                                                "CUSTOMER"
                                        )

                                        .requestMatchers(
                                                "/api/customers/**"
                                        )
                                        .hasRole(
                                                "ADMIN"
                                        )

                                        /*
                                         * ADMIN ONLY
                                         *
                                         * Get every order.
                                         *
                                         * This exact matcher must be
                                         * before /api/orders/**.
                                         */
                                        .requestMatchers(
                                                HttpMethod.GET,
                                                "/api/orders"
                                        )
                                        .hasRole(
                                                "ADMIN"
                                        )

                                        /*
                                         * CUSTOMER or ADMIN
                                         *
                                         * Customer ownership is still
                                         * checked inside OrderService.
                                         */
                                        .requestMatchers(
                                                HttpMethod.GET,
                                                "/api/orders/**"
                                        )
                                        .hasAnyRole(
                                                "CUSTOMER",
                                                "ADMIN"
                                        )

                                        /*
                                         * CUSTOMER ONLY
                                         *
                                         * Place a new order.
                                         */
                                        .requestMatchers(
                                                HttpMethod.POST,
                                                "/api/orders"
                                        )
                                        .hasRole(
                                                "CUSTOMER"
                                        )

                                        /*
                                         * ADMIN ONLY
                                         *
                                         * Change order status.
                                         */
                                        .requestMatchers(
                                                HttpMethod.PATCH,
                                                "/api/orders/**"
                                        )
                                        .hasRole(
                                                "ADMIN"
                                        )

                                        /*
                                         * Everything else requires a
                                         * valid authenticated JWT.
                                         */
                                        .anyRequest()
                                        .authenticated()
                )

                /*
                 * Validate Keycloak JWTs.
                 */
                .oauth2ResourceServer(
                        oauth2 ->
                                oauth2.jwt(
                                        jwt ->
                                                jwt.jwtAuthenticationConverter(
                                                        jwtAuthenticationConverter()
                                                )
                                )
                );

        return http.build();
    }

    /*
     * Convert Keycloak realm roles
     * into Spring Security roles.
     *
     * Example:
     *
     * CUSTOMER
     * becomes
     * ROLE_CUSTOMER
     *
     * ADMIN
     * becomes
     * ROLE_ADMIN
     */
    @Bean
    public Converter<
            Jwt,
            AbstractAuthenticationToken
            > jwtAuthenticationConverter() {

        JwtAuthenticationConverter converter =
                new JwtAuthenticationConverter();

        converter
                .setJwtGrantedAuthoritiesConverter(
                        jwt -> {

                            Collection<GrantedAuthority>
                                    authorities =
                                    new ArrayList<>();

                            /*
                             * Keep standard OAuth scopes.
                             */
                            JwtGrantedAuthoritiesConverter
                                    defaultConverter =
                                    new JwtGrantedAuthoritiesConverter();

                            Collection<GrantedAuthority>
                                    defaultAuthorities =
                                    defaultConverter
                                            .convert(
                                                    jwt
                                            );

                            if (
                                    defaultAuthorities
                                            != null
                            ) {

                                authorities.addAll(
                                        defaultAuthorities
                                );
                            }

                            /*
                             * Read Keycloak realm roles.
                             */
                            Map<String, Object>
                                    realmAccess =
                                    jwt.getClaimAsMap(
                                            "realm_access"
                                    );

                            if (
                                    realmAccess
                                            != null
                            ) {

                                Object rolesObject =
                                        realmAccess
                                                .get(
                                                        "roles"
                                                );

                                if (
                                        rolesObject
                                                instanceof List<?> roles
                                ) {

                                    roles
                                            .stream()

                                            .map(
                                                    Object::toString
                                            )

                                            .map(
                                                    role ->
                                                            new SimpleGrantedAuthority(
                                                                    "ROLE_"
                                                                            +
                                                                            role.toUpperCase()
                                                            )
                                            )

                                            .forEach(
                                                    authorities::add
                                            );
                                }
                            }

                            return authorities;
                        }
                );

        /*
         * Spring authentication name
         * will use the Keycloak username.
         *
         * jwt.getSubject() still gives us
         * the stable Keycloak user ID.
         */
        converter
                .setPrincipalClaimName(
                        "preferred_username"
                );

        return converter;
    }

    /*
     * CORS configuration for
     * Next.js development frontend.
     */
    @Bean
    public CorsConfigurationSource
    corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration
                .setAllowedOrigins(
                        List.of(
                                "http://localhost:3000"
                        )
                );

        configuration
                .setAllowedMethods(
                        List.of(
                                "GET",
                                "POST",
                                "PUT",
                                "PATCH",
                                "DELETE",
                                "OPTIONS"
                        )
                );

        configuration
                .setAllowedHeaders(
                        List.of(
                                "Authorization",
                                "Content-Type"
                        )
                );

        configuration
                .setAllowCredentials(
                        true
                );

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source
                .registerCorsConfiguration(
                        "/**",
                        configuration
                );

        return source;
    }
}