import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { getUsers, getUserTypes, createUser, updateUser, deleteUser } from '../services/api';

const ManageFaculty = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('Add');
  const [selectedFaculty, setSelectedFaculty] = useState(null);
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

  const [faculties, setFaculties] = useState([]);
  const [facultyTypeId, setFacultyTypeId] = useState(2);

  const loadData = async () => {
    try {
      setLoading(true);
      const [usersRes, typesRes] = await Promise.all([
        getUsers(),
        getUserTypes()
      ]);

      const allTypes = Array.isArray(typesRes) ? typesRes : (typesRes?.data || []);
      const facType = allTypes.find(t => (t.userTypeName || t.UserTypeName || '').toLowerCase() === 'faculty');
      const fTypeId = facType ? (facType.userTypeID || facType.UserTypeID) : 2;
      setFacultyTypeId(fTypeId);

      const allUsers = Array.isArray(usersRes) ? usersRes : (usersRes?.data || []);
      const facultyList = allUsers.filter(u => 
        (u.userTypeName || u.UserTypeName || '').toLowerCase() === 'faculty' ||
        (u.userTypeID || u.UserTypeID) === fTypeId
      );
      setFaculties(facultyList);
      setErrorMessage('');
    } catch (err) {
      console.error('Failed to load faculty:', err);
      setErrorMessage(err.message || 'Failed to connect to backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredFaculties = faculties.filter(faculty => {
    const name = faculty.fullName || faculty.FullName || '';
    const email = faculty.email || faculty.Email || '';
    const mobile = faculty.mobileNumber || faculty.MobileNumber || '';
    const code = faculty.userCode || faculty.UserCode || '';
    const q = searchQuery.toLowerCase();
    return name.toLowerCase().includes(q) || email.toLowerCase().includes(q) || mobile.toLowerCase().includes(q) || code.toLowerCase().includes(q);
  });

  const handleOpenModal = (type, faculty = null) => {
    setModalType(type);
    if (faculty) {
      setSelectedFaculty(faculty);
      setFormData({
        fullName: faculty.fullName || faculty.FullName || '',
        email: faculty.email || faculty.Email || '',
        password: faculty.password || faculty.Password || '',
        mobileNumber: faculty.mobileNumber || faculty.MobileNumber || '',
        userCode: faculty.userCode || faculty.UserCode || '',
        isActive: (faculty.isActive !== undefined ? faculty.isActive : true).toString()
      });
    } else {
      setSelectedFaculty(null);
      setFormData({
        fullName: '',
        email: '',
        password: 'password123',
        mobileNumber: '',
        userCode: 'FAC-' + Math.floor(1000 + Math.random() * 9000),
        isActive: 'true'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFaculty(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'Add') {
        const payload = {
          userTypeID: facultyTypeId,
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          password: formData.password || 'password123',
          mobileNumber: formData.mobileNumber.trim(),
          userCode: formData.userCode.trim(),
          profilePicturePath: 'default.png'
        };
        await createUser(payload);
      } else if (modalType === 'Edit' && selectedFaculty) {
        const id = selectedFaculty.userID || selectedFaculty.UserID || selectedFaculty.facultyId;
        const payload = {
          userTypeID: facultyTypeId,
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          password: formData.password || selectedFaculty.password || 'password123',
          mobileNumber: formData.mobileNumber.trim(),
          userCode: formData.userCode.trim(),
          profilePicturePath: selectedFaculty.profilePicturePath || 'default.png',
          isActive: formData.isActive === 'true',
          isDeleted: false
        };
        await updateUser(id, payload);
      }
      handleCloseModal();
      await loadData();
    } catch (err) {
      alert(err.message || 'Error saving faculty record');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this faculty record?')) {
      try {
        await deleteUser(id);
        await loadData();
      } catch (err) {
        alert(err.message || 'Failed to delete faculty member');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="page-title-block" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Manage Faculty</h1>
          <div className="breadcrumbs">
            <Link to="/admin/dashboard" style={{ textDecoration: 'none', color: '#64748b' }}>Home</Link> /{' '}
            <span>Faculty</span>
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
          Add Faculty
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
            placeholder="Search faculty members..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', marginLeft: '10px', width: '100%', fontSize: '0.9rem', color: 'var(--text-main)' }}
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="data-table-container">
        <div className="data-table-header">
          <span className="table-title">Faculty Member Directory</span>
        </div>
        <div className="table-responsive">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>ID</th>
                <th>Faculty Name</th>
                <th>Faculty Code</th>
                <th>Email Address</th>
                <th>Mobile Number</th>
                <th>Status</th>
                <th style={{ width: '150px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                    Loading faculty members from backend...
                  </td>
                </tr>
              ) : filteredFaculties.length > 0 ? (
                filteredFaculties.map((faculty) => {
                  const id = faculty.userID || faculty.UserID || faculty.facultyId;
                  const name = faculty.fullName || faculty.FullName;
                  const email = faculty.email || faculty.Email;
                  const mobile = faculty.mobileNumber || faculty.MobileNumber || '-';
                  const code = faculty.userCode || faculty.UserCode || '-';
                  const active = faculty.isActive !== undefined ? faculty.isActive : true;
                  return (
                    <tr key={id}>
                      <td><span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>#{id}</span></td>
                      <td><span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{name}</span></td>
                      <td><span style={{ fontWeight: 500, color: 'var(--text-muted)' }}>{code}</span></td>
                      <td style={{ color: 'var(--text-muted)' }}>{email}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{mobile}</td>
                      <td>
                        <span className={`badge ${active ? 'completed' : 'rejected'}`}>
                          {active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button 
                            onClick={() => handleOpenModal('Edit', faculty)}
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
                  <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                    No faculty found matching "{searchQuery}"
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
                {modalType} Faculty Member
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
                  <label className="form-label" htmlFor="fullName">Full Name</label>
                  <input 
                    type="text" 
                    id="fullName"
                    className="form-control" 
                    placeholder="Enter faculty's full name"
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
                      placeholder="faculty@darshan.ac.in"
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
                    <label className="form-label" htmlFor="userCode">Faculty Code</label>
                    <input 
                      type="text" 
                      id="userCode"
                      className="form-control" 
                      placeholder="e.g. FAC-1001"
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
                  <label className="form-label" htmlFor="isActive">Faculty Status</label>
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
                  Save Faculty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ManageFaculty;
