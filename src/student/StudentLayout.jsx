import React, { useState } from 'react';
import StudentSidebar from './StudentSidebar';
import StudentNavbar from './StudentNavbar';
import StudentFooter from './StudentFooter';

const StudentLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="layout-container">
      <StudentSidebar collapsed={collapsed} />
      <div className="main-view" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <StudentNavbar onToggleSidebar={() => setCollapsed(!collapsed)} />
        <div className="content-body" style={{ flex: 1 }}>
          {children}
        </div>
        <StudentFooter />
      </div>
    </div>
  );
};

export default StudentLayout;
