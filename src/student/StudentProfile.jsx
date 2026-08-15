import React from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from './StudentLayout';

const StudentProfile = () => {

  return (
    <StudentLayout>
      <div className="page-title-block">
        <h1>My Profile</h1>
        <div className="breadcrumbs">
          <Link to="/student/dashboard" style={{ textDecoration: 'none', color: '#64748b' }}>Home</Link> /{' '}
          <span>Profile</span>
        </div>
      </div>

      <div className="card">
        <h3>Academic Profile Card</h3>
        <hr style={{ margin: '15px 0', border: 'none', borderBottom: '1px solid #ddd' }} />
        <div className="grid-2">
          <div>
            <h4 style={{ marginBottom: '10px' }}>Personal Information</h4>
            <p style={{ margin: '8px 0' }}><strong>Full Name:</strong> Swayam Vachhani</p>
            <p style={{ margin: '8px 0' }}><strong>Email Address:</strong> swayamv87@gmail.com</p>
            <p style={{ margin: '8px 0' }}><strong>Mobile Number:</strong> 9428965865</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '10px' }}>Academic Information</h4>
            <p style={{ margin: '8px 0' }}><strong>Enrollment Number:</strong> 25010101674</p>
            <p style={{ margin: '8px 0' }}><strong>Department:</strong> CSE</p>
            <p style={{ margin: '8px 0' }}><strong>Semester:</strong> 5</p>
            <p style={{ margin: '8px 0' }}><strong>Division / Batch:</strong> A / 4</p>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentProfile;
