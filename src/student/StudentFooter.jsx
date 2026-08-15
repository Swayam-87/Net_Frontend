import React from 'react';

const StudentFooter = () => {
  return (
    <footer className="main-footer" style={{
      padding: '20px 24px',
      borderTop: '1px solid var(--border)',
      textAlign: 'center',
      fontSize: '0.8rem',
      color: 'var(--text-muted)',
      backgroundColor: 'var(--bg-card)'
    }}>
      &copy; {new Date().getFullYear()} Student Portal - Project Tracker. All rights reserved.
    </footer>
  );
};

export default StudentFooter;
