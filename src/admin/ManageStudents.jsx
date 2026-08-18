import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { getUsers, getUserTypes, createUser, updateUser, deleteUser, getProjectAllocations } from '../services/api';

const ManageStudents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('Add');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    mobileNumber: '',
    userCode: '',
    isActive: 'true'
  });

  const [students, setStudents] = useState([]);
  const [studentTypeId, setStudentTypeId] = useState(3);
  const [allocations, setAllocations] = useState([]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [usersRes, typesRes, allocRes] = await Promise.all([
        getUsers(),
        getUserTypes(),
        getProjectAllocations()
      ]);

      const allTypes = Array.isArray(typesRes) ? typesRes : (typesRes?.data || []);
      const studType = allTypes.find(t => (t.userTypeName || t.UserTypeName || '').toLowerCase() === 'student');
      const sTypeId = studType ? (studType.userTypeID || studType.UserTypeID) : 3;
      setStudentTypeId(sTypeId);

      const allUsers = Array.isArray(usersRes) ? usersRes : (usersRes?.data || []);
      const studentList = allUsers.filter(u => 
        (u.userTypeName || u.UserTypeName || '').toLowerCase() === 'student' ||
        (u.userTypeID || u.UserTypeID) === sTypeId
      );
      setStudents(studentList);
      setAllocations(Array.isArray(allocRes) ? allocRes : (allocRes?.data || []));
      setErrorMessage('');
    } catch (err) {
      console.error('Failed to load students:', err);
      setErrorMessage(err.message || 'Failed to connect to backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredStudents = students.filter(student => {
    const name = student.fullName || student.FullName || '';
    const email = student.email || student.Email || '';
    const mobile = student.mobileNumber || student.MobileNumber || '';
    const code = student.userCode || student.UserCode || '';
    const q = searchQuery.toLowerCase();
    return name.toLowerCase().includes(q) || email.toLowerCase().includes(q) || mobile.toLowerCase().includes(q) || code.toLowerCase().includes(q);
  });

  const handleOpenModal = (type, student = null) => {
    setModalType(type);
    if (student) {
      setSelectedStudent(student);
      setFormData({
        fullName: student.fullName || student.FullName || '',
        email: student.email || student.Email || '',
        password: student.password || student.Password || '',
        mobileNumber: student.mobileNumber || student.MobileNumber || '',
        userCode: student.userCode || student.UserCode || '',
        isActive: (student.isActive !== undefined ? student.isActive : true).toString()
      });
    } else {
      setSelectedStudent(null);
      setFormData({
        fullName: '',
        email: '',
        password: 'password123',
        mobileNumber: '',
        userCode: 'STU-' + Math.floor(1000 + Math.random() * 9000),
        isActive: 'true'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'Add') {
        const payload = {
          userTypeID: studentTypeId,
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          password: formData.password || 'password123',
          mobileNumber: formData.mobileNumber.trim(),
          userCode: formData.userCode.trim(),
          profilePicturePath: 'default.png'
        };
        await createUser(payload);
      } else if (modalType === 'Edit' && selectedStudent) {
        const id = selectedStudent.userID || selectedStudent.UserID || selectedStudent.studentId;
        const payload = {
          userTypeID: studentTypeId,
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          password: formData.password || selectedStudent.password || 'password123',
          mobileNumber: formData.mobileNumber.trim(),
          userCode: formData.userCode.trim(),
          profilePicturePath: selectedStudent.profilePicturePath || 'default.png',
          isActive: formData.isActive === 'true',
          isDeleted: false
        };
        await updateUser(id, payload);
      }
      handleCloseModal();
      await loadData();
    } catch (err) {
      alert(err.message || 'Error saving student record');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student record?')) {
      try {
        await deleteUser(id);
        await loadData();
      } catch (err) {
        alert(err.message || 'Failed to delete student');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="page-title-block" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Manage Students</h1>
          <div className="breadcrumbs">
            <Link to="/admin/dashboard" style={{ textDecoration: 'none', color: '#64748b' }}>Home</Link> /{' '}
            <span>Students</span>
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
          Add Student
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
            placeholder="Search students..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', marginLeft: '10px', width: '100%', fontSize: '0.9rem', color: 'var(--text-main)' }}
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="data-table-container">
        <div className="data-table-header">
          <span className="table-title">Enrolled Student Profiles</span>
        </div>
        <div className="table-responsive">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>ID</th>
                <th>Student Name</th>
                <th>Enrollment / Code</th>
                <th>Email Address</th>
                <th>Mobile</th>
                <th>Allocated Project</th>
                <th>Status</th>
                <th style={{ width: '150px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                    Loading students from backend...
                  </td>
                </tr>
              ) : filteredStudents.length > 0 ? (
                filteredStudents.map((student) => {
                  const id = student.userID || student.UserID || student.studentId;
                  const name = student.fullName || student.FullName;
                  const code = student.userCode || student.UserCode || '-';
                  const email = student.email || student.Email;
                  const mobile = student.mobileNumber || student.MobileNumber || '-';
                  const active = student.isActive !== undefined ? student.isActive : true;

                  const alloc = allocations.find(a => (a.studentID || a.StudentID) === id);
                  const projectTitle = alloc ? (alloc.projectTitle || alloc.ProjectTitle) : 'Unallocated';

                  return (
                    <tr key={id}>
                      <td><span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>#{id}</span></td>
                      <td><span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{name}</span></td>
                      <td><span style={{ fontWeight: 500, color: 'var(--text-muted)' }}>{code}</span></td>
                      <td style={{ color: 'var(--text-muted)' }}>{email}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{mobile}</td>
                      <td>
                        <span style={{ 
                          fontWeight: 600, 
                          color: projectTitle === 'Unallocated' ? 'var(--text-muted)' : 'var(--text-main)'
                        }}>
                          {projectTitle}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${active ? 'completed' : 'rejected'}`}>
                          {active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button 
                            onClick={() => handleOpenModal('Edit', student)}
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
                  <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                    No students found matching "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
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
                {modalType} Student Profile
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

            {/* Modal Body */}
            <form onSubmit={handleSubmit}>
              <div style={{ padding: '24px' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="fullName">Full Name</label>
                  <input 
                    type="text" 
                    id="fullName"
                    className="form-control" 
                    placeholder="Enter student's full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      className="form-control" 
                      placeholder="student@darshan.ac.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="mobileNumber">Mobile Number</label>
                    <input 
                      type="tel" 
                      id="mobileNumber"
                      className="form-control" 
                      placeholder="e.g. 9876543210"
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="userCode">Student Code / Enrollment</label>
                    <input 
                      type="text" 
                      id="userCode"
                      className="form-control" 
                      placeholder="e.g. STU-1001"
                      value={formData.userCode}
                      onChange={(e) => setFormData({ ...formData, userCode: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="password">Account Password</label>
                    <input 
                      type="password" 
                      id="password"
                      className="form-control" 
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required={modalType === 'Add'}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="isActive">Enrollment Status</label>
                  <select 
                    id="isActive"
                    className="form-control"
                    value={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value })}
                    required
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
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
                  Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ManageStudents;
