package com.studentapp.repository;

import com.studentapp.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for database operations on the Student entity.
 * JpaRepository provides standard CRUD methods (save, findById, delete, etc.) automatically.
 */
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    
    /**
     * Find a student by their email address.
     * Used for login verification and registration duplicate checks.
     *
     * @param email the email to search for
     * @return an Optional containing the Student if found, or empty if not
     */
    Optional<Student> findByEmail(String email);
}
