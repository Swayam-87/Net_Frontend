import React from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from './StudentLayout';

const TeamMembers = () => {
  const team = [
    {
      memberId: 1,
      fullName: 'Swayam Vachhani',
      email: 'swayamv87@gmail.com',
      mobileNumber: '9428965865',
      role: 'Team Lead / Full Stack Developer',
      status: 'Active'
    },
    {
      memberId: 2,
      fullName: 'Priya Sharma',
      email: 'priya.sharma@darshan.ac.in',
      mobileNumber: '9122334455',
      role: 'Frontend Developer',
      status: 'Active'
    },
    {
      memberId: 3,
      fullName: 'Rohan Shah',
      email: 'rohan.shah@darshan.ac.in',
      mobileNumber: '9822334466',
      role: 'Backend Developer',
      status: 'Active'
    }
  ];

  return (
    <StudentLayout>
      <div className="page-title-block">
        <h1>Team Members</h1>
        <div className="breadcrumbs">
          <Link to="/student/dashboard" style={{ textDecoration: 'none', color: '#64748b' }}>Home</Link> /{' '}
          <span>Team Members</span>
        </div>
      </div>

      <div className="data-table-container">
        <div className="data-table-header">
          <span className="table-title">Project Team Assignments</span>
        </div>
        <div className="table-responsive">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>ID</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Mobile Number</th>
                <th>Role in Project</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {team.map((member) => (
                <tr key={member.memberId}>
                  <td><span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>#{member.memberId}</span></td>
                  <td><span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{member.fullName}</span></td>
                  <td style={{ color: 'var(--text-muted)' }}>{member.email}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{member.mobileNumber}</td>
                  <td><span style={{ fontWeight: 500 }}>{member.role}</span></td>
                  <td>
                    <span className="badge completed">
                      {member.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </StudentLayout>
  );
};

export default TeamMembers;
