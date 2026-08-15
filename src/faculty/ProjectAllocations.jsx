import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FacultyLayout from './FacultyLayout';

const ProjectAllocations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('Add'); // 'Add', 'Edit', 'Details'
  const [selectedAllocation, setSelectedAllocation] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    projectID: '',
    studentID: '',
    assignedDate: '',
    projectStartDate: '',
    projectEndDate: '',
    totalTasksGiven: '0',
    totalCompletedTasks: '0',
    completionPercentage: '0',
    overAllGrade: ''
  });

  const [allocations, setAllocations] = useState([
    {
      projectAllocationID: 1,
      projectID: 1,
      projectTitle: 'Student Project Management System',
      studentID: 3,
      studentName: 'Priya Sharma',
      facultyID: 2,
      facultyName: 'Prof. Madhuresh Fichadiya',
      assignedDate: '2026-06-22',
      projectStartDate: '2026-06-22',
      projectEndDate: '2026-09-15',
      totalTasksGiven: 3,
      totalCompletedTasks: 2,
      completionPercentage: 66,
      overAllGrade: 'A+'
    },
    {
      projectAllocationID: 2,
      projectID: 2,
      projectTitle: 'E-Commerce Engine',
      studentID: 4,
      studentName: 'Rohan Shah',
      facultyID: 5,
      facultyName: 'Dr. Amit Vora',
      assignedDate: '2026-06-25',
      projectStartDate: '2026-06-25',
      projectEndDate: '2026-09-20',
      totalTasksGiven: 1,
      totalCompletedTasks: 1,
      completionPercentage: 100,
      overAllGrade: 'A'
    },
    {
      projectAllocationID: 3,
      projectID: 3,
      projectTitle: 'IoT Smart Home',
      studentID: 6,
      studentName: 'Neha Mehta',
      facultyID: 2,
      facultyName: 'Prof. Madhuresh Fichadiya',
      assignedDate: '2026-05-10',
      projectStartDate: '2026-05-10',
      projectEndDate: '2026-08-30',
      totalTasksGiven: 0,
      totalCompletedTasks: 0,
      completionPercentage: 0,
      overAllGrade: 'B'
    }
  ]);

  const projectsMaster = [
    { projectID: 1, projectTitle: 'Student Project Management System' },
    { projectID: 2, projectTitle: 'E-Commerce Engine' },
    { projectID: 3, projectTitle: 'IoT Smart Home' }
  ];

  const studentsList = [
    { userID: 3, fullName: 'Priya Sharma' },
    { userID: 4, fullName: 'Rohan Shah' },
    { userID: 6, fullName: 'Neha Mehta' }
  ];

  const filteredAllocations = allocations.filter(alloc => 
    alloc.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alloc.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (type, alloc = null) => {
    setModalType(type);
    if (alloc) {
      setSelectedAllocation(alloc);
      setFormData({
        projectID: alloc.projectID.toString(),
        studentID: alloc.studentID.toString(),
        assignedDate: alloc.assignedDate,
        projectStartDate: alloc.projectStartDate,
        projectEndDate: alloc.projectEndDate,
        totalTasksGiven: alloc.totalTasksGiven.toString(),
        totalCompletedTasks: alloc.totalCompletedTasks.toString(),
        completionPercentage: alloc.completionPercentage.toString(),
        overAllGrade: alloc.overAllGrade || ''
      });
    } else {
      setSelectedAllocation(null);
      setFormData({
        projectID: '',
        studentID: '',
        assignedDate: new Date().toISOString().split('T')[0],
        projectStartDate: new Date().toISOString().split('T')[0],
        projectEndDate: '',
        totalTasksGiven: '0',
        totalCompletedTasks: '0',
        completionPercentage: '0',
        overAllGrade: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAllocation(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const project = projectsMaster.find(p => p.projectID.toString() === formData.projectID);
    const student = studentsList.find(s => s.userID.toString() === formData.studentID);

    if (!project || !student) return;

    const data = {
      projectID: project.projectID,
      projectTitle: project.projectTitle,
      studentID: student.userID,
      studentName: student.fullName,
      facultyID: 2, // Hardcoded current faculty (e.g. Prof. Madhuresh Fichadiya)
      facultyName: 'Prof. Madhuresh Fichadiya',
      assignedDate: formData.assignedDate,
      projectStartDate: formData.projectStartDate,
      projectEndDate: formData.projectEndDate,
      totalTasksGiven: parseInt(formData.totalTasksGiven) || 0,
      totalCompletedTasks: parseInt(formData.totalCompletedTasks) || 0,
      completionPercentage: parseInt(formData.completionPercentage) || 0,
      overAllGrade: formData.overAllGrade
    };

    if (modalType === 'Add') {
      const newId = allocations.length > 0 ? Math.max(...allocations.map(a => a.projectAllocationID)) + 1 : 1;
      setAllocations([...allocations, { ...data, projectAllocationID: newId }]);
    } else if (modalType === 'Edit' && selectedAllocation) {
      setAllocations(allocations.map(a => a.projectAllocationID === selectedAllocation.projectAllocationID ? { ...a, ...data } : a));
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project allocation?')) {
      setAllocations(allocations.filter(a => a.projectAllocationID !== id));
    }
  };

  return (
    <FacultyLayout>
      <div className="page-title-block" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Project Allocations</h1>
          <div className="breadcrumbs">
            <Link to="/faculty/dashboard" style={{ textDecoration: 'none', color: '#64748b' }}>Home</Link> /{' '}
            <span>Project Allocations Manager</span>
          </div>
        </div>
        <button 
          className="btn-primary" 
          style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}
          onClick={() => handleOpenModal('Add')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Allocate Project
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
            placeholder="Search allocations..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', marginLeft: '10px', width: '100%', fontSize: '0.9rem', color: 'var(--text-main)' }}
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="data-table-container">
        <div className="data-table-header">
          <span className="table-title">Project Allocation Registry (SPM_ProjectAllocation)</span>
        </div>
        <div className="table-responsive">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>ID</th>
                <th>Project Context</th>
                <th>Student</th>
                <th>Supervisor Faculty</th>
                <th>Progress</th>
                <th>Timeline</th>
                <th>Grade</th>
                <th style={{ width: '220px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAllocations.length > 0 ? (
                filteredAllocations.map((alloc) => (
                  <tr key={alloc.projectAllocationID}>
                    <td><span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>#{alloc.projectAllocationID}</span></td>
                    <td>
                      <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{alloc.projectTitle}</span>
                    </td>
                    <td><span style={{ fontWeight: 500 }}>{alloc.studentName}</span></td>
                    <td style={{ color: 'var(--text-muted)' }}>{alloc.facultyName}</td>
                    <td>
                      <div className="progress-bar-wrap">
                        <div className="progress-bar-track">
                          <div className="progress-bar-fill" style={{ width: `${alloc.completionPercentage}%` }}></div>
                        </div>
                        <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>{alloc.completionPercentage}%</span>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                      <div>Start: {alloc.projectStartDate}</div>
                      <div>End: {alloc.projectEndDate}</div>
                    </td>
                    <td>
                      <span className="badge progress" style={{ backgroundColor: '#f1f5f9', color: '#0f172a', border: '1px solid var(--border)' }}>
                        {alloc.overAllGrade || 'N/A'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button 
                          onClick={() => handleOpenModal('Details', alloc)}
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
                          View
                        </button>
                        <button 
                          onClick={() => handleOpenModal('Edit', alloc)}
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
                          onClick={() => handleDelete(alloc.projectAllocationID)}
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
                  <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                    No allocations found matching "{searchQuery}"
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
            maxWidth: '560px',
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
                {modalType === 'Details' ? 'Allocation Details' : `${modalType} Project Allocation`}
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
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Allocation ID</span>
                    <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '4px' }}>#{selectedAllocation?.projectAllocationID}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Overall Grade</span>
                    <div style={{ marginTop: '4px' }}>
                      <span className="badge progress" style={{ backgroundColor: '#f1f5f9', color: '#0f172a', border: '1px solid var(--border)', fontSize: '0.8rem', padding: '4px 10px' }}>
                        {selectedAllocation?.overAllGrade || 'No Grade Assigned'}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Project Title</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', marginTop: '4px' }}>{selectedAllocation?.projectTitle}</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Allocated Student</span>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '4px' }}>{selectedAllocation?.studentName}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Faculty Supervisor</span>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '4px' }}>{selectedAllocation?.facultyName}</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Allocation Date</span>
                    <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: '4px' }}>{selectedAllocation?.assignedDate}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Project Timeline</span>
                    <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: '4px' }}>{selectedAllocation?.projectStartDate} to {selectedAllocation?.projectEndDate}</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '0px' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tasks Given</span>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>{selectedAllocation?.totalTasksGiven}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tasks Completed</span>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--success)', marginTop: '4px' }}>{selectedAllocation?.totalCompletedTasks}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Progress</span>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)', marginTop: '4px' }}>{selectedAllocation?.completionPercentage}%</div>
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
                  <div className="form-group">
                    <label className="form-label" htmlFor="projectID">Target Project Definition</label>
                    <select
                      id="projectID"
                      className="form-control"
                      value={formData.projectID}
                      onChange={(e) => setFormData({ ...formData, projectID: e.target.value })}
                      required
                    >
                      <option value="">Select Project Topic...</option>
                      {projectsMaster.map(p => (
                        <option key={p.projectID} value={p.projectID}>{p.projectTitle}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="studentID">Select Student</label>
                    <select
                      id="studentID"
                      className="form-control"
                      value={formData.studentID}
                      onChange={(e) => setFormData({ ...formData, studentID: e.target.value })}
                      required
                    >
                      <option value="">Select Student...</option>
                      {studentsList.map(s => (
                        <option key={s.userID} value={s.userID}>{s.fullName}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="assignedDate">Assigned Date</label>
                      <input 
                        type="date"
                        id="assignedDate"
                        className="form-control"
                        value={formData.assignedDate}
                        onChange={(e) => setFormData({ ...formData, assignedDate: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="projectStartDate">Timeline Start Date</label>
                      <input 
                        type="date"
                        id="projectStartDate"
                        className="form-control"
                        value={formData.projectStartDate}
                        onChange={(e) => setFormData({ ...formData, projectStartDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="projectEndDate">Timeline End Date</label>
                      <input 
                        type="date"
                        id="projectEndDate"
                        className="form-control"
                        value={formData.projectEndDate}
                        onChange={(e) => setFormData({ ...formData, projectEndDate: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="overAllGrade">Overall Grade</label>
                      <select
                        id="overAllGrade"
                        className="form-control"
                        value={formData.overAllGrade}
                        onChange={(e) => setFormData({ ...formData, overAllGrade: e.target.value })}
                      >
                        <option value="">Not Graded</option>
                        <option value="A+">A+</option>
                        <option value="A">A</option>
                        <option value="B+">B+</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="F">F</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row" style={{ marginBottom: 0 }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" htmlFor="totalTasksGiven">Tasks Given</label>
                      <input 
                        type="number"
                        id="totalTasksGiven"
                        className="form-control"
                        min="0"
                        value={formData.totalTasksGiven}
                        onChange={(e) => setFormData({ ...formData, totalTasksGiven: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" htmlFor="totalCompletedTasks">Tasks Completed</label>
                      <input 
                        type="number"
                        id="totalCompletedTasks"
                        className="form-control"
                        min="0"
                        value={formData.totalCompletedTasks}
                        onChange={(e) => setFormData({ ...formData, totalCompletedTasks: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" htmlFor="completionPercentage">Progress (%)</label>
                      <input 
                        type="number"
                        id="completionPercentage"
                        className="form-control"
                        min="0"
                        max="100"
                        value={formData.completionPercentage}
                        onChange={(e) => setFormData({ ...formData, completionPercentage: e.target.value })}
                        required
                      />
                    </div>
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
                    Save Allocation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </FacultyLayout>
  );
};

export default ProjectAllocations;
