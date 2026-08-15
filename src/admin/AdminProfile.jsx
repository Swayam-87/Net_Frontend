import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';

const AdminProfile = () => {
  return (
    <AdminLayout>
      <div className="page-title-block">
        <h1>Admin Profile</h1>
        <div className="breadcrumbs">
          <Link to="/admin/dashboard" style={{ textDecoration: 'none', color: '#64748b' }}>Home</Link> / <span>Profile</span>
        </div>
      </div>

      <div className="card">
        <h3>Admin Information</h3>
        <hr style={{ margin: '15px 0', border: 'none', borderBottom: '1px solid #ddd' }} />
        <div>
          <p style={{ margin: '8px 0' }}><strong>Full Name:</strong> Admin</p>
          <p style={{ margin: '8px 0' }}><strong>Email Address:</strong> Admin123@gmail.com</p>
          <p style={{ margin: '8px 0' }}><strong>Role Access level:</strong> Administrator </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
