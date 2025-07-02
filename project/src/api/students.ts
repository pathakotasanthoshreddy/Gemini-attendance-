import axios from 'axios';

// Updated fallback URL to your public IP
const API_URL = import.meta.env.VITE_API_URL || 'http://135.235.254.122:5000/api';

// Configure axios defaults
axios.defaults.timeout = 15000; // 15 second timeout
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add request interceptor for debugging
axios.interceptors.request.use(
  (config) => {
    console.log('🚀 Making API request to:', config.url);
    console.log('📋 Request config:', {
      method: config.method,
      url: config.url,
      data: config.data,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
axios.interceptors.response.use(
  (response) => {
    console.log('✅ API response received:', {
      status: response.status,
      data: response.data,
      url: response.config.url
    });
    return response;
  },
  (error) => {
    console.error('❌ API response error:', error);

    if (error.code === 'ECONNREFUSED') {
      console.error('🔌 Connection refused - backend server may not be running on port 5000');
    } else if (error.code === 'ENOTFOUND') {
      console.error('🌐 DNS resolution failed - check if server is accessible');
    } else if (error.code === 'ETIMEDOUT') {
      console.error('⏰ Request timed out - server may be slow or unresponsive');
    }

    return Promise.reject(error);
  }
);

// API Calls

export const registerStudent = async (studentData: any) => {
  try {
    console.log('📝 Registering student with API URL:', API_URL);
    console.log('👤 Student data:', studentData);

    const response = await axios.post(`${API_URL}/students/register`, studentData, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log('✅ Registration successful:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Registration API error:', error);

    if (error.code === 'ECONNREFUSED') {
      throw new Error('Cannot connect to server. Please ensure the backend server is running.');
    } else if (error.code === 'ETIMEDOUT') {
      throw new Error('Request timed out. Please check your network connection and try again.');
    } else if (error.response?.status === 400) {
      throw new Error(error.response.data.error || 'Invalid data provided');
    } else if (error.response?.status === 500) {
      throw new Error('Server error occurred. Please try again later.');
    }

    throw error;
  }
};

export const getStudents = async (params: any = {}, token: string) => {
  const response = await axios.get(`${API_URL}/students`, {
    headers: { Authorization: `Bearer ${token}` },
    params
  });
  return response.data;
};

export const getStudent = async (id: string, token: string) => {
  const response = await axios.get(`${API_URL}/students/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateStudent = async (id: string, studentData: any, token: string) => {
  const response = await axios.put(`${API_URL}/students/${id}`, studentData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteStudent = async (id: string, token: string) => {
  const response = await axios.delete(`${API_URL}/students/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getStudentQR = async (id: string) => {
  const response = await axios.get(`${API_URL}/students/${id}/qr`);
  return response.data;
};
