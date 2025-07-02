import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://135.235.254.122:5000/api';

export const loginAdmin = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

export const setupAdmin = async (email: string, password: string, firstName: string, lastName: string) => {
  const response = await axios.post(`${API_URL}/auth/setup`, { 
    email, 
    password, 
    firstName, 
    lastName 
  });
  return response.data;
};