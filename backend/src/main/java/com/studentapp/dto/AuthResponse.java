package com.studentapp.dto;

/**
 * Data Transfer Object (DTO) containing authentication details returned to the frontend.
 * Includes a simulated session/JWT token and basic student profile information.
 */
public class AuthResponse {
    private String token;
    private String message;
    private Long id;
    private String name;
    private String email;

    public AuthResponse() {
    }

    public AuthResponse(String token, String message, Long id, String name, String email) {
        this.token = token;
        this.message = message;
        this.id = id;
        this.name = name;
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
