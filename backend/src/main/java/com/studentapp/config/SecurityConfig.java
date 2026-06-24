package com.studentapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Security and web configuration class.
 * Since we only import 'spring-security-crypto', there are no default HTTP filters blocking requests.
 * We define the BCrypt password encoder bean and CORS configuration here.
 */
@Configuration
public class SecurityConfig {

    /**
     * Exposes BCryptPasswordEncoder as a Spring Bean so it can be injected and used for password hashing.
     */
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Configures global CORS (Cross-Origin Resource Sharing) permissions.
     * Allows our React frontend (running on Vite or standard port) to make API calls to the Spring Boot server.
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**") // Allow CORS for all endpoints starting with /api/
                        .allowedOrigins("http://localhost:5173", "http://localhost:3000") // Allow both Vite (5173) and CRA (3000)
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
