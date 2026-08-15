import React from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from './StudentLayout';

const ScoresGrades = () => {
  const scores = [
    {
      scoreId: 1,
      taskTitle: 'Database normalization & model setup',
      assignedScore: 10,
      earnedScore: 10,
      evaluationDate: '2026-07-11',
      remarks: 'Excellent normalization; structure aligns perfectly with relational integrity guidelines.'
    },
    {
      scoreId: 2,
      taskTitle: 'Setup basic routing & login form validation',
      assignedScore: 10,
      earnedScore: 8,
      evaluationDate: '2026-07-21',
      remarks: 'Proper route protection. Form styling and responsiveness can be polished.'
    }
  ];

  return (
    <StudentLayout>
      <div className="page-title-block">
        <h1>Scores & Grades</h1>
        <div className="breadcrumbs">
          <Link to="/student/dashboard" style={{ textDecoration: 'none', color: '#64748b' }}>Home</Link> /{' '}
          <span>Scores & Grades</span>
        </div>
      </div>

      <div className="data-table-container">
        <div className="data-table-header">
          <span className="table-title">My Evaluated Task Grades</span>
        </div>
        <div className="table-responsive">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>ID</th>
                <th>Evaluated Deliverable (Task)</th>
                <th>Marks Obtained</th>
                <th>Evaluation Date</th>
                <th>Supervisor Remarks</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score) => (
                <tr key={score.scoreId}>
                  <td><span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>#{score.scoreId}</span></td>
                  <td><span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{score.taskTitle}</span></td>
                  <td>
                    <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                      {score.earnedScore}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}> / {score.assignedScore}</span>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{score.evaluationDate}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: '1.4', maxWidth: '400px' }}>
                    {score.remarks}
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

export default ScoresGrades;
