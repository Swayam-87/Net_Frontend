import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import {
  getTasks,
  getProjectAllocations,
  getTaskStatuses,
  getTaskPriorities,
  createTask,
  updateTask,
  deleteTask
} from '../services/api';

const ManageTasks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('Add'); // 'Add', 'Edit', 'Details'
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

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

  const [tasks, setTasks] = useState([]);
  const [allocationsList, setAllocationsList] = useState([]);
  const [statusesList, setStatusesList] = useState([]);
  const [prioritiesList, setPrioritiesList] = useState([]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [tasksRes, allocRes, statusRes, priorityRes] = await Promise.all([
        getTasks(),
        getProjectAllocations(),
        getTaskStatuses(),
        getTaskPriorities()
      ]);

      setTasks(Array.isArray(tasksRes) ? tasksRes : (tasksRes?.data || []));
      setAllocationsList(Array.isArray(allocRes) ? allocRes : (allocRes?.data || []));
      setStatusesList(Array.isArray(statusRes) ? statusRes : (statusRes?.data || []));
      setPrioritiesList(Array.isArray(priorityRes) ? priorityRes : (priorityRes?.data || []));
      setErrorMessage('');
    } catch (err) {
      console.error('Failed to load tasks:', err);
      setErrorMessage(err.message || 'Failed to connect to backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredTasks = tasks.filter(task => {
    const title = task.taskTitle || task.TaskTitle || '';
    const project = task.projectTitle || task.ProjectTitle || '';
    const student = task.studentName || task.StudentName || '';
    const q = searchQuery.toLowerCase();
    return title.toLowerCase().includes(q) || project.toLowerCase().includes(q) || student.toLowerCase().includes(q);
  });

  const handleOpenModal = (type, task = null) => {
    setModalType(type);
    if (task) {
      setSelectedTask(task);
      setFormData({
        projectAllocationID: (task.projectAllocationID || task.ProjectAllocationID || '').toString(),
        taskTitle: task.taskTitle || task.TaskTitle || '',
        taskDescription: task.taskDescription || task.TaskDescription || '',
        assignedScore: (task.assignedScore || task.AssignedScore || 10).toString(),
        obtainedScore: (task.earnedScore || task.EarnedScore || task.obtainedScore || 0).toString(),
        dueDate: (task.taskDueDate || task.TaskDueDate || task.dueDate) ? (task.taskDueDate || task.TaskDueDate || task.dueDate).substring(0, 10) : '',
        submissionDate: (task.taskCompletedDate || task.TaskCompletedDate || task.submissionDate) ? (task.taskCompletedDate || task.TaskCompletedDate || task.submissionDate).substring(0, 10) : '',
        facultyRemarks: task.facultyRemarks || task.FacultyRemarks || '',
        taskStatusID: (task.taskStatusID || task.TaskStatusID || '').toString(),
        taskPriorityID: (task.taskPriorityID || task.TaskPriorityID || '').toString()
      });
    } else {
      setSelectedTask(null);
      setFormData({
        projectAllocationID: allocationsList.length > 0 ? (allocationsList[0].projectAllocationID || allocationsList[0].ProjectAllocationID).toString() : '',
        taskTitle: '',
        taskDescription: '',
        assignedScore: '10',
        obtainedScore: '0',
        dueDate: new Date(Date.now() + 7 * 86400000).toISOString().substring(0, 10),
        submissionDate: '',
        facultyRemarks: '',
        taskStatusID: statusesList.length > 0 ? (statusesList[0].taskStatusID || statusesList[0].TaskStatusID || statusesList[0].statusID).toString() : '1',
        taskPriorityID: prioritiesList.length > 0 ? (prioritiesList[0].taskPriorityID || prioritiesList[0].TaskPriorityID || prioritiesList[0].priorityID).toString() : '1'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'Add') {
        const payload = {
          projectAllocationID: parseInt(formData.projectAllocationID),
          taskTitle: formData.taskTitle.trim(),
          taskDescription: formData.taskDescription.trim(),
          taskStatusID: parseInt(formData.taskStatusID),
          taskPriorityID: parseInt(formData.taskPriorityID),
          assignedScore: parseFloat(formData.assignedScore) || 10,
          taskAssignedDate: new Date().toISOString(),
          taskDueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
        };
        await createTask(payload);
      } else if (modalType === 'Edit' && selectedTask) {
        const id = selectedTask.taskID || selectedTask.TaskID;
        const payload = {
          projectAllocationID: parseInt(formData.projectAllocationID),
          taskTitle: formData.taskTitle.trim(),
          taskDescription: formData.taskDescription.trim(),
          taskStatusID: parseInt(formData.taskStatusID),
          taskPriorityID: parseInt(formData.taskPriorityID),
          assignedScore: parseFloat(formData.assignedScore) || 10,
          earnedScore: parseFloat(formData.obtainedScore) || 0,
          progressPercentage: parseFloat(formData.obtainedScore) && parseFloat(formData.assignedScore) ? Math.min(100, Math.round((parseFloat(formData.obtainedScore) / parseFloat(formData.assignedScore)) * 100)) : 0,
          taskAssignedDate: selectedTask.taskAssignedDate || new Date().toISOString(),
          taskDueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
          taskCompletedDate: formData.submissionDate ? new Date(formData.submissionDate).toISOString() : null,
          facultyRemarks: formData.facultyRemarks || null
        };
        await updateTask(id, payload);
      }
      handleCloseModal();
      await loadData();
    } catch (err) {
      alert(err.message || 'Error saving task');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        await loadData();
      } catch (err) {
        alert(err.message || 'Failed to delete task');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="page-title-block" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Manage Tasks</h1>
          <div className="breadcrumbs">
            <Link to="/admin/dashboard" style={{ textDecoration: 'none', color: '#64748b' }}>Home</Link> /{' '}
            <span>System Tasks Master</span>
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

      {/* Error message banner */}
      {errorMessage && (
        <div style={{ backgroundColor: '#fee2e2', border: '1px solid #fca5a5', color: '#b91c1c', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px' }}>
          <strong>Error connecting to backend:</strong> {errorMessage}
        </div>
      )}

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
          <span className="table-title">Project Deliverables & Tasks (SPM_Task)</span>
        </div>
        <div className="table-responsive">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>ID</th>
                <th>Task Details</th>
                <th>Project Context</th>
                <th>Student</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Weightage (Score)</th>
                <th>Status</th>
                <th style={{ width: '220px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                    Loading tasks from backend...
                  </td>
                </tr>
              ) : filteredTasks.length > 0 ? (
                filteredTasks.map((task) => {
                  const id = task.taskID || task.TaskID;
                  const title = task.taskTitle || task.TaskTitle;
                  const project = task.projectTitle || task.ProjectTitle || '-';
                  const student = task.studentName || task.StudentName || '-';
                  const priorityName = task.taskPriorityName || task.TaskPriorityName || 'Medium';
                  const priorityCss = priorityName.toLowerCase().replace(/\s+/g, '-');
                  const dueDate = (task.taskDueDate || task.TaskDueDate || task.dueDate) ? (task.taskDueDate || task.TaskDueDate || task.dueDate).substring(0, 10) : '-';
                  const assignedScore = task.assignedScore || task.AssignedScore || 0;
                  const earnedScore = task.earnedScore !== undefined && task.earnedScore !== null ? task.earnedScore : (task.EarnedScore !== undefined ? task.EarnedScore : (task.obtainedScore || 0));
                  const statusName = task.taskStatusName || task.TaskStatusName || 'Pending';
                  const statusCss = statusName.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <tr key={id}>
                      <td><span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>#{id}</span></td>
                      <td>
                        <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{title}</span>
                      </td>
                      <td>
                        <span style={{ fontWeight: 500, color: 'var(--text-muted)' }}>{project}</span>
                      </td>
                      <td><span style={{ fontWeight: 500 }}>{student}</span></td>
                      <td>
                        <span className={`badge ${priorityCss}`}>
                          {priorityName}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{dueDate}</td>
                      <td>
                        <span style={{ fontWeight: 600 }}>{earnedScore} / {assignedScore} pts</span>
                      </td>
                      <td>
                        <span className={`badge ${statusCss}`}>
                          {statusName}
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
                            onClick={() => handleDelete(id)}
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
                  );
                })
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
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Faculty Supervisor Remarks</span>
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
                      {allocationsList.map(a => {
                        const aId = a.projectAllocationID || a.ProjectAllocationID;
                        const sName = a.studentName || a.StudentName || 'Student';
                        const pTitle = a.projectTitle || a.ProjectTitle || 'Project';
                        return (
                          <option key={aId} value={aId}>
                            {sName} - {pTitle}
                          </option>
                        );
                      })}
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
                        {statusesList.map(s => {
                          const sId = s.taskStatusID || s.statusID || s.TaskStatusID;
                          const sName = s.taskStatusName || s.name || s.TaskStatusName;
                          return (
                            <option key={sId} value={sId}>{sName}</option>
                          );
                        })}
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
                        {prioritiesList.map(p => {
                          const pId = p.taskPriorityID || p.priorityID || p.TaskPriorityID;
                          const pName = p.taskPriorityName || p.name || p.TaskPriorityName;
                          return (
                            <option key={pId} value={pId}>{pName}</option>
                          );
                        })}
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
    </AdminLayout>
  );
};

export default ManageTasks;
