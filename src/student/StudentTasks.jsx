import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from './StudentLayout';

const StudentTasks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('Details'); // 'Details', 'Submit'
  const [selectedTask, setSelectedTask] = useState(null);

  // Form/submission state
  const [formData, setFormData] = useState({
    submissionNotes: '',
    statusID: '2' // default to In Progress when modifying
  });

  const [tasks, setTasks] = useState([
    {
      taskID: 1,
      taskTitle: 'Database normalization & model setup',
      taskDescription: 'Design the relational database structure, define models in C#, and configure EF Core relationships with proper migrations.',
      priorityName: 'High',
      priorityCss: 'high',
      dueDate: '2026-07-10',
      submissionDate: '2026-07-09',
      submissionNotes: 'All entities are mapped and foreign keys indexed successfully. Checked migrations on SQL localdb.',
      assignedScore: 10,
      obtainedScore: 10,
      facultyRemarks: 'Database schema is well-designed. Good job on adding foreign key indexes.',
      statusID: 3,
      statusName: 'Completed',
      statusCss: 'completed'
    },
    {
      taskID: 2,
      taskTitle: 'Setup basic routing & login form validation',
      taskDescription: 'Implement front-end routes using React Router, build the login page with responsive CSS, and add client-side email/password checks.',
      priorityName: 'Medium',
      priorityCss: 'medium',
      dueDate: '2026-07-20',
      submissionDate: '2026-07-19',
      submissionNotes: 'Implemented Regex validation for email addresses and minimum password length requirements.',
      assignedScore: 10,
      obtainedScore: 8,
      facultyRemarks: 'Forms are responsive and error messages look highly professional.',
      statusID: 3,
      statusName: 'Completed',
      statusCss: 'completed'
    },
    {
      taskID: 3,
      taskTitle: 'Responsive sidebar & layouts integration',
      taskDescription: 'Build the decoupled sidebar navigation for Admin, Faculty, and Students using flexbox/grid. Support collapsibility.',
      priorityName: 'Low',
      priorityCss: 'low',
      dueDate: '2026-07-25',
      submissionDate: '',
      submissionNotes: '',
      assignedScore: 10,
      obtainedScore: 0,
      facultyRemarks: '',
      statusID: 2,
      statusName: 'In Progress',
      statusCss: 'progress'
    },
    {
      taskID: 4,
      taskTitle: 'Setup Redux state for local cache',
      taskDescription: 'Setup global state, configure local caching policy, and implement action triggers for workspace entities.',
      priorityName: 'Medium',
      priorityCss: 'medium',
      dueDate: '2026-08-05',
      submissionDate: '',
      submissionNotes: '',
      assignedScore: 15,
      obtainedScore: 0,
      facultyRemarks: '',
      statusID: 1,
      statusName: 'Pending',
      statusCss: 'pending'
    }
  ]);

  const filteredTasks = tasks.filter(task =>
    task.taskTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.statusName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.priorityName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (type, task) => {
    setModalType(type);
    setSelectedTask(task);
    if (type === 'Submit') {
      setFormData({
        submissionNotes: task.submissionNotes || '',
        statusID: task.statusID.toString()
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTask) return;

    let statusText = 'Pending';
    let statusCss = 'pending';
    const sId = parseInt(formData.statusID);

    if (sId === 2) {
      statusText = 'In Progress';
      statusCss = 'progress';
    } else if (sId === 3) {
      statusText = 'Completed';
      statusCss = 'completed';
    }

    setTasks(tasks.map(t => {
      if (t.taskID === selectedTask.taskID) {
        return {
          ...t,
          submissionNotes: formData.submissionNotes,
          submissionDate: formData.submissionNotes ? new Date().toISOString().split('T')[0] : t.submissionDate,
          statusID: sId,
          statusName: statusText,
          statusCss: statusCss
        };
      }
      return t;
    }));

    handleCloseModal();
  };

  return (
    <StudentLayout>
      <div className="page-title-block" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>My Deliverables</h1>
          <div className="breadcrumbs">
            <Link to="/student/dashboard" style={{ textDecoration: 'none', color: '#64748b' }}>Home</Link> /{' '}
            <span>Deliverables & Submissions</span>
          </div>
        </div>
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
            placeholder="Search deliverables..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', marginLeft: '10px', width: '100%', fontSize: '0.9rem', color: 'var(--text-main)' }}
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="data-table-container">
        <div className="data-table-header">
          <span className="table-title">Allocated Tasks Registry (SPM_Task)</span>
        </div>
        <div className="table-responsive">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>ID</th>
                <th>Task Details</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Submission Date</th>
                <th>Obtained / Assigned Points</th>
                <th>Status</th>
                <th style={{ width: '200px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr key={task.taskID}>
                    <td><span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>#{task.taskID}</span></td>
                    <td>
                      <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{task.taskTitle}</span>
                    </td>
                    <td>
                      <span className={`badge ${task.priorityCss}`}>
                        {task.priorityName}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{task.dueDate}</td>
                    <td style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{task.submissionDate || '-'}</td>
                    <td>
                      <span style={{ fontWeight: 600 }}>{task.statusID === 3 ? `${task.obtainedScore} / ${task.assignedScore}` : `- / ${task.assignedScore}`} pts</span>
                    </td>
                    <td>
                      <span className={`badge ${task.statusCss}`}>
                        {task.statusName}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button 
                          onClick={() => handleOpenModal('Details', task)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#e0f2fe',
                            color: '#0369a1',
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
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          Details
                        </button>
                        {task.statusID !== 3 && (
                          <button 
                            onClick={() => handleOpenModal('Submit', task)}
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
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                            Submit / Update
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                    No deliverables found matching "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog */}
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
            maxWidth: '540px',
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
                {modalType === 'Details' ? 'Deliverable Details' : 'Submit / Update Work'}
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

            {modalType === 'Details' ? (
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Task ID</span>
                    <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '4px' }}>#{selectedTask?.taskID}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Status & Priority</span>
                    <div style={{ marginTop: '4px', display: 'flex', gap: '6px' }}>
                      <span className={`badge ${selectedTask?.statusCss}`}>
                        {selectedTask?.statusName}
                      </span>
                      <span className={`badge ${selectedTask?.priorityCss}`}>
                        {selectedTask?.priorityName}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Task Title</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>{selectedTask?.taskTitle}</div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Scope Details</span>
                  <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.5', marginTop: '6px' }}>{selectedTask?.taskDescription}</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Due Date</span>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '4px' }}>{selectedTask?.dueDate}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Submission Date</span>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '4px' }}>{selectedTask?.submissionDate || 'Not Submitted'}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Grades / Score</span>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--success)', marginTop: '4px' }}>
                      {selectedTask?.statusID === 3 ? `${selectedTask?.obtainedScore} / ${selectedTask?.assignedScore}` : `- / ${selectedTask?.assignedScore}`} pts
                    </div>
                  </div>
                </div>

                {selectedTask?.submissionNotes && (
                  <div style={{ marginBottom: '20px' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Your Submission Notes</span>
                    <div style={{ 
                      fontSize: '0.92rem', 
                      color: 'var(--text-main)',
                      marginTop: '6px',
                      padding: '10px 14px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      borderLeft: '4px solid var(--primary)'
                    }}>
                      {selectedTask?.submissionNotes}
                    </div>
                  </div>
                )}

                <div style={{ marginBottom: '0px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Faculty Evaluation remarks</span>
                  <div style={{ 
                    fontSize: '0.92rem', 
                    color: selectedTask?.facultyRemarks ? 'var(--text-main)' : 'var(--text-muted)', 
                    fontStyle: selectedTask?.facultyRemarks ? 'normal' : 'italic',
                    marginTop: '6px',
                    padding: '10px 14px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    borderLeft: '4px solid #cbd5e1'
                  }}>
                    {selectedTask?.facultyRemarks || 'No feedback remarks provided by faculty advisor yet.'}
                  </div>
                </div>

                <div style={{
                  marginTop: '28px',
                  borderTop: '1px solid var(--border)',
                  paddingTop: '16px',
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}>
                  <button 
                    onClick={handleCloseModal}
                    className="btn-primary"
                    style={{ width: 'auto', padding: '8px 20px' }}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ padding: '24px' }}>
                  <div style={{ marginBottom: '20px' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Submitting Work For</span>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>{selectedTask?.taskTitle}</div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="statusID">Work Status</label>
                    <select
                      id="statusID"
                      className="form-control"
                      value={formData.statusID}
                      onChange={(e) => setFormData({ ...formData, statusID: e.target.value })}
                      required
                    >
                      <option value="2">In Progress</option>
                      <option value="3">Completed (Ready for Review)</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="submissionNotes">Submission Notes / Deliverable link</label>
                    <textarea 
                      id="submissionNotes"
                      className="form-control" 
                      placeholder="Paste your git repository link, deployment link, or explain the completed details..."
                      rows="4"
                      value={formData.submissionNotes}
                      onChange={(e) => setFormData({ ...formData, submissionNotes: e.target.value })}
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
                    Submit Work
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </StudentLayout>
  );
};

export default StudentTasks;
