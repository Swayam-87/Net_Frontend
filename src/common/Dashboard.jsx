import React from 'react';
import StudentDashboard from '../student/StudentDashboard';
import FacultyDashboard from '../faculty/FacultyDashboard';
import AdminDashboard from '../admin/AdminDashboard';

const Dashboard = () => {
  const role = 'student';

  switch (role) {
    case 'student':
      return <StudentDashboard />;
    case 'faculty':
      return <FacultyDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <StudentDashboard />;
  }
};

export default Dashboard;
