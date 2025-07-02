// Simple connection test script for Windows VM
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

console.log('🔍 Testing connection to backend server...\n');

async function testConnection() {
  try {
    console.log('1️⃣ Testing health endpoint...');
    const healthResponse = await axios.get(`${API_URL}/health`, { timeout: 5000 });
    console.log('✅ Health check successful:', healthResponse.data);
    
    console.log('\n2️⃣ Testing test endpoint...');
    const testResponse = await axios.get(`${API_URL}/test`, { timeout: 5000 });
    console.log('✅ Test endpoint successful:', testResponse.data);
    
    console.log('\n🎉 Backend server is running and accessible!');
    console.log('🔗 API URL:', API_URL);
    
  } catch (error) {
    console.error('\n❌ Connection test failed:');
    
    if (error.code === 'ECONNREFUSED') {
      console.error('🔌 Connection refused - Backend server is not running');
      console.error('💡 Solution: Start the backend server with "npm run dev" or "cd server && npm run dev"');
    } else if (error.code === 'ETIMEDOUT') {
      console.error('⏰ Connection timed out - Server may be slow or blocked');
      console.error('💡 Solution: Check firewall settings or increase timeout');
    } else if (error.code === 'ENOTFOUND') {
      console.error('🌐 DNS resolution failed - localhost not accessible');
      console.error('💡 Solution: Try using 127.0.0.1 instead of localhost');
    } else {
      console.error('🔥 Unexpected error:', error.message);
    }
    
    console.error('\n🛠️ Troubleshooting steps:');
    console.error('1. Ensure backend server is running: cd server && npm run dev');
    console.error('2. Check if port 5000 is available: netstat -ano | findstr :5000');
    console.error('3. Try accessing http://localhost:5000/api/health in browser');
    console.error('4. Check Windows Firewall settings');
    console.error('5. Try using 127.0.0.1 instead of localhost');
  }
}

testConnection();