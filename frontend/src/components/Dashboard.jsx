import React, { useEffect } from 'react';

/**
 * Dashboard Component displayed after successful student authentication.
 * Includes session verification, visual card statistics (mocked), profile details, and a logout button.
 */
export default function Dashboard({ studentInfo, onLogout, setPage }) {
  
  // Protect the dashboard page from unauthorized users
  useEffect(() => {
    const token = localStorage.getItem('studentToken');
    if (!token && !studentInfo) {
      setPage('login');
    }
  }, [studentInfo, setPage]);

  if (!studentInfo && !localStorage.getItem('studentToken')) {
    return null; // Don't render content during redirection
  }

  // Retrieve user credentials from storage/props
  const name = studentInfo?.name || localStorage.getItem('studentName') || 'Student';
  const email = studentInfo?.email || localStorage.getItem('studentEmail') || 'N/A';

  // Perform logout sequence
  const handleLogoutClick = () => {
    localStorage.removeItem('studentToken');
    localStorage.removeItem('studentName');
    localStorage.removeItem('studentEmail');
    onLogout();
    setPage('login');
  };

  return (
    <div className="container py-5 flex-grow-1 animated-fade-in text-white">
      
      {/* Welcome Banner */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="card glass-card p-4 p-md-5 d-flex flex-md-row justify-content-between align-items-md-center">
            <div>
              <span className="badge badge-custom mb-3">Active Session</span>
              <h1 className="fw-bold display-5 mb-2">Welcome Back, {name}!</h1>
              <p className="text-white-50 mb-0">Managed Email: <strong>{email}</strong></p>
            </div>
            <div className="mt-4 mt-md-0">
              <button onClick={handleLogoutClick} className="btn btn-outline-custom px-4 py-2">
                Sign Out 🚪
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mock Academic Stats Widgets to make the portal look premium */}
      <div className="row g-4">
        
        {/* Stat Card 1 */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card glass-card h-100 p-4 border-0" style={{ borderLeft: '4px solid var(--primary-color) !important' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="text-white-50 small fw-semibold uppercase tracking-wide mb-0">Current GPA</h5>
              <span style={{ fontSize: '1.5rem' }}>📈</span>
            </div>
            <h2 className="fw-bold display-6 text-white mb-2">3.92</h2>
            <p className="small text-success mb-0">
              <span className="me-1">↑ 0.12</span> vs last semester
            </p>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card glass-card h-100 p-4 border-0" style={{ borderLeft: '4px solid var(--secondary-color) !important' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="text-white-50 small fw-semibold uppercase tracking-wide mb-0">Enrolled Courses</h5>
              <span style={{ fontSize: '1.5rem' }}>📚</span>
            </div>
            <h2 className="fw-bold display-6 text-white mb-2">6</h2>
            <p className="small text-white-50 mb-0">
              Spring 2026 Semester
            </p>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card glass-card h-100 p-4 border-0" style={{ borderLeft: '4px solid var(--success-color) !important' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="text-white-50 small fw-semibold uppercase tracking-wide mb-0">Attendance Rate</h5>
              <span style={{ fontSize: '1.5rem' }}>📅</span>
            </div>
            <h2 className="fw-bold display-6 text-white mb-2">96%</h2>
            <p className="small text-success mb-0">
              Good Standing status
            </p>
          </div>
        </div>

        {/* Stat Card 4 */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card glass-card h-100 p-4 border-0" style={{ borderLeft: '4px solid #f59e0b !important' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="text-white-50 small fw-semibold uppercase tracking-wide mb-0">Pending Tasks</h5>
              <span style={{ fontSize: '1.5rem' }}>🔔</span>
            </div>
            <h2 className="fw-bold display-6 text-white mb-2">3</h2>
            <p className="small text-warning mb-0">
              Requires immediate action
            </p>
          </div>
        </div>

      </div>

      {/* Main Profile Info Section */}
      <div className="row g-4 mt-2">
        <div className="col-12 col-lg-8">
          <div className="card glass-card p-4">
            <h3 className="fw-bold mb-4">Quick Links</h3>
            <div className="list-group list-group-flush bg-transparent">
              <a href="#" className="list-group-item bg-transparent text-white border-secondary border-opacity-25 px-0 d-flex justify-content-between align-items-center">
                <span>View Course Syllabus & Schedule</span>
                <span className="text-muted">➔</span>
              </a>
              <a href="#" className="list-group-item bg-transparent text-white border-secondary border-opacity-25 px-0 d-flex justify-content-between align-items-center">
                <span>Submit Assignments & Projects</span>
                <span className="text-muted">➔</span>
              </a>
              <a href="#" className="list-group-item bg-transparent text-white border-secondary border-opacity-25 px-0 d-flex justify-content-between align-items-center">
                <span>Access Student Grade Reports</span>
                <span className="text-muted">➔</span>
              </a>
              <a href="#" className="list-group-item bg-transparent text-white border-0 px-0 d-flex justify-content-between align-items-center">
                <span>Register for Next Semester Courses</span>
                <span className="text-muted">➔</span>
              </a>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card glass-card p-4 text-center">
            <h4 className="fw-bold mb-3">Profile Verification</h4>
            <div className="mb-4">
              <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25 py-2 px-3">
                Verified Student Account
              </span>
            </div>
            <p className="text-white-50 small mb-4">
              Your profile is verified with our central academic database system. Contact student helpdesk for details.
            </p>
            <div className="border-top border-secondary border-opacity-25 pt-3">
              <span className="small text-muted d-block">ID: #{studentInfo?.id || localStorage.getItem('studentToken')?.split('-').pop() || '0028'}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
