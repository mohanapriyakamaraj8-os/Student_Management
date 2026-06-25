import React, { useState } from 'react';
import axios from 'axios';

/**
 * Registration Component for new students.
 * Includes complete input form validation, API submission, and state-driven notifications.
 */
export default function Register({ setPage }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input changes dynamically
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear validation error for this field as the student types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  // Perform client-side validations
  const validateForm = () => {
    const tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      tempErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters long';
    }

    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(tempErrors);
    // If tempErrors is empty, form is valid
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setApiSuccess('');

    // 1. Run client-side validations
    if (!validateForm()) return;

    setLoading(true);
    try {
      // 2. Make API call to backend register endpoint
      const response = await axios.post('https://student-management-e066.onrender.com/api/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // 3. Handle successful registration
      setApiSuccess(response.data.message || 'Registration successful!');
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });

      // Automatically redirect to login page after 2.5 seconds
      setTimeout(() => {
        setPage('login');
      }, 2500);

    } catch (error) {
      // 4. Handle registration failures (e.g. duplicate email)
      if (error.response && error.response.data) {
        // If it's a field-level backend validation error
        if (typeof error.response.data === 'object' && !error.response.data.error) {
          setErrors(error.response.data);
        } else {
          setApiError(error.response.data.error || 'Registration failed. Please try again.');
        }
      } else {
        setApiError('Unable to connect to the server. Please check if backend is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center flex-grow-1 my-5 animated-fade-in">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="card glass-card p-4 p-sm-5 text-white">
            
            {/* Form Header */}
            <div className="text-center mb-4">
              <span style={{ fontSize: '3rem' }}>📝</span>
              <h2 className="fw-bold mt-2 mb-1">Create Account</h2>
              <p className="text-muted small">Join us and start managing your profile</p>
            </div>

            {/* API Success Alert */}
            {apiSuccess && (
              <div className="alert alert-custom-success text-center mb-4 py-2" role="alert">
                {apiSuccess} <br/>
                <span className="small text-white-50">Redirecting to login...</span>
              </div>
            )}

            {/* API Generic Error Alert */}
            {apiError && (
              <div className="alert alert-custom-danger text-center mb-4 py-2" role="alert">
                ⚠️ {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              
              {/* Name Field */}
              <div className="mb-3">
                <label className="form-label small fw-semibold text-white-50">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-control form-control-custom ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="John Doe"
                  required
                />
                {errors.name && <div className="invalid-feedback text-danger small mt-1">{errors.name}</div>}
              </div>

              {/* Email Field */}
              <div className="mb-3">
                <label className="form-label small fw-semibold text-white-50">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-control form-control-custom ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="john.doe@example.com"
                  required
                />
                {errors.email && <div className="invalid-feedback text-danger small mt-1">{errors.email}</div>}
              </div>

              {/* Password Field */}
              <div className="mb-3">
                <label className="form-label small fw-semibold text-white-50">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-control form-control-custom ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="••••••••"
                  required
                />
                {errors.password && <div className="invalid-feedback text-danger small mt-1">{errors.password}</div>}
              </div>

              {/* Confirm Password Field */}
              <div className="mb-4">
                <label className="form-label small fw-semibold text-white-50">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`form-control form-control-custom ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  placeholder="••••••••"
                  required
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback text-danger small mt-1">{errors.confirmPassword}</div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary-custom w-100 mb-3"
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Creating Account...
                  </>
                ) : (
                  'Register'
                )}
              </button>

              {/* Navigation Link */}
              <div className="text-center">
                <span className="text-white-50 small">Already have an account? </span>
                <button
                  type="button"
                  onClick={() => setPage('login')}
                  className="btn btn-link p-0 text-decoration-none small fw-semibold"
                  style={{ color: 'var(--secondary-color)' }}
                >
                  Log In
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
