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
                .csrf(
                        csrf ->
                                csrf.disable()
                )

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
                                         * Public uploaded images.
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
                                         * ADMIN product operations.
                                         *
                                         * This includes:
                                         * POST /api/products
                                         * POST /api/products/images
                                         */
                                        .requestMatchers(
                                                HttpMethod.POST,
                                                "/api/products/**"
                                        )
                                        .hasRole(
                                                "ADMIN"
                                        )

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

                                        .requestMatchers(
                                                HttpMethod.DELETE,
                                                "/api/products/**"
                                        )
                                        .hasRole(
                                                "ADMIN"
                                        )

                                        .requestMatchers(
                                                "/api/inventory/**"
                                        )
                                        .hasRole(
                                                "ADMIN"
                                        )

                                        .requestMatchers(
                                                "/api/admin/**"
                                        )
                                        .hasRole(
                                                "ADMIN"
                                        )

                                        .requestMatchers(
        HttpMethod.GET,
        "/api/orders"
)
.hasRole("ADMIN")

/*
 * Customer order history and
 * individual order reads.
 *
 * Ownership is checked by OrderService.
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
 * Only CUSTOMER accounts place orders.
 */
.requestMatchers(
        HttpMethod.POST,
        "/api/orders"
)
.hasRole("CUSTOMER")

/*
 * Only ADMIN can change order state.
 */
.requestMatchers(
        HttpMethod.PATCH,
        "/api/orders/**"
)
.hasRole("ADMIN")

                                        .anyRequest()
                                        .authenticated()
                )

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

                            JwtGrantedAuthoritiesConverter
                                    defaultConverter =
                                    new JwtGrantedAuthoritiesConverter();

                            Collection<GrantedAuthority>
                                    defaultAuthorities =
                                    defaultConverter
                                            .convert(jwt);

                            if (
                                    defaultAuthorities
                                            != null
                            ) {
                                authorities.addAll(
                                        defaultAuthorities
                                );
                            }

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
                                                                            + role.toUpperCase()
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

        converter
                .setPrincipalClaimName(
                        "preferred_username"
                );

        return converter;
    }

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

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }
}