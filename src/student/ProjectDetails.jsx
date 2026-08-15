import React from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from './StudentLayout';

const ProjectDetails = () => {
  const project = {
    projectId: 1,
    projectTitle: 'Student Project Management System',
    description: 'A role-based Web API and React system for managing academic projects, task allocation, evaluation, and progress monitoring under faculty supervision. This platform decouples workflows for Administrators, Faculty Supervisors, and Students.',
    faculty: 'Prof. Madhuresh Fichadiya',
    startDate: '2026-06-22',
    endDate: '2026-09-15',
    status: 'In Progress',
    progress: 75,
    totalTasks: 8,
    completedTasks: 6,
    techStack: ['React', 'ASP.NET Core', 'SQL Server', 'JWT Auth', 'Entity Framework'],
    objectives: [
      'Design a normalized database structure to prevent duplicate allocations.',
      'Develop secure JWT-based authentication with role-based access control.',
      'Allow faculty supervisors to assign tasks and record evaluation remarks.',
      'Automatically calculate progress metrics based on task completion scores.'
    ]
  };

  return (
    <StudentLayout>
      <div className="page-title-block">
        <h1>My Project Details</h1>
        <div className="breadcrumbs">
          <Link to="/student/dashboard" style={{ textDecoration: 'none', color: '#64748b' }}>Home</Link> /{' '}
          <span>Project Details</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Left Column - Main Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', tracking: '0.05em' }}>
                  Project ID: #{project.projectId}
                </span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '4px 0 0 0', color: 'var(--text-main)' }}>
                  {project.projectTitle}
                </h2>
              </div>
              <span className="badge progress" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
                {project.status}
              </span>
            </div>

            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-muted)', margin: '0 0 20px 0' }}>
              {project.description}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Faculty Supervisor</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{project.faculty}</span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Timeline</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{project.startDate} to {project.endDate}</span>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '0 0 16px 0', color: 'var(--text-main)' }}>Key Objectives</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {project.objectives.map((obj, idx) => (
                <li key={idx} style={{ fontSize: '0.9rem', lineHeight: '1.5', color: 'var(--text-muted)' }}>
                  {obj}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column - Side Statistics & Tech Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '0 0 16px 0', color: 'var(--text-main)' }}>Project Progress</h3>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Overall Status</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>{project.progress}%</span>
            </div>
            
            <div className="progress-bar-track" style={{ height: '10px', backgroundColor: '#e2e8f0', borderRadius: '5px', overflow: 'hidden', marginBottom: '20px' }}>
              <div className="progress-bar-fill" style={{ width: `${project.progress}%`, height: '100%', backgroundColor: 'var(--primary)' }}></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>{project.totalTasks}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Tasks</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 700, color: 'var(--success)' }}>{project.completedTasks}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Completed</span>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '0 0 16px 0', color: 'var(--text-main)' }}>Technology Stack</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.techStack.map((tech, idx) => (
                <span 
                  key={idx} 
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#f1f5f9',
                    color: '#334155',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    border: '1px solid var(--border)'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default ProjectDetails;
