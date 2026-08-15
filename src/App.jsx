import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './common/Login';
import Register from './common/Register';

import StudentDashboard from './student/StudentDashboard';
import StudentProfile from './student/StudentProfile';
import StudentProjectDetails from './student/ProjectDetails';
import StudentTasksList from './student/StudentTasks';

import FacultyDashboard from './faculty/FacultyDashboard';
import FacultyProfile from './faculty/FacultyProfile';
import FacultyManageTasks from './faculty/ManageTasks';
import FacultyProjectAllocations from './faculty/ProjectAllocations';

import AdminDashboard from './admin/AdminDashboard';
import AdminProfile from './admin/AdminProfile';
import AdminManageRoles from './admin/ManageRoles';
import AdminManageUsers from './admin/ManageUsers';
import AdminManageUserTypes from './admin/ManageUserTypes';
import AdminManageUserRoles from './admin/ManageUserRoles';
import AdminManageTaskStatus from './admin/ManageTaskStatus';
import AdminManageTaskPriority from './admin/ManageTaskPriority';
import AdminManageProjectMaster from './admin/ManageProjectMaster';
import AdminManageProjectAllocations from './admin/ManageProjectAllocations';
import AdminManageTasks from './admin/ManageTasks';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student Workspace Routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/project" element={<StudentProjectDetails />} />
        <Route path="/student/tasks" element={<StudentTasksList />} />
        <Route path="/student/profile" element={<StudentProfile />} />

        {/* Faculty Workspace Routes */}
        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
        <Route path="/faculty/tasks" element={<FacultyManageTasks />} />
        <Route path="/faculty/allocations" element={<FacultyProjectAllocations />} />
        <Route path="/faculty/profile" element={<FacultyProfile />} />

        {/* Admin Workspace Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/roles" element={<AdminManageRoles />} />
        <Route path="/admin/users" element={<AdminManageUsers />} />
        <Route path="/admin/user-types" element={<AdminManageUserTypes />} />
        <Route path="/admin/user-roles" element={<AdminManageUserRoles />} />
        <Route path="/admin/task-status" element={<AdminManageTaskStatus />} />
        <Route path="/admin/task-priority" element={<AdminManageTaskPriority />} />
        <Route path="/admin/project-master" element={<AdminManageProjectMaster />} />
        <Route path="/admin/project-allocations" element={<AdminManageProjectAllocations />} />
        <Route path="/admin/tasks" element={<AdminManageTasks />} />
        <Route path="/admin/profile" element={<AdminProfile />} />

        {/* Catch-all redirect to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
