import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getDashboardData = async (token: string) => {
  const response = await axios.get(`${API_URL}/admin/dashboard`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const exportStudents = async (token: string) => {
  const response = await axios.get(`${API_URL}/admin/export/students`, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'blob'
  });
  return response.data;
};

export const exportAttendance = async (startDate?: string, endDate?: string, token?: string) => {
  const response = await axios.get(`${API_URL}/admin/export/attendance`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { startDate, endDate },
    responseType: 'blob'
  });
  return response.data;
};