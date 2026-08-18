import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';

const ROLE_INFO = {
  admin: {
    title: 'Admin Portal',
    roleLabel: 'Administrator',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
    email: 'aarav.patel@darshan.ac.in',
    password: 'password123',
    name: 'Aarav Patel',
    badgeColor: '#4f46e5',
    bgLight: '#e0e7ff',
    details: [
      { label: 'Role Access', value: 'System Administrator' },
      { label: 'Permissions', value: 'Full Control & User Management' },
      { label: 'Target Route', value: '/admin/dashboard' }
    ]
  },
  faculty: {
    title: 'Faculty Portal',
    roleLabel: 'Faculty / Guide',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
      </svg>
    ),
    email: 'madhuresh.fichadiya@darshan.ac.in',
    password: 'password123',
    name: 'Prof. Madhuresh Fichadiya',
    badgeColor: '#0284c7',
    bgLight: '#e0f2fe',
    details: [
      { label: 'Role Access', value: 'Faculty Supervisor' },
      { label: 'Permissions', value: 'Tasks & Project Allocation' },
      { label: 'Target Route', value: '/faculty/dashboard' }
    ]
  },
  student: {
    title: 'Student Portal',
    roleLabel: 'Student User',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
    email: 'priya.sharma@darshan.ac.in',
    password: 'password123',
    name: 'Priya Sharma',
    badgeColor: '#10b981',
    bgLight: '#d1fae5',
    details: [
      { label: 'Full Name', value: 'Priya Sharma' },
      { label: 'Email', value: 'priya.sharma@darshan.ac.in' },
      { label: 'Role Access', value: 'Student Projects & Tasks' }
    ]
  }
};

const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('student');
  const [email, setEmail] = useState(ROLE_INFO.student.email);
  const [password, setPassword] = useState(ROLE_INFO.student.password);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRoleSelect = (roleKey) => {
    setSelectedRole(roleKey);
    setEmail(ROLE_INFO[roleKey].email);
    setPassword(ROLE_INFO[roleKey].password);
    setErrors({});
    setServerError('');
  };

  const validate = () => {
    const tempErrors = {};
    
    if (!email) {
      tempErrors.email = 'Email address is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        tempErrors.email = 'Please enter a valid email address';
      }
    }

    if (!password) {
      tempErrors.password = 'Password is required';
    } else if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setServerError('');
      try {
        const response = await loginUser({ email, password });
        const user = response.data || response;
        const userType = (user.userTypeName || user.UserTypeName || selectedRole).toLowerCase();
        let targetRole = 'student';
        if (userType.includes('admin')) targetRole = 'admin';
        else if (userType.includes('faculty')) targetRole = 'faculty';

        localStorage.setItem('currentUser', JSON.stringify({
          userId: user.userID || user.userId || user.UserID,
          role: targetRole,
          name: user.fullName || user.FullName || 'User',
          email: user.email || user.Email,
          userTypeName: user.userTypeName || user.UserTypeName,
          profilePicturePath: user.profilePicturePath || ''
        }));

        navigate(`/${targetRole}/dashboard`);
      } catch (err) {
        console.error('Login error:', err);
        setServerError(err.message || 'Invalid email or password.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const activeRoleData = ROLE_INFO[selectedRole];

  return (
    <div className="auth-wrapper">
      <div className="pro-auth-container">
        
        {/* Left Side Hero Panel */}
        <div className="pro-auth-hero">
          <div className="hero-brand">
            <div className="hero-brand-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" color="white">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
              </svg>
            </div>
            <div>
              <div className="hero-brand-text">ProjectTracker</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>Academic Management Portal</div>
            </div>
          </div>

          <div className="hero-content">
            <h1 className="hero-headline">Streamline Academic Deliverables & Tasks</h1>
            <p className="hero-subtext">
              Unified workspace for Students, Faculty guides, and System Administrators to assign, track, and evaluate projects seamlessly.
            </p>

            <div className="hero-feature-cards">
              <div className="hero-feature-item">
                <div className="hero-feature-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 11 12 14 22 4"></polyline>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>Automated Task Verification</div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Real-time milestone and progress updates</div>
                </div>
              </div>

              <div className="hero-feature-item">
                <div className="hero-feature-icon" style={{ color: '#34d399' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>Faculty Guide Allocation</div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Direct mentorship & evaluation feedback</div>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-footer-stats">
            <div className="stat-box">
              <span className="stat-value">100%</span>
              <span className="stat-label">Role Isolation</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">99.9%</span>
              <span className="stat-label">System Uptime</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">v2.4</span>
              <span className="stat-label">Latest Version</span>
            </div>
          </div>
        </div>

        {/* Right Side Form Panel */}
        <div className="pro-auth-form-panel">
          
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              Welcome back
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '4px' }}>
              Please select your role and enter your credentials.
            </p>
          </div>

          {/* 3 Role Selection Segmented Buttons */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
              Select Login Role:
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '6px',
              backgroundColor: '#f1f5f9',
              padding: '5px',
              borderRadius: '12px'
            }}>
              {Object.keys(ROLE_INFO).map((roleKey) => {
                const r = ROLE_INFO[roleKey];
                const isSelected = selectedRole === roleKey;
                return (
                  <button
                    key={roleKey}
                    type="button"
                    onClick={() => handleRoleSelect(roleKey)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '10px 8px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: isSelected ? 'white' : 'transparent',
                      boxShadow: isSelected ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      color: isSelected ? r.badgeColor : '#64748b',
                      fontWeight: isSelected ? 700 : 500,
                      fontSize: '0.85rem'
                    }}
                  >
                    {r.icon}
                    <span style={{ textTransform: 'capitalize' }}>{roleKey}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Role Quick Credentials Preview */}
          <div style={{
            backgroundColor: activeRoleData.bgLight,
            border: `1px solid ${activeRoleData.badgeColor}35`,
            borderRadius: '12px',
            padding: '12px 14px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: activeRoleData.badgeColor, letterSpacing: '0.04em' }}>
                {activeRoleData.roleLabel} Profile
              </span>
              <span style={{
                backgroundColor: activeRoleData.badgeColor,
                color: 'white',
                fontSize: '0.68rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '9999px'
              }}>
                Auto-Filled
              </span>
            </div>
            
            <div style={{ fontSize: '0.85rem', color: '#1e293b', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '4px' }}>
              {activeRoleData.details.map((d, i) => (
                <div key={i} style={{ fontSize: '0.78rem' }}>
                  <span style={{ color: '#64748b' }}>{d.label}: </span>
                  <strong style={{ color: '#0f172a' }}>{d.value}</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Server Error Alert */}
          {serverError && (
            <div style={{ backgroundColor: '#fee2e2', border: '1px solid #fca5a5', color: '#b91c1c', padding: '10px 14px', borderRadius: '8px', marginBottom: '18px', fontSize: '0.85rem', fontWeight: 600 }}>
              {serverError}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group" style={{ marginBottom: '18px' }}>
              <label className="form-label" htmlFor="email">Email Address</label>
              <div className="input-with-icon">
                <span className="input-icon-left">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@darshan.ac.in"
                />
              </div>
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group" style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label className="form-label" htmlFor="password" style={{ margin: 0 }}>Password</label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} style={{ fontSize: '0.8rem', color: activeRoleData.badgeColor, textDecoration: 'none', fontWeight: 600 }}>
                  Forgot password?
                </a>
              </div>
              <div className="input-with-icon">
                <span className="input-icon-left">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  style={{ paddingRight: '40px' }}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle Password Visibility"
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '22px' }}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ width: 'auto', cursor: 'pointer', accentColor: activeRoleData.badgeColor }}
              />
              <label htmlFor="rememberMe" style={{ display: 'inline', margin: 0, fontSize: '0.85rem', cursor: 'pointer', color: '#475569' }}>
                Keep me signed in on this browser
              </label>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{
                backgroundColor: activeRoleData.badgeColor,
                padding: '13px',
                fontSize: '0.95rem',
                fontWeight: 700,
                borderRadius: '10px',
                boxShadow: `0 4px 12px ${activeRoleData.badgeColor}40`
              }}
            >
              Sign In as {activeRoleData.roleLabel}
            </button>
          </form>

          <div className="auth-footer" style={{ marginTop: '24px' }}>
            New user? <Link to="/register" style={{ color: activeRoleData.badgeColor }}>Register your account</Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;


