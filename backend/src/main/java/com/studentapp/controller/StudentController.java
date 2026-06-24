package com.studentapp.controller;

import com.studentapp.dto.AuthResponse;
import com.studentapp.dto.LoginRequest;
import com.studentapp.dto.RegisterRequest;
import com.studentapp.entity.Student;
import com.studentapp.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

/**
 * Controller class that defines REST endpoints for Student Registration and Login.
 */
@RestController
@RequestMapping("/api")
public class StudentController {

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    /**
     * Endpoint for registering a student.
     * Maps to: POST /api/register
     *
     * @param request the validated registration payload
     * @return a success response
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        Student registeredStudent = studentService.registerStudent(request);
        
        // Return a response that includes student info (without password)
        AuthResponse response = new AuthResponse(
                null, // No token generated on registration, registration successful
                "Student registered successfully!",
                registeredStudent.getId(),
                registeredStudent.getName(),
                registeredStudent.getEmail()
        );
        return ResponseEntity.ok(response);
    }

    /**
     * Endpoint for logging in a student.
     * Maps to: POST /api/login
     *
     * @param request the validated login credentials
     * @return an AuthResponse containing a session token and student details
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        Student authenticatedStudent = studentService.loginStudent(request);

        // Generate a simple simulated session token (UUID) representing the session token/JWT
        String mockSessionToken = "session-" + UUID.randomUUID().toString() + "-" + authenticatedStudent.getId();

        AuthResponse response = new AuthResponse(
                mockSessionToken,
                "Login successful!",
                authenticatedStudent.getId(),
                authenticatedStudent.getName(),
                authenticatedStudent.getEmail()
        );
        return ResponseEntity.ok(response);
    }
}
