import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import AdminFooter from './AdminFooter';

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="layout-container">
      <AdminSidebar collapsed={collapsed} />
      <div className="main-view" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AdminNavbar onToggleSidebar={() => setCollapsed(!collapsed)} />
        <div className="content-body" style={{ flex: 1 }}>
          {children}
        </div>
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminLayout;
