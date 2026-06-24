package com.studentapp.service;

import com.studentapp.dto.LoginRequest;
import com.studentapp.dto.RegisterRequest;
import com.studentapp.entity.Student;
import com.studentapp.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service class that contains business logic for Students.
 * It sits between the Controller (which handles HTTP requests) and the Repository (which talks to the DB).
 */
@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public StudentService(StudentRepository studentRepository, BCryptPasswordEncoder passwordEncoder) {
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Registers a new student in the system.
     * Checks for existing email, hashes the password with BCrypt, and saves to the database.
     *
     * @param request the registration details
     * @return the saved Student entity
     */
    public Student registerStudent(RegisterRequest request) {
        // 1. Check if the email is already registered in the DB
        Optional<Student> existingStudent = studentRepository.findByEmail(request.getEmail());
        if (existingStudent.isPresent()) {
            throw new IllegalArgumentException("Email is already in use!");
        }

        // 2. Hash the raw password using BCrypt for security
        String hashedPassword = passwordEncoder.encode(request.getPassword());

        // 3. Create a new Student entity object
        Student student = new Student(
                request.getName(),
                request.getEmail(),
                hashedPassword
        );

        // 4. Save the entity to the database and return it
        return studentRepository.save(student);
    }

    /**
     * Authenticates a student based on email and password.
     * Checks if user exists and uses BCrypt match to verify the credentials.
     *
     * @param request the login credentials
     * @return the authenticated Student entity
     */
    public Student loginStudent(LoginRequest request) {
        // 1. Fetch the student from database by email
        Student student = studentRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password!"));

        // 2. Verify that the incoming raw password matches the encrypted database password
        boolean isPasswordMatch = passwordEncoder.matches(request.getPassword(), student.getPassword());
        if (!isPasswordMatch) {
            throw new IllegalArgumentException("Invalid email or password!");
        }

        // 3. Return the authenticated student
        return student;
    }
}
