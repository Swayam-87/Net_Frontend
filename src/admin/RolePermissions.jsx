import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';

const RolePermissions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('Add');

  // Blank form state
  const [formData, setFormData] = useState({
    userId: '',
    roleId: '',
    canRead: false,
    canWrite: false,
    canDelete: false,
    specialAccess: false
  });

  const mappings = [
    {
      mappingId: 1,
      userName: 'Aarav Patel',
      email: 'aarav.patel@darshan.ac.in',
      roleName: 'Admin',
      permissions: 'Full Control (Read, Write, Delete, Settings)'
    },
    {
      mappingId: 2,
      userName: 'Prof. Madhuresh Fichadiya',
      email: 'madhuresh.fichadiya@darshan.ac.in',
      roleName: 'Faculty',
      permissions: 'Academic Control (Read, Write, Manage Tasks & Evaluations)'
    },
    {
      mappingId: 3,
      userName: 'Priya Sharma',
      email: 'priya.sharma@darshan.ac.in',
      roleName: 'Student',
      permissions: 'Limited Access (Read Tasks, Submit Deliverables)'
    },
    {
      mappingId: 4,
      userName: 'Rohan Shah',
      email: 'rohan.shah@darshan.ac.in',
      roleName: 'Student',
      permissions: 'Limited Access (Read Tasks, Submit Deliverables)'
    },
    {
      mappingId: 5,
      userName: 'Dr. Amit Vora',
      email: 'amit.vora@darshan.ac.in',
      roleName: 'Faculty',
      permissions: 'Academic Control (Read, Write, Manage Tasks & Evaluations)'
    }
  ];

  const filteredMappings = mappings.filter(mapping => 
    mapping.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mapping.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mapping.roleName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (type) => {
    setModalType(type);
    setFormData({
      userId: '',
      roleId: '',
      canRead: false,
      canWrite: false,
      canDelete: false,
      specialAccess: false
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
          <h1>User Role Assignments</h1>
          <div className="breadcrumbs">
            <Link to="/admin/dashboard" style={{ textDecoration: 'none', color: '#64748b' }}>Home</Link> /{' '}
            <span>Role & Permissions</span>
          </div>
        </div>
        <button 
          className="btn-primary" 
          style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}
          onClick={() => handleOpenModal('Assign')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Assign User Role
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
            placeholder="Search role mapping..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', marginLeft: '10px', width: '100%', fontSize: '0.9rem', color: 'var(--text-main)' }}
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="data-table-container">
        <div className="data-table-header">
          <span className="table-title">User-Role Access Control Matrix</span>
        </div>
        <div className="table-responsive">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>ID</th>
                <th>User Full Name</th>
                <th>Email Address</th>
                <th>Assigned Role</th>
                <th>Scope / Permissions</th>
                <th style={{ width: '150px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMappings.length > 0 ? (
                filteredMappings.map((mapping) => (
                  <tr key={mapping.mappingId}>
                    <td><span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>#{mapping.mappingId}</span></td>
                    <td><span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{mapping.userName}</span></td>
                    <td style={{ color: 'var(--text-muted)' }}>{mapping.email}</td>
                    <td>
                      <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                        {mapping.roleName}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{mapping.permissions}</td>
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
                  <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                    No mapping found matching "{searchQuery}"
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
            maxWidth: '520px',
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
                {modalType} User Role Assignment
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
                  <label className="form-label" htmlFor="userId">Select User Account</label>
                  <select 
                    id="userId"
                    className="form-control"
                    value={formData.userId}
                    onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                    required
                  >
                    <option value="">Select a system user...</option>
                    <option value="1">Aarav Patel (aarav.patel@darshan.ac.in)</option>
                    <option value="2">Prof. Madhuresh Fichadiya (madhuresh.fichadiya@darshan.ac.in)</option>
                    <option value="3">Priya Sharma (priya.sharma@darshan.ac.in)</option>
                    <option value="4">Rohan Shah (rohan.shah@darshan.ac.in)</option>
                    <option value="5">Dr. Amit Vora (amit.vora@darshan.ac.in)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="roleId">Assigned Role Profile</label>
                  <select 
                    id="roleId"
                    className="form-control"
                    value={formData.roleId}
                    onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
                    required
                  >
                    <option value="">Select a system role...</option>
                    <option value="1">Admin</option>
                    <option value="2">Faculty</option>
                    <option value="3">Student</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Granular Action Permissions</label>
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '12px', 
                    padding: '16px', 
                    backgroundColor: '#f8fafc', 
                    borderRadius: '8px',
                    border: '1px solid var(--border)' 
                  }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={formData.canRead} 
                        onChange={(e) => setFormData({ ...formData, canRead: e.target.checked })}
                        style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                      />
                      <span><strong>Read access:</strong> View records and basic profile reports</span>
                    </label>
                    
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={formData.canWrite} 
                        onChange={(e) => setFormData({ ...formData, canWrite: e.target.checked })}
                        style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                      />
                      <span><strong>Write access:</strong> Edit profiles, update project/task status</span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={formData.canDelete} 
                        onChange={(e) => setFormData({ ...formData, canDelete: e.target.checked })}
                        style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                      />
                      <span><strong>Delete access:</strong> Perform soft-deletions on data records</span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={formData.specialAccess} 
                        onChange={(e) => setFormData({ ...formData, specialAccess: e.target.checked })}
                        style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                      />
                      <span><strong>System configuration:</strong> Modify database settings & logs</span>
                    </label>
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
                  Save Mapping
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default RolePermissions;
