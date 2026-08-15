import React from 'react';
import { Link } from 'react-router-dom';
import FacultyLayout from './FacultyLayout';

const FacultyDashboard = () => {
  return (
    <FacultyLayout>
      <div className="page-title-block">
        <h1>Faculty Workspace</h1>
        <div className="breadcrumbs">
          <Link to="/faculty/dashboard" style={{ textDecoration: 'none', color: '#64748b' }}>Home</Link> /{' '}
          <span>Supervision Dashboard</span>
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
            <span className="summary-card-title">Supervised Projects</span>
            <span className="summary-card-value">3</span>
            <span className="summary-card-desc">allocated projects</span>
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
            <span className="summary-card-title">Active Deliverables</span>
            <span className="summary-card-value">12</span>
            <span className="summary-card-desc">assigned tasks</span>
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
            <span className="summary-card-title">Evaluated Deliverables</span>
            <span className="summary-card-value">8</span>
            <span className="summary-card-desc">scored tasks</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon-container faculty">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <div className="summary-card-info">
            <span className="summary-card-title">Pending Reviews</span>
            <span className="summary-card-value">4</span>
            <span className="summary-card-desc">tasks awaiting grades</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-card-header">Project Lifecycle Progress</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', height: '220px', justifyContent: 'center' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                <span>Database normalisation & design</span>
                <span style={{ fontWeight: 600 }}>100%</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px' }}>
                <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--success)', borderRadius: '4px' }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                <span>UI layouts & Form integrations</span>
                <span style={{ fontWeight: 600 }}>60%</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px' }}>
                <div style={{ width: '60%', height: '100%', backgroundColor: 'var(--primary)', borderRadius: '4px' }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                <span>API validations & testing</span>
                <span style={{ fontWeight: 600 }}>20%</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px' }}>
                <div style={{ width: '20%', height: '100%', backgroundColor: 'var(--warning)', borderRadius: '4px' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card-header">Deliverable Priorities</div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '220px' }}>
            <svg width="150" height="150" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e2e8f0" strokeWidth="3.5"></circle>
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--danger)" strokeWidth="3.5" strokeDasharray="50 50" strokeDashoffset="0"></circle>
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--warning)" strokeWidth="3.5" strokeDasharray="30 70" strokeDashoffset="-50"></circle>
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--primary)" strokeWidth="3.5" strokeDasharray="20 80" strokeDashoffset="-80"></circle>
            </svg>
          </div>
        </div>
      </div>

      {/* Supervised Project List
      <div className="data-table-container">
        <div className="data-table-header">
          <span className="table-title">Supervised Project Lists</span>
        </div>
        <div className="table-responsive">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Assigned Student</th>
                <th>Tasks completed</th>
                <th>Progress</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>IoT Smart Agriculture Node</td>
                <td>Aarav Mehta</td>
                <td>6 / 8</td>
                <td>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar-track">
                      <div className="progress-bar-fill" style={{ width: '75%' }}></div>
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>75%</span>
                  </div>
                </td>
                <td><span className="badge progress">In Progress</span></td>
              </tr>
              <tr>
                <td>Realtime Chat Integration</td>
                <td>Priya Sharma</td>
                <td>3 / 10</td>
                <td>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar-track">
                      <div className="progress-bar-fill" style={{ width: '30%' }}></div>
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>30%</span>
                  </div>
                </td>
                <td><span className="badge pending">Active</span></td>
              </tr>
            </tbody>
          </table>
        </div> */}
      {/* </div> */}
    </FacultyLayout>
  );
};

export default FacultyDashboard;
