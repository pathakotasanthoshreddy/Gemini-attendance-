import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const markAttendance = async (studentId: string, location?: string) => {
  const response = await axios.post(`${API_URL}/attendance/mark`, { 
    studentId, 
    location 
  });
  return response.data;
};

export const getAttendance = async (params: any = {}, token: string) => {
  const response = await axios.get(`${API_URL}/attendance`, {
    headers: { Authorization: `Bearer ${token}` },
    params
  });
  return response.data;
};

export const getAttendanceSummary = async (date: string, token: string) => {
  const response = await axios.get(`${API_URL}/attendance/summary`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { date }
  });
  return response.data;
};