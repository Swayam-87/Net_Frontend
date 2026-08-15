import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FacultyLayout from './FacultyLayout';

const ManageTasks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('Add'); // 'Add', 'Edit', 'Details'
  const [selectedTask, setSelectedTask] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    projectAllocationID: '',
    taskTitle: '',
    taskDescription: '',
    assignedScore: '10',
    obtainedScore: '0',
    dueDate: '',
    submissionDate: '',
    facultyRemarks: '',
    taskStatusID: '',
    taskPriorityID: ''
  });

  const [tasks, setTasks] = useState([
    {
      taskID: 1,
      projectAllocationID: 1,
      projectTitle: 'Student Project Management System',
      studentName: 'Priya Sharma',
      taskTitle: 'Database normalization & model setup',
      taskDescription: 'Design the relational database structure, define models in C#, and configure EF Core relationships with proper migrations.',
      assignedScore: 10,
      obtainedScore: 9,
      dueDate: '2026-07-10',
      submissionDate: '2026-07-09',
      facultyRemarks: 'Database schema is well-designed. Good job on adding foreign key indexes.',
      taskStatusID: 3,
      taskStatusName: 'Completed',
      taskStatusCss: 'completed',
      taskPriorityID: 3,
      taskPriorityName: 'High',
      taskPriorityCss: 'high'
    },
    {
      taskID: 2,
      projectAllocationID: 1,
      projectTitle: 'Student Project Management System',
      studentName: 'Priya Sharma',
      taskTitle: 'Setup basic routing & login form validation',
      taskDescription: 'Implement front-end routes using React Router, build the login page with responsive CSS, and add client-side email/password checks.',
      assignedScore: 10,
      obtainedScore: 10,
      dueDate: '2026-07-20',
      submissionDate: '2026-07-19',
      facultyRemarks: 'Forms are responsive and error messages look highly professional.',
      taskStatusID: 3,
      taskStatusName: 'Completed',
      taskStatusCss: 'completed',
      taskPriorityID: 2,
      taskPriorityName: 'Medium',
      taskPriorityCss: 'medium'
    },
    {
      taskID: 3,
      projectAllocationID: 1,
      projectTitle: 'Student Project Management System',
      studentName: 'Priya Sharma',
      taskTitle: 'Responsive sidebar & layouts integration',
      taskDescription: 'Build the decoupled sidebar navigation for Admin, Faculty, and Students using flexbox/grid. Support collapsibility.',
      assignedScore: 10,
      obtainedScore: 0,
      dueDate: '2026-07-25',
      submissionDate: '',
      facultyRemarks: '',
      taskStatusID: 2,
      taskStatusName: 'In Progress',
      taskStatusCss: 'progress',
      taskPriorityID: 1,
      taskPriorityName: 'Low',
      taskPriorityCss: 'low'
    },
    {
      taskID: 4,
      projectAllocationID: 2,
      projectTitle: 'E-Commerce Engine',
      studentName: 'Rohan Shah',
      taskTitle: 'API Gateway design',
      taskDescription: 'Configure reverse proxy routing, rate limiting, and standard request/response logging middleware.',
      assignedScore: 20,
      obtainedScore: 0,
      dueDate: '2026-08-01',
      submissionDate: '',
      facultyRemarks: '',
      taskStatusID: 1,
      taskStatusName: 'Pending',
      taskStatusCss: 'pending',
      taskPriorityID: 3,
      taskPriorityName: 'High',
      taskPriorityCss: 'high'
    }
  ]);

  const allocationsList = [
    { projectAllocationID: 1, projectTitle: 'Student Project Management System', studentName: 'Priya Sharma' },
    { projectAllocationID: 2, projectTitle: 'E-Commerce Engine', studentName: 'Rohan Shah' },
    { projectAllocationID: 3, projectTitle: 'IoT Smart Home', studentName: 'Neha Mehta' }
  ];

  const statusesList = [
    { statusID: 1, name: 'Pending', css: 'pending' },
    { statusID: 2, name: 'In Progress', css: 'progress' },
    { statusID: 3, name: 'Completed', css: 'completed' },
    { statusID: 4, name: 'Rejected', css: 'rejected' }
  ];

  const prioritiesList = [
    { priorityID: 1, name: 'Low', css: 'low' },
    { priorityID: 2, name: 'Medium', css: 'medium' },
    { priorityID: 3, name: 'High', css: 'high' }
  ];

  const filteredTasks = tasks.filter(task => 
    task.taskTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (type, task = null) => {
    setModalType(type);
    if (task) {
      setSelectedTask(task);
      setFormData({
        projectAllocationID: task.projectAllocationID.toString(),
        taskTitle: task.taskTitle,
        taskDescription: task.taskDescription,
        assignedScore: task.assignedScore.toString(),
        obtainedScore: task.obtainedScore.toString(),
        dueDate: task.dueDate,
        submissionDate: task.submissionDate || '',
        facultyRemarks: task.facultyRemarks || '',
        taskStatusID: task.taskStatusID.toString(),
        taskPriorityID: task.taskPriorityID.toString()
      });
    } else {
      setSelectedTask(null);
      setFormData({
        projectAllocationID: '',
        taskTitle: '',
        taskDescription: '',
        assignedScore: '10',
        obtainedScore: '0',
        dueDate: '',
        submissionDate: '',
        facultyRemarks: '',
        taskStatusID: '1',
        taskPriorityID: '2'
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
    const alloc = allocationsList.find(a => a.projectAllocationID.toString() === formData.projectAllocationID);
    const status = statusesList.find(s => s.statusID.toString() === formData.taskStatusID);
    const priority = prioritiesList.find(p => p.priorityID.toString() === formData.taskPriorityID);

    if (!alloc || !status || !priority) return;

    const data = {
      projectAllocationID: alloc.projectAllocationID,
      projectTitle: alloc.projectTitle,
      studentName: alloc.studentName,
      taskTitle: formData.taskTitle,
      taskDescription: formData.taskDescription,
      assignedScore: parseInt(formData.assignedScore) || 0,
      obtainedScore: parseInt(formData.obtainedScore) || 0,
      dueDate: formData.dueDate,
      submissionDate: formData.submissionDate || null,
      facultyRemarks: formData.facultyRemarks || null,
      taskStatusID: status.statusID,
      taskStatusName: status.name,
      taskStatusCss: status.css,
      taskPriorityID: priority.priorityID,
      taskPriorityName: priority.name,
      taskPriorityCss: priority.css
    };

    if (modalType === 'Add') {
      const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.taskID)) + 1 : 1;
      setTasks([...tasks, { ...data, taskID: newId }]);
    } else if (modalType === 'Edit' && selectedTask) {
      setTasks(tasks.map(t => t.taskID === selectedTask.taskID ? { ...t, ...data } : t));
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(t => t.taskID !== id));
    }
  };

  return (
    <FacultyLayout>
      <div className="page-title-block" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Manage Tasks</h1>
          <div className="breadcrumbs">
            <Link to="/faculty/dashboard" style={{ textDecoration: 'none', color: '#64748b' }}>Home</Link> /{' '}
            <span>Student Tasks Supervision</span>
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
          Add Task
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
            placeholder="Search tasks..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', marginLeft: '10px', width: '100%', fontSize: '0.9rem', color: 'var(--text-main)' }}
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="data-table-container">
        <div className="data-table-header">
          <span className="table-title">Supervised Tasks Registry (SPM_Task)</span>
        </div>
        <div className="table-responsive">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>ID</th>
                <th>Task Details</th>
                <th>Project Context</th>
                <th>Student Name</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Weightage (Score)</th>
                <th>Status</th>
                <th style={{ width: '220px', textAlign: 'center' }}>Actions</th>
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
                      <span style={{ fontWeight: 500, color: 'var(--text-muted)' }}>{task.projectTitle}</span>
                    </td>
                    <td><span style={{ fontWeight: 500 }}>{task.studentName}</span></td>
                    <td>
                      <span className={`badge ${task.taskPriorityCss}`}>
                        {task.taskPriorityName}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{task.dueDate}</td>
                    <td>
                      <span style={{ fontWeight: 600 }}>{task.obtainedScore} / {task.assignedScore} pts</span>
                    </td>
                    <td>
                      <span className={`badge ${task.taskStatusCss}`}>
                        {task.taskStatusName}
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
                          View
                        </button>
                        <button 
                          onClick={() => handleOpenModal('Edit', task)}
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
                          onClick={() => handleDelete(task.taskID)}
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
                  <td colSpan="9" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                    No tasks found matching "{searchQuery}"
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
                {modalType === 'Details' ? 'Task Details' : `${modalType} Project Task`}
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
                      <span className={`badge ${selectedTask?.taskStatusCss}`}>
                        {selectedTask?.taskStatusName}
                      </span>
                      <span className={`badge ${selectedTask?.taskPriorityCss}`}>
                        {selectedTask?.taskPriorityName}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Task Title</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>{selectedTask?.taskTitle}</div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Task Description</span>
                  <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.5', marginTop: '6px' }}>{selectedTask?.taskDescription}</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Allocated Student</span>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '4px' }}>{selectedTask?.studentName}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Project Title</span>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--primary)', marginTop: '4px' }}>{selectedTask?.projectTitle}</div>
                  </div>
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
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--success)', marginTop: '4px' }}>{selectedTask?.obtainedScore} / {selectedTask?.assignedScore} pts</div>
                  </div>
                </div>

                <div style={{ marginBottom: '0px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Faculty Remarks (Evaluation)</span>
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
                    {selectedTask?.facultyRemarks || 'No feedback or evaluation remarks provided yet.'}
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
                    <label className="form-label" htmlFor="projectAllocationID">Project & Student Allocation</label>
                    <select
                      id="projectAllocationID"
                      className="form-control"
                      value={formData.projectAllocationID}
                      onChange={(e) => setFormData({ ...formData, projectAllocationID: e.target.value })}
                      required
                    >
                      <option value="">Select Allocation...</option>
                      {allocationsList.map(a => (
                        <option key={a.projectAllocationID} value={a.projectAllocationID}>
                          {a.studentName} - {a.projectTitle}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="taskTitle">Task Title</label>
                    <input 
                      type="text" 
                      id="taskTitle"
                      className="form-control" 
                      placeholder="Enter task title"
                      value={formData.taskTitle}
                      onChange={(e) => setFormData({ ...formData, taskTitle: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="taskDescription">Task Description</label>
                    <textarea 
                      id="taskDescription"
                      className="form-control" 
                      placeholder="Enter task details and requirements..."
                      rows="3"
                      value={formData.taskDescription}
                      onChange={(e) => setFormData({ ...formData, taskDescription: e.target.value })}
                      style={{ resize: 'vertical' }}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="taskStatusID">Task Status</label>
                      <select
                        id="taskStatusID"
                        className="form-control"
                        value={formData.taskStatusID}
                        onChange={(e) => setFormData({ ...formData, taskStatusID: e.target.value })}
                        required
                      >
                        {statusesList.map(s => (
                          <option key={s.statusID} value={s.statusID}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="taskPriorityID">Task Priority</label>
                      <select
                        id="taskPriorityID"
                        className="form-control"
                        value={formData.taskPriorityID}
                        onChange={(e) => setFormData({ ...formData, taskPriorityID: e.target.value })}
                        required
                      >
                        {prioritiesList.map(p => (
                          <option key={p.priorityID} value={p.priorityID}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="assignedScore">Assigned Weightage (Pts)</label>
                      <input 
                        type="number" 
                        id="assignedScore"
                        className="form-control" 
                        min="1"
                        value={formData.assignedScore}
                        onChange={(e) => setFormData({ ...formData, assignedScore: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="obtainedScore">Obtained Score (Pts)</label>
                      <input 
                        type="number" 
                        id="obtainedScore"
                        className="form-control" 
                        min="0"
                        value={formData.obtainedScore}
                        onChange={(e) => setFormData({ ...formData, obtainedScore: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="dueDate">Due Date</label>
                      <input 
                        type="date" 
                        id="dueDate"
                        className="form-control" 
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="submissionDate">Submission Date</label>
                      <input 
                        type="date" 
                        id="submissionDate"
                        className="form-control" 
                        value={formData.submissionDate}
                        onChange={(e) => setFormData({ ...formData, submissionDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="facultyRemarks">Faculty Remarks</label>
                    <textarea 
                      id="facultyRemarks"
                      className="form-control" 
                      placeholder="Add supervisor evaluation feedback..."
                      rows="2"
                      value={formData.facultyRemarks}
                      onChange={(e) => setFormData({ ...formData, facultyRemarks: e.target.value })}
                      style={{ resize: 'vertical' }}
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
                    Save Task
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

export default ManageTasks;
