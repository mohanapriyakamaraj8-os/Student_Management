-- Database creation script for Student Login and Registration system
-- Target Database: PostgreSQL
-- You can create the database manually using pgAdmin or run:
-- CREATE DATABASE student_db;

-- Table structure for students
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Sample Data (Optional)
-- Password for sample user 'John Doe' is 'password123' hashed with BCrypt
-- INSERT INTO students (name, email, password) VALUES 
-- ('John Doe', 'john.doe@example.com', '$2a$10$8.UnVuG9HHgffUDAlk8GPuRVTcR8MecGkCgJKt2l2A9UvG2K18ySy');
