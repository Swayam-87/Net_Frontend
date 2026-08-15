import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);

  // Core Analytics States
  const [metrics, setMetrics] = useState({
    totalStudents: 12,
    totalFaculty: 4,
    totalProjects: 5,
    completedTasks: 21,
    totalTasks: 25,
    completionRate: 84
  });

  // Chart Data States
  const [statusDistribution, setStatusDistribution] = useState([
    { status: 'Completed', count: 12, percentage: 57, color: '#10b981' },
    { status: 'In Progress', count: 5, percentage: 24, color: '#3b82f6' },
    { status: 'Pending', count: 3, percentage: 14, color: '#f59e0b' },
    { status: 'Rejected', count: 1, percentage: 5, color: '#ef4444' }
  ]);

  const [priorityBreakdown, setPriorityBreakdown] = useState([
    { priority: 'High Priority', count: 8, percentage: 38, color: '#ef4444' },
    { priority: 'Medium Priority', count: 9, percentage: 43, color: '#f59e0b' },
    { priority: 'Low Priority', count: 4, percentage: 19, color: '#3b82f6' }
  ]);

  const [monthlyVelocity, setMonthlyVelocity] = useState([
    { month: 'May', completed: 15, height: '35%' },
    { month: 'Jun', completed: 28, height: '65%' },
    { month: 'Jul', completed: 42, height: '95%' },
    { month: 'Aug', completed: 30, height: '70%' },
    { month: 'Sep', completed: 36, height: '82%' }
  ]);

  const [topPerformers, setTopPerformers] = useState([
    { name: 'Karan Trivedi', project: 'AI Healthcare Diagnostics', score: 25.0, grade: 'A+' },
    { name: 'Priya Sharma', project: 'Student Project Management', score: 21.5, grade: 'A+' },
    { name: 'Rohan Shah', project: 'E-Commerce Engine', score: 18.0, grade: 'A' },
    { name: 'Yash Rathod', project: 'IoT Smart Home Dashboard', score: 16.5, grade: 'A' },
    { name: 'Ananya Joshi', project: 'Smart Library Portal', score: 14.0, grade: 'B+' }
  ]);

  const [projectHealth, setProjectHealth] = useState([
    { title: 'AI Healthcare Diagnostics', progress: 100, status: 'Completed', color: '#10b981' },
    { title: 'Student Project Management System', progress: 80, status: 'On Track', color: '#3b82f6' },
    { title: 'E-Commerce Engine', progress: 75, status: 'On Track', color: '#3b82f6' },
    { title: 'Smart Library Portal', progress: 65, status: 'In Progress', color: '#f59e0b' },
    { title: 'IoT Smart Home Dashboard', progress: 30, status: 'Needs Attention', color: '#ef4444' }
  ]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const [resStudents, resProjects, resStatus] = await Promise.allSettled([
        fetch('https://localhost:7173/api/Dashboard/total-students').then(r => r.json()),
        fetch('https://localhost:7173/api/Dashboard/total-projects').then(r => r.json()),
        fetch('https://localhost:7173/api/Dashboard/tasks-by-status').then(r => r.json())
      ]);

      if (resStudents.status === 'fulfilled' && resStudents.value?.totalStudents) {
        setMetrics(m => ({ ...m, totalStudents: resStudents.value.totalStudents }));
      }
      if (resProjects.status === 'fulfilled' && resProjects.value?.totalProjects) {
        setMetrics(m => ({ ...m, totalProjects: resProjects.value.totalProjects }));
      }
      if (resStatus.status === 'fulfilled' && Array.isArray(resStatus.value) && resStatus.value.length > 0) {
        const total = resStatus.value.reduce((acc, curr) => acc + (curr.tasks || 0), 0);
        if (total > 0) {
          const colors = { Completed: '#10b981', 'In Progress': '#3b82f6', Pending: '#f59e0b', Rejected: '#ef4444' };
          const mapped = resStatus.value.map(item => ({
            status: item.status || item.Status,
            count: item.tasks || item.Tasks,
            percentage: Math.round(((item.tasks || item.Tasks) / total) * 100),
            color: colors[item.status || item.Status] || '#64748b'
          }));
          setStatusDistribution(mapped);
        }
      }
    } catch (err) {
      console.log('Analytics endpoint offline, rendering visual charts report.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <AdminLayout>
      {/* Title Header */}
      <div className="page-title-block" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>Executive Analytics & Reports</h1>
          <div className="breadcrumbs" style={{ marginTop: '4px', fontSize: '0.9rem', color: '#64748b' }}>
            <Link to="/admin/dashboard" style={{ textDecoration: 'none', color: '#64748b' }}>Home</Link> / <span>Analytics Overview</span>
          </div>
        </div>
        <button
          onClick={fetchAnalytics}
          className="btn-primary"
          style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M23 4v6h-6"></path>
            <path d="M1 20v-6h6"></path>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
          Refresh Analytics
        </button>
      </div>

      {/* 4 KPI Executive Metric Cards */}
      <div className="summary-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>

        <div className="summary-card" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#166534' }}>TOTAL STUDENTS</span>
            <div style={{ width: 42, height: 42, borderRadius: '10px', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
              </svg>
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#14532d', marginTop: '10px' }}>{metrics.totalStudents}</div>
          <div style={{ fontSize: '0.8rem', color: '#15803d', marginTop: '4px', fontWeight: 500 }}>Active registered students</div>
        </div>

        <div className="summary-card" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #eff6ff 100%)', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e40af' }}>GUIDING FACULTY</span>
            <div style={{ width: 42, height: 42, borderRadius: '10px', backgroundColor: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1e3a8a', marginTop: '10px' }}>{metrics.totalFaculty}</div>
          <div style={{ fontSize: '0.8rem', color: '#1d4ed8', marginTop: '4px', fontWeight: 500 }}>Project faculty guides</div>
        </div>

        <div className="summary-card" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)', border: '1px solid #e9d5ff', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#6b21a8' }}>ACTIVE PROJECTS</span>
            <div style={{ width: 42, height: 42, borderRadius: '10px', backgroundColor: '#f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333ea' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#581c87', marginTop: '10px' }}>{metrics.totalProjects}</div>
          <div style={{ fontSize: '0.8rem', color: '#7e22ce', marginTop: '4px', fontWeight: 500 }}>Ongoing project tracks</div>
        </div>

        <div className="summary-card" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #fff7ed 100%)', border: '1px solid #fed7aa', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#9a3412' }}>COMPLETION RATE</span>
            <div style={{ width: 42, height: 42, borderRadius: '10px', backgroundColor: '#ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ea580c' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#7c2d12', marginTop: '10px' }}>{metrics.completionRate}%</div>
          <div style={{ fontSize: '0.8rem', color: '#c2410c', marginTop: '4px', fontWeight: 500 }}></div>
        </div>

      </div>

      {/* Visual Analytics Grid 1: Donut Chart & Priority Bars */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '25px', marginBottom: '30px' }}>

        {/* Task Status Distribution Donut Chart */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#3b82f6' }}></span>
            Task Status Distribution
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: '20px', flexWrap: 'wrap' }}>
            {/* SVG Interactive Donut Chart */}
            <div style={{ position: 'relative', width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="170" height="170" viewBox="0 0 42 42" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#e2e8f0" strokeWidth="4"></circle>

                {/* Completed (57%) */}
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#10b981" strokeWidth="5.5" strokeDasharray="57 43" strokeDashoffset="0"></circle>
                {/* In Progress (24%) */}
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#3b82f6" strokeWidth="5.5" strokeDasharray="24 76" strokeDashoffset="-57"></circle>
                {/* Pending (14%) */}
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#f59e0b" strokeWidth="5.5" strokeDasharray="14 86" strokeDashoffset="-81"></circle>
                {/* Rejected (5%) */}
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#ef4444" strokeWidth="5.5" strokeDasharray="5 95" strokeDashoffset="-95"></circle>
              </svg>
              <div style={{ position: 'absolute', textAlign: 'center' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>21</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Total Tasks</div>
              </div>
            </div>

            {/* Legend & Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, minWidth: '160px' }}>
              {statusDistribution.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '4px', backgroundColor: item.color }}></div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>{item.status}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>{item.count}</span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Task Priority Spectrum Bar Chart */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ef4444' }}></span>
            Task Priority Level Breakdown
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
            {priorityBreakdown.map((item, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 600, color: '#334155' }}>{item.priority}</span>
                  <span style={{ fontWeight: 700, color: item.color }}>{item.count} Tasks ({item.percentage}%)</span>
                </div>
                <div style={{ width: '100%', height: '10px', backgroundColor: '#f1f5f9', borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ width: `${item.percentage}%`, height: '100%', backgroundColor: item.color, borderRadius: '6px', transition: 'width 0.6s ease-in-out' }}></div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '24px', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', fontSize: '0.82rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            High priority items require immediate faculty evaluation and milestone sign-off.
          </div>
        </div>

      </div>

      {/* Visual Analytics Grid 2: Monthly Trend Velocity & Top Performers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '25px', marginBottom: '30px' }}>

        {/* Monthly Completion Velocity Graph */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10b981' }}></span>
            Monthly Task Completion Trend
          </h3>

          <div style={{ height: '210px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '15px', padding: '0 10px 10px 10px', borderBottom: '2px stroke #cbd5e1' }}>
            {monthlyVelocity.map((item, idx) => (
              <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#10b981' }}>{item.completed}</span>
                <div style={{ width: '100%', maxWidth: '38px', height: item.height, background: 'linear-gradient(180deg, #10b981 0%, #a7f3d0 100%)', borderRadius: '6px 6px 0 0', transition: 'height 0.5s ease' }}></div>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Project Health Status Overview */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#9333ea' }}></span>
            Project Health & Milestone Meters
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {projectHealth.map((p, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600, color: '#1e293b' }}>{p.title}</span>
                  <span style={{ fontWeight: 700, color: p.color }}>{p.progress}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${p.progress}%`, height: '100%', backgroundColor: p.color, borderRadius: '4px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Top Student Performers Leaderboard */}
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#f59e0b' }}></span>
          Top Performing Students Analytics Leaderboard
        </h3>

        <div className="table-responsive">
          <table className="dashboard-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid #e2e8f0', color: '#64748b', fontSize: '0.85rem' }}>
                <th style={{ padding: '12px' }}>Rank</th>
                <th style={{ padding: '12px' }}>Student Name</th>
                <th style={{ padding: '12px' }}>Assigned Project</th>
                <th style={{ padding: '12px' }}>Earned Score</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Grade</th>
              </tr>
            </thead>
            <tbody>
              {topPerformers.map((st, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px', fontWeight: 700, color: '#64748b' }}>#{idx + 1}</td>
                  <td style={{ padding: '12px', fontWeight: 700, color: '#0f172a' }}>{st.name}</td>
                  <td style={{ padding: '12px', color: '#475569' }}>{st.project}</td>
                  <td style={{ padding: '12px', fontWeight: 700, color: '#10b981' }}>{st.score} pts</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '20px', fontWeight: 700, fontSize: '0.8rem' }}>
                      {st.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </AdminLayout>
  );
};

export default AdminDashboard;
