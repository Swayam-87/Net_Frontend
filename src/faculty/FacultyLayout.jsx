import React, { useState } from 'react';
import FacultySidebar from './FacultySidebar';
import FacultyNavbar from './FacultyNavbar';
import FacultyFooter from './FacultyFooter';

const FacultyLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="layout-container">
      <FacultySidebar collapsed={collapsed} />
      <div className="main-view" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <FacultyNavbar onToggleSidebar={() => setCollapsed(!collapsed)} />
        <div className="content-body" style={{ flex: 1 }}>
          {children}
        </div>
        <FacultyFooter />
      </div>
    </div>
  );
};

export default FacultyLayout;
