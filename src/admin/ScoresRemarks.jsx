import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';

const ScoresRemarks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('Add');

  // Blank form state
  const [formData, setFormData] = useState({
    studentId: '',
    projectId: '',
    taskId: '',
    earnedScore: '',
    facultyRemarks: ''
  });

  const scores = [
    {
      scoreId: 1,
      studentName: 'Priya Sharma',
      projectTitle: 'Student Project Management',
      taskTitle: 'Database normalization & model setup',
      assignedScore: 10,
      earnedScore: 10,
      remarks: 'Excellent normalization; structure aligns perfectly with relational integrity guidelines.'
    },
    {
      scoreId: 2,
      studentName: 'Priya Sharma',
      projectTitle: 'Student Project Management',
      taskTitle: 'Setup basic routing & login form validation',
      assignedScore: 10,
      earnedScore: 8,
      remarks: 'Proper route protection. Form styling and responsiveness can be polished.'
    },
    {
      scoreId: 3,
      studentName: 'Rohan Shah',
      projectTitle: 'E-Commerce Engine',
      taskTitle: 'Vite Setup and Dev server configurations',
      assignedScore: 15,
      earnedScore: 14,
      remarks: 'Clean configuration script. Bundler plugins structured nicely.'
    }
  ];

  const filteredScores = scores.filter(score => 
    score.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    score.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    score.taskTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    score.remarks.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (type) => {
    setModalType(type);
    setFormData({
      studentId: '',
      projectId: '',
      taskId: '',
      earnedScore: '',
      facultyRemarks: ''
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    // Do nothing
  };

  return (
    <AdminLayout>
      <div className="page-title-block" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Scores & Remarks</h1>
          <div className="breadcrumbs">
            <Link to="/admin/dashboard" style={{ textDecoration: 'none', color: '#64748b' }}>Home</Link> /{' '}
            <span>Scores & Remarks</span>
          </div>
        </div>
        <button 
          className="btn-primary" 
          style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}
          onClick={() => handleOpenModal('Record')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          Record Score
        </button>
      </div>

      {/* Filter and Search */}
      <div className="card" style={{ padding: '16px 20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f1f5f9', borderRadius: '8px', padding: '8px 14px', maxWidth: '380px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}>
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="Search evaluation records..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', marginLeft: '10px', width: '100%', fontSize: '0.9rem', color: 'var(--text-main)' }}
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="data-table-container">
        <div className="data-table-header">
          <span className="table-title">Student Academic Score Logs</span>
        </div>
        <div className="table-responsive">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Record ID</th>
                <th>Student</th>
                <th>Project Context</th>
                <th>Evaluated Deliverable (Task)</th>
                <th>Marks Obtained</th>
                <th>Supervisor Remarks</th>
                <th style={{ width: '150px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredScores.length > 0 ? (
                filteredScores.map((score) => (
                  <tr key={score.scoreId}>
                    <td><span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>#{score.scoreId}</span></td>
                    <td><span style={{ fontWeight: 600 }}>{score.studentName}</span></td>
                    <td><span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{score.projectTitle}</span></td>
                    <td><span style={{ fontWeight: 500 }}>{score.taskTitle}</span></td>
                    <td>
                      <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                        {score.earnedScore}
                      </span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}> / {score.assignedScore}</span>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: '1.4', maxWidth: '300px' }}>
                      {score.remarks}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button 
                          onClick={() => handleOpenModal('Modify')}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: 'var(--primary-light)',
                            color: 'var(--primary)',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: 600,
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                          Edit
                        </button>
                        <button 
                          onClick={handleDeleteClick}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#fee2e2',
                            color: '#ef4444',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: 600,
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                    No evaluations found matching "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Blank Form Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
        }}>
          <div style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: '16px',
            boxShadow: 'var(--shadow-lg)',
            width: '95%',
            maxWidth: '550px',
            maxHeight: '90vh',
            overflowY: 'auto',
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                {modalType} Score & Evaluation
              </h3>
              <button 
                onClick={handleCloseModal}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Modal Body (Blank Form) */}
            <form onSubmit={handleSubmit}>
              <div style={{ padding: '24px' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="studentId">Select Student</label>
                  <select 
                    id="studentId"
                    className="form-control"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    required
                  >
                    <option value="">Select Student...</option>
                    <option value="1">Priya Sharma</option>
                    <option value="2">Rohan Shah</option>
                    <option value="3">Neha Mehta</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="projectId">Allocated Project</label>
                    <select 
                      id="projectId"
                      className="form-control"
                      value={formData.projectId}
                      onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                      required
                    >
                      <option value="">Select Project...</option>
                      <option value="1">Student Project Management</option>
                      <option value="2">E-Commerce Engine</option>
                      <option value="3">IoT Smart Home</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="taskId">Select Task Deliverable</label>
                    <select 
                      id="taskId"
                      className="form-control"
                      value={formData.taskId}
                      onChange={(e) => setFormData({ ...formData, taskId: e.target.value })}
                      required
                    >
                      <option value="">Select Task...</option>
                      <option value="1">Database normalization & setup</option>
                      <option value="2">Setup routing & authentication</option>
                      <option value="3">Responsive layouts & views</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="earnedScore">Marks Awarded</label>
                  <input 
                    type="number" 
                    id="earnedScore"
                    className="form-control" 
                    min="0"
                    placeholder="Enter score awarded"
                    value={formData.earnedScore}
                    onChange={(e) => setFormData({ ...formData, earnedScore: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="facultyRemarks">Faculty Remarks</label>
                  <textarea 
                    id="facultyRemarks"
                    className="form-control" 
                    placeholder="Provide constructive feedback and remarks for the student..."
                    rows="3"
                    value={formData.facultyRemarks}
                    onChange={(e) => setFormData({ ...formData, facultyRemarks: e.target.value })}
                    style={{ resize: 'vertical' }}
                    required
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div style={{
                padding: '16px 24px',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px',
                backgroundColor: '#f8fafc',
                borderBottomLeftRadius: '16px',
                borderBottomRightRadius: '16px',
              }}>
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{
                    padding: '8px 16px',
                    backgroundColor: 'var(--primary)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Save Score
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ScoresRemarks;
