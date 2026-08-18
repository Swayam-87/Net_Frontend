import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { getUserTypes, createUserType, updateUserType, deleteUserType } from '../services/api';

const ManageUserTypes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('Add'); // 'Add', 'Edit', 'Details'
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    userTypeName: '',
    description: ''
  });

  const [userTypes, setUserTypes] = useState([]);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getUserTypes();
      setUserTypes(Array.isArray(res) ? res : (res?.data || []));
      setErrorMessage('');
    } catch (err) {
      console.error('Failed to load user types:', err);
      setErrorMessage(err.message || 'Failed to connect to backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredUserTypes = userTypes.filter(ut => {
    const name = ut.userTypeName || ut.UserTypeName || '';
    const desc = ut.description || ut.Description || '';
    const q = searchQuery.toLowerCase();
    return name.toLowerCase().includes(q) || desc.toLowerCase().includes(q);
  });

  const handleOpenModal = (type, ut = null) => {
    setModalType(type);
    if (ut) {
      setSelectedUserType(ut);
      setFormData({
        userTypeName: ut.userTypeName || ut.UserTypeName || '',
        description: ut.description || ut.Description || ''
      });
    } else {
      setSelectedUserType(null);
      setFormData({
        userTypeName: '',
        description: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserType(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'Add') {
        await createUserType({
          userTypeName: formData.userTypeName,
          description: formData.description
        });
      } else if (modalType === 'Edit' && selectedUserType) {
        const id = selectedUserType.userTypeID || selectedUserType.userTypeId || selectedUserType.UserTypeID;
        await updateUserType(id, {
          userTypeName: formData.userTypeName,
          description: formData.description
        });
      }
      handleCloseModal();
      await loadData();
    } catch (err) {
      alert(err.message || 'Error saving user type');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user type?')) {
      try {
        await deleteUserType(id);
        await loadData();
      } catch (err) {
        alert(err.message || 'Failed to delete user type');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="page-title-block" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Manage User Types</h1>
          <div className="breadcrumbs">
            <Link to="/admin/dashboard" style={{ textDecoration: 'none', color: '#64748b' }}>Home</Link> /{' '}
            <span>User Types</span>
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
          Add User Type
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
            placeholder="Search user types..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', marginLeft: '10px', width: '100%', fontSize: '0.9rem', color: 'var(--text-main)' }}
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="data-table-container">
        <div className="data-table-header">
          <span className="table-title">System User Types (SPM_UserType)</span>
        </div>
        <div className="table-responsive">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th style={{ width: '100px' }}>Type ID</th>
                <th style={{ width: '200px' }}>User Type Name</th>
                <th>Description</th>
                <th style={{ width: '220px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                    Loading user types from backend...
                  </td>
                </tr>
              ) : filteredUserTypes.length > 0 ? (
                filteredUserTypes.map((ut) => {
                  const id = ut.userTypeID || ut.userTypeId || ut.UserTypeID;
                  const name = ut.userTypeName || ut.UserTypeName;
                  const desc = ut.description || ut.Description || '-';
                  return (
                    <tr key={id}>
                      <td><span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>#{id}</span></td>
                      <td>
                        <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{name}</span>
                      </td>
                      <td style={{ color: 'var(--text-muted)', lineHeight: '1.4' }}>{desc}</td>
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button 
                            onClick={() => handleOpenModal('Details', ut)}
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
                            onClick={() => handleOpenModal('Edit', ut)}
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
                  <td colSpan="4" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                    No user types found matching "{searchQuery}"
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
            maxWidth: '500px',
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
                {modalType === 'Details' ? 'User Type Details' : `${modalType} User Type`}
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
                <div style={{ marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>User Type ID</span>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '4px' }}>#{selectedUserType?.userTypeId}</div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>User Type Name</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', marginTop: '4px' }}>{selectedUserType?.userTypeName}</div>
                </div>
                <div style={{ marginBottom: '0px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Description</span>
                  <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.5', marginTop: '6px' }}>{selectedUserType?.description}</div>
                </div>
                <div style={{
                  marginTop: '24px',
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
                    <label className="form-label" htmlFor="userTypeName">User Type Name</label>
                    <input 
                      type="text" 
                      id="userTypeName"
                      className="form-control" 
                      placeholder="Enter user type name (e.g. Guest)"
                      value={formData.userTypeName}
                      onChange={(e) => setFormData({ ...formData, userTypeName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="description">Description</label>
                    <textarea 
                      id="description"
                      className="form-control" 
                      placeholder="Enter a brief description of this user type..."
                      rows="4"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                    Save User Type
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

export default ManageUserTypes;
