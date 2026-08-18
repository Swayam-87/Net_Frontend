import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to normalize data from ApiResponse<T>
api.interceptors.response.use(
  (response) => {
    // If backend wrapped in ApiResponse { success, message, data }
    if (response.data && response.data.data !== undefined) {
      return response.data;
    }
    return { success: true, data: response.data };
  },
  (error) => {
    const errorMsg =
      error.response?.data?.message ||
      error.response?.data?.title ||
      error.message ||
      'An unexpected error occurred';
    return Promise.reject(new Error(errorMsg));
  }
);

// ----------------------------------------------------
// Auth & Login
// ----------------------------------------------------
export const loginUser = async (credentials) => {
  return await api.post('/Login', credentials);
};

// ----------------------------------------------------
// Users API
// ----------------------------------------------------
export const getUsers = async () => {
  const res = await api.get('/User');
  return res.data || [];
};

export const getUserById = async (id) => {
  const res = await api.get(`/User/${id}`);
  return res.data;
};

export const createUser = async (userData) => {
  return await api.post('/User', userData);
};

export const updateUser = async (id, userData) => {
  return await api.put(`/User/${id}`, userData);
};

export const deleteUser = async (id) => {
  return await api.delete(`/User/${id}`);
};

// ----------------------------------------------------
// User Types API
// ----------------------------------------------------
export const getUserTypes = async () => {
  const res = await api.get('/UserType');
  return res.data || [];
};

export const getUserTypeById = async (id) => {
  const res = await api.get(`/UserType/${id}`);
  return res.data;
};

export const createUserType = async (data) => {
  return await api.post('/UserType', data);
};

export const updateUserType = async (id, data) => {
  return await api.put(`/UserType/${id}`, data);
};

export const deleteUserType = async (id) => {
  return await api.delete(`/UserType/${id}`);
};

// ----------------------------------------------------
// Roles API
// ----------------------------------------------------
export const getRoles = async () => {
  const res = await api.get('/Role');
  return res.data || [];
};

export const getRoleById = async (id) => {
  const res = await api.get(`/Role/${id}`);
  return res.data;
};

export const createRole = async (data) => {
  return await api.post('/Role', data);
};

export const updateRole = async (id, data) => {
  return await api.put(`/Role/${id}`, data);
};

export const deleteRole = async (id) => {
  return await api.delete(`/Role/${id}`);
};

// ----------------------------------------------------
// User Roles API
// ----------------------------------------------------
export const getUserRoles = async () => {
  const res = await api.get('/UserRole');
  return res.data || [];
};

export const getUserRoleById = async (id) => {
  const res = await api.get(`/UserRole/${id}`);
  return res.data;
};

export const createUserRole = async (data) => {
  return await api.post('/UserRole', data);
};

export const updateUserRole = async (id, data) => {
  return await api.put(`/UserRole/${id}`, data);
};

export const deleteUserRole = async (id) => {
  return await api.delete(`/UserRole/${id}`);
};

// ----------------------------------------------------
// Task Status API
// ----------------------------------------------------
export const getTaskStatuses = async () => {
  const res = await api.get('/TaskStatus');
  return res.data || [];
};

export const getTaskStatusById = async (id) => {
  const res = await api.get(`/TaskStatus/${id}`);
  return res.data;
};

export const createTaskStatus = async (data) => {
  return await api.post('/TaskStatus', data);
};

export const updateTaskStatus = async (id, data) => {
  return await api.put(`/TaskStatus/${id}`, data);
};

export const deleteTaskStatus = async (id) => {
  return await api.delete(`/TaskStatus/${id}`);
};

// ----------------------------------------------------
// Task Priority API
// ----------------------------------------------------
export const getTaskPriorities = async () => {
  const res = await api.get('/TaskPriority');
  return res.data || [];
};

export const getTaskPriorityById = async (id) => {
  const res = await api.get(`/TaskPriority/${id}`);
  return res.data;
};

export const createTaskPriority = async (data) => {
  return await api.post('/TaskPriority', data);
};

export const updateTaskPriority = async (id, data) => {
  return await api.put(`/TaskPriority/${id}`, data);
};

export const deleteTaskPriority = async (id) => {
  return await api.delete(`/TaskPriority/${id}`);
};

// ----------------------------------------------------
// Project Master API
// ----------------------------------------------------
export const getProjects = async () => {
  const res = await api.get('/ProjectMaster');
  return res.data || [];
};

export const getProjectById = async (id) => {
  const res = await api.get(`/ProjectMaster/${id}`);
  return res.data;
};

export const createProject = async (data) => {
  return await api.post('/ProjectMaster', data);
};

export const updateProject = async (id, data) => {
  return await api.put(`/ProjectMaster/${id}`, data);
};

export const deleteProject = async (id) => {
  return await api.delete(`/ProjectMaster/${id}`);
};

// ----------------------------------------------------
// Project Allocation API
// ----------------------------------------------------
export const getProjectAllocations = async () => {
  const res = await api.get('/ProjectAllocation');
  return res.data || [];
};

export const getProjectAllocationById = async (id) => {
  const res = await api.get(`/ProjectAllocation/${id}`);
  return res.data;
};

export const createProjectAllocation = async (data) => {
  return await api.post('/ProjectAllocation', data);
};

export const updateProjectAllocation = async (id, data) => {
  return await api.put(`/ProjectAllocation/${id}`, data);
};

export const deleteProjectAllocation = async (id) => {
  return await api.delete(`/ProjectAllocation/${id}`);
};

// ----------------------------------------------------
// Tasks (SPM_Task) API
// ----------------------------------------------------
export const getTasks = async () => {
  const res = await api.get('/SPM_Task');
  return res.data || [];
};

export const getTaskById = async (id) => {
  const res = await api.get(`/SPM_Task/${id}`);
  return res.data;
};

export const createTask = async (data) => {
  return await api.post('/SPM_Task', data);
};

export const updateTask = async (id, data) => {
  return await api.put(`/SPM_Task/${id}`, data);
};

export const deleteTask = async (id) => {
  return await api.delete(`/SPM_Task/${id}`);
};

// ----------------------------------------------------
// Dashboard Analytics API
// ----------------------------------------------------
export const getDashboardTotalStudents = async () => (await api.get('/Dashboard/total-students')).data;
export const getDashboardTotalFacultiesGuiding = async () => (await api.get('/Dashboard/total-faculties-guiding')).data;
export const getDashboardTotalProjects = async () => (await api.get('/Dashboard/total-projects')).data;
export const getDashboardTasksByStatus = async () => (await api.get('/Dashboard/tasks-by-status')).data;
export const getDashboardTasksByPriority = async () => (await api.get('/Dashboard/tasks-by-priority')).data;
export const getDashboardProjectsByFaculty = async () => (await api.get('/Dashboard/projects-by-faculty')).data;
export const getDashboardTasksByStudent = async () => (await api.get('/Dashboard/tasks-by-student')).data;
export const getDashboardTopStudents = async () => (await api.get('/Dashboard/top-students')).data;
export const getDashboardBottomStudents = async () => (await api.get('/Dashboard/bottom-students')).data;
export const getDashboardOverdueTasks = async () => (await api.get('/Dashboard/overdue-tasks')).data;
export const getDashboardUpcomingFollowups = async () => (await api.get('/Dashboard/upcoming-followups')).data;
export const getDashboardGradeDistribution = async () => (await api.get('/Dashboard/grade-distribution')).data;
export const getDashboardMonthwiseCompletedTasks = async () => (await api.get('/Dashboard/monthwise-completed-tasks')).data;
export const getDashboardActiveUsersByRole = async () => (await api.get('/Dashboard/active-users-by-role')).data;
export const getDashboardUsersByRole = async () => (await api.get('/Dashboard/users-by-role')).data;
export const getDashboardRolesLargeUserCount = async () => (await api.get('/Dashboard/roles-large-user-count')).data;
export const getDashboardRoleStatistics = async () => (await api.get('/Dashboard/role-statistics')).data;
export const getDashboardUpcomingDueTasks = async () => (await api.get('/Dashboard/upcoming-due-tasks')).data;
export const getDashboardProjectTaskSummary = async () => (await api.get('/Dashboard/project-task-summary')).data;
export const getDashboardProjectScorePercentage = async () => (await api.get('/Dashboard/project-score-percentage')).data;
export const getDashboardTopProjects = async () => (await api.get('/Dashboard/top-projects')).data;
export const getDashboardFacultySummary = async () => (await api.get('/Dashboard/faculty-summary')).data;
export const getDashboardStudentCompletionStats = async () => (await api.get('/Dashboard/student-completion-stats')).data;
export const getDashboardOverdueIncompleteProjects = async () => (await api.get('/Dashboard/overdue-incomplete-projects')).data;
export const getDashboardMonthwiseCompletedTasksInt = async () => (await api.get('/Dashboard/monthwise-completed-tasks-int')).data;
export const getDashboardFacultyProgressRanking = async () => (await api.get('/Dashboard/faculty-progress-ranking')).data;
export const getDashboardProjectTaskDetails = async () => (await api.get('/Dashboard/project-task-details')).data;

export default api;
