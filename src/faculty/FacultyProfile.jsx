import React from 'react';
import { Link } from 'react-router-dom';
import FacultyLayout from './FacultyLayout';

const FacultyProfile = () => {
  

  return (
    <FacultyLayout>
      <div className="page-title-block">
        <h1>Faculty Profile</h1>
        <div className="breadcrumbs">
          <Link to="/faculty/dashboard" style={{ textDecoration: 'none', color: '#64748b' }}>Home</Link> /{' '}
          <span>Profile</span>
        </div>
      </div>

      <div className="card">
        <h3>Faculty Credentials</h3>
        <hr style={{ margin: '15px 0', border: 'none', borderBottom: '1px solid #ddd' }} />
        <div className="grid-2">
          <div>
            <h4 style={{ marginBottom: '10px' }}>Personal Information</h4>
            <p style={{ margin: '8px 0' }}><strong>Full Name:</strong> Madhuresh</p>
            <p style={{ margin: '8px 0' }}><strong>Email Address:</strong> madhuresh@darshan.ac.in</p>
            <p style={{ margin: '8px 0' }}><strong>Mobile Number:</strong> 9432473243</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '10px' }}>Professional Information</h4>
            <p style={{ margin: '8px 0' }}><strong>Faculty ID:</strong> 101</p>
            <p style={{ margin: '8px 0' }}><strong>Department:</strong> CSE</p>
            <p style={{ margin: '8px 0' }}><strong>Designation:</strong> Assistant Professior</p>
            <p style={{ margin: '8px 0' }}><strong>Area of Expertise:</strong> .net</p>
          </div>
        </div>
      </div>
    </FacultyLayout>
  );
};

export default FacultyProfile;
