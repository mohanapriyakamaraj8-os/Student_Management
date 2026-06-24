import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

/**
 * Main application component.
 * Manages state-based routing and loads local storage sessions on application launch.
 */
export default function App() {
  // Simple state routing: 'login' | 'register' | 'dashboard'
  const [page, setPage] = useState('login');
  const [studentInfo, setStudentInfo] = useState(null);

  // Check for existing session token on application load
  useEffect(() => {
    const token = localStorage.getItem('studentToken');
    const name = localStorage.getItem('studentName');
    const email = localStorage.getItem('studentEmail');

    if (token && name && email) {
      setStudentInfo({ token, name, email });
      setPage('dashboard');
    }
  }, []);

  const handleLoginSuccess = (info) => {
    setStudentInfo(info);
  };

  const handleLogout = () => {
    setStudentInfo(null);
  };

  return (
    <div className="d-flex flex-column min-height-inherit w-100 flex-grow-1">
      
      {/* Navigation Header */}
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar py-3">
        <div className="container">
          <button 
            onClick={() => setPage(studentInfo ? 'dashboard' : 'login')} 
            className="navbar-brand fw-bold border-0 bg-transparent text-white d-flex align-items-center"
            style={{ cursor: 'pointer' }}
          >
            <span className="me-2" style={{ fontSize: '1.4rem' }}>🎓</span>
            StudentHub
          </button>
          
          <div className="d-flex align-items-center">
            {studentInfo ? (
              <div className="d-flex align-items-center gap-3">
                <span className="text-white-50 small d-none d-sm-inline">
                  Welcome, <strong>{studentInfo.name}</strong>
                </span>
                <button 
                  onClick={() => {
                    localStorage.clear();
                    handleLogout();
                    setPage('login');
                  }} 
                  className="btn btn-sm btn-outline-custom"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <button 
                  onClick={() => setPage('login')} 
                  className={`btn btn-sm ${page === 'login' ? 'btn-primary-custom' : 'btn-outline-custom'}`}
                >
                  Login
                </button>
                <button 
                  onClick={() => setPage('register')} 
                  className={`btn btn-sm ${page === 'register' ? 'btn-primary-custom' : 'btn-outline-custom'}`}
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Pages Content */}
      <main className="flex-grow-1 d-flex align-items-center justify-content-center">
        {page === 'login' && (
          <Login setPage={setPage} onLoginSuccess={handleLoginSuccess} />
        )}
        {page === 'register' && (
          <Register setPage={setPage} />
        )}
        {page === 'dashboard' && (
          <Dashboard studentInfo={studentInfo} onLogout={handleLogout} setPage={setPage} />
        )}
      </main>

      {/* Footer */}
      <footer className="py-4 text-center border-top border-secondary border-opacity-10 mt-auto text-white-50 small" style={{ background: 'rgba(15, 23, 42, 0.4)' }}>
        <div className="container">
          <p className="mb-0">© {new Date().getFullYear()} StudentHub Login and Registration System. All rights reserved.</p>
          <p className="mb-0 mt-1 text-muted" style={{ fontSize: '0.8rem' }}>Designed with React, Bootstrap, Spring Boot & PostgreSQL</p>
        </div>
      </footer>

    </div>
  );
}
