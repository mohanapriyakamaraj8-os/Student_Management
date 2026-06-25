import React, { useState } from 'react';
import axios from 'axios';

/**
 * Login Component for student authentication.
 * Performs validation, sends request to Spring Boot login endpoint, and stores session tokens in localStorage.
 */
export default function Login({ setPage, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear validation error for this field
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

    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      tempErrors.password = 'Password is required';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    // 1. Run client-side validations
    if (!validateForm()) return;

    setLoading(true);
    try {
      // 2. Make API call to backend login endpoint
      const response = await axios.post('https://student-management-e066.onrender.com/api/login', {
        email: formData.email,
        password: formData.password
      });

      // 3. Store authentication session details in localStorage
      const authData = response.data;
      localStorage.setItem('studentToken', authData.token);
      localStorage.setItem('studentName', authData.name);
      localStorage.setItem('studentEmail', authData.email);

      // 4. Update the App component state via callback
      onLoginSuccess({
        token: authData.token,
        name: authData.name,
        email: authData.email
      });

      // 5. Navigate to dashboard page
      setPage('dashboard');

    } catch (error) {
      // 6. Handle credential failures
      if (error.response && error.response.data) {
        setApiError(error.response.data.error || 'Authentication failed. Please verify credentials.');
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
              <span style={{ fontSize: '3rem' }}>🔐</span>
              <h2 className="fw-bold mt-2 mb-1">Student Login</h2>
              <p className="text-muted small">Enter credentials to access your dashboard</p>
            </div>

            {/* Error Alert */}
            {apiError && (
              <div className="alert alert-custom-danger text-center mb-4 py-2" role="alert">
                ⚠️ {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              
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
              <div className="mb-4">
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary-custom w-100 mb-3"
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Authenticating...
                  </>
                ) : (
                  'Login'
                )}
              </button>

              {/* Navigation Link */}
              <div className="text-center">
                <span className="text-white-50 small">New student? </span>
                <button
                  type="button"
                  onClick={() => setPage('register')}
                  className="btn btn-link p-0 text-decoration-none small fw-semibold"
                  style={{ color: 'var(--secondary-color)' }}
                >
                  Register Now
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
