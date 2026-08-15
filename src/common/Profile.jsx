import React from 'react';
import StudentProfile from '../student/StudentProfile';
import FacultyProfile from '../faculty/FacultyProfile';
import AdminProfile from '../admin/AdminProfile';

const Profile = () => {
  const role = 'student';

  switch (role) {
    case 'student':
      return <StudentProfile />;
    case 'faculty':
      return <FacultyProfile />;
    case 'admin':
      return <AdminProfile />;
    default:
      return <StudentProfile />;
  }
};

export default Profile;
