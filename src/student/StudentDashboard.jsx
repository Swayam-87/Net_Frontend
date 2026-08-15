import React from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from './StudentLayout';

const StudentDashboard = () => {
  return (
    <StudentLayout>
      <div className="page-title-block">
        <h1>Student Portal</h1>
        <div className="breadcrumbs">
          <Link to="/student/dashboard" style={{ textDecoration: 'none', color: '#64748b' }}>Home</Link> /{' '}
          <span>My Project Dashboard</span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="summary-grid">
        <div className="summary-card">
          <div className="card-icon-container projects">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <div className="summary-card-info">
            <span className="summary-card-title">Project Progress</span>
            <span className="summary-card-value">75%</span>
            <span className="summary-card-desc">overall completion</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon-container tasks">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="9" y1="6" x2="20" y2="6"></line>
              <line x1="9" y1="12" x2="20" y2="12"></line>
              <line x1="9" y1="18" x2="20" y2="18"></line>
              <line x1="4" y1="6" x2="4.01" y2="6"></line>
              <line x1="4" y1="12" x2="4.01" y2="12"></line>
              <line x1="4" y1="18" x2="4.01" y2="18"></line>
            </svg>
          </div>
          <div className="summary-card-info">
            <span className="summary-card-title">Tasks Assigned</span>
            <span className="summary-card-value">8</span>
            <span className="summary-card-desc">total deliverables</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon-container students">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
            </svg>
          </div>
          <div className="summary-card-info">
            <span className="summary-card-title">Tasks Completed</span>
            <span className="summary-card-value">6</span>
            <span className="summary-card-desc">submitted deliverables</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon-container faculty">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <div className="summary-card-info">
            <span className="summary-card-title">Total Score</span>
            <span className="summary-card-value">85/100</span>
            <span className="summary-card-desc">evaluated grade points</span>
          </div>
        </div>
      </div>

      {/* Project Details Panel */}
      <div className="card" style={{ marginBottom: '25px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0f172a', marginBottom: '10px' }}>Active Project Details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', fontSize: '0.9rem' }}>
          <div><strong>Title:</strong>Student Project Management</div>
          <div><strong>Faculty Supervisor:</strong>Madhuresh sir</div>
          <div><strong>Deadline:</strong> 2026-09-15</div>
        </div>
      </div>

      {/* Task List */}
      <div className="data-table-container">
        <div className="data-table-header">
          <span className="table-title">My Project Deliverables</span>
        </div>
        <div className="table-responsive">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Deliverable Title</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Database normalization & model setup</td>
                <td>2026-07-10</td>
                <td><span className="badge high">High</span></td>
                <td>10 / 10</td>
                <td><span className="badge completed">Completed</span></td>
              </tr>
              <tr>
                <td>Setup basic routing & login form validation</td>
                <td>2026-07-20</td>
                <td><span className="badge medium">Medium</span></td>
                <td>8 / 10</td>
                <td><span className="badge completed">Completed</span></td>
              </tr>
              <tr>
                <td>Responsive sidebar & layouts integration</td>
                <td>2026-07-25</td>
                <td><span className="badge low">Low</span></td>
                <td>-</td>
                <td><span className="badge progress">In Progress</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;
