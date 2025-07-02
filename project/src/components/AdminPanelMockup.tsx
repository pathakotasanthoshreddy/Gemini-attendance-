import React, { useState } from 'react';
import { 
  Shield, 
  Eye, 
  EyeOff, 
  QrCode, 
  Camera, 
  CheckCircle, 
  Download, 
  Users, 
  Clock,
  Mail,
  Phone,
  BookOpen,
  Calendar,
  FileSpreadsheet,
  Search,
  Filter
} from 'lucide-react';

const AdminPanelMockup = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [scannedStudent, setScannedStudent] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Mock student data
  const mockStudents = [
    {
      id: 'STU001',
      name: 'Rajesh Kumar',
      mobile: '+91 9876543210',
      email: 'rajesh.kumar@email.com',
      course: 'DevOps with AI Tools',
      batch: 'Batch 15',
      status: 'Present',
      time: '09:15 AM'
    },
    {
      id: 'STU002',
      name: 'Priya Sharma',
      mobile: '+91 9876543211',
      email: 'priya.sharma@email.com',
      course: 'DevOps with AI Tools',
      batch: 'Batch 15',
      status: 'Present',
      time: '09:22 AM'
    },
    {
      id: 'STU003',
      name: 'Amit Patel',
      mobile: '+91 9876543212',
      email: 'amit.patel@email.com',
      course: 'DevOps with AI Tools',
      batch: 'Batch 15',
      status: 'Absent',
      time: '-'
    },
    {
      id: 'STU004',
      name: 'Sneha Reddy',
      mobile: '+91 9876543213',
      email: 'sneha.reddy@email.com',
      course: 'DevOps with AI Tools',
      batch: 'Batch 15',
      status: 'Present',
      time: '09:45 AM'
    }
  ];

  const handleLogin = () => {
    if (email === 'vcubemulticloud@gmail.com' && password === 'Vcube$4321') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials! Please use:\nEmail: vcubemulticloud@gmail.com\nPassword: Vcube$4321');
    }
  };

  const handleScanQR = () => {
    setIsScanning(true);
    // Simulate QR scan after 2 seconds
    setTimeout(() => {
      setScannedStudent({
        id: 'STU005',
        name: 'Vikram Singh',
        course: 'DevOps with AI Tools',
        batch: 'Batch 15',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      setIsScanning(false);
    }, 2000);
  };

  if (!isLoggedIn) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ aspectRatio: '4/5' }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Shield className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-center mb-2">Admin Login</h1>
          <p className="text-blue-100 text-center text-sm">VCUBE QR Attendance System</p>
        </div>

        {/* Login Form */}
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail className="h-4 w-4 inline mr-2" />
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vcubemulticloud@gmail.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Shield className="h-4 w-4 inline mr-2" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Vcube$4321"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] shadow-lg"
          >
            Login
          </button>

          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-blue-800 font-semibold mb-1">Demo Credentials:</p>
            <p className="text-xs text-blue-700">Email: vcubemulticloud@gmail.com</p>
            <p className="text-xs text-blue-700">Password: Vcube$4321</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ aspectRatio: '4/5' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">QR Attendance Panel</h1>
            <p className="text-blue-100 text-xs">VCUBE Admin Dashboard</p>
          </div>
          <div className="bg-white/20 p-2 rounded-full">
            <QrCode className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* QR Scanner Section */}
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-800 mb-3 flex items-center">
            <Camera className="h-4 w-4 mr-2 text-blue-600" />
            QR Code Scanner for Attendance
          </h2>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-3">
            {!isScanning && !scannedStudent && (
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <QrCode className="h-8 w-8 text-blue-600" />
                </div>
                <button
                  onClick={handleScanQR}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Start QR Scan
                </button>
              </div>
            )}

            {isScanning && (
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center animate-pulse">
                  <Camera className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">Scanning QR Code...</p>
              </div>
            )}

            {scannedStudent && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm font-bold text-green-800">Attendance Marked</span>
                </div>
                <div className="space-y-1 text-xs">
                  <div><strong>Student ID:</strong> {scannedStudent.id}</div>
                  <div><strong>Name:</strong> {scannedStudent.name}</div>
                  <div><strong>Time:</strong> {scannedStudent.time}</div>
                  <div><strong>Status:</strong> <span className="text-green-600 font-semibold">Present</span></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Students Table */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-800 flex items-center">
              <Users className="h-4 w-4 mr-2 text-blue-600" />
              Student Records
            </h3>
            <div className="flex space-x-1">
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <Search className="h-4 w-4" />
              </button>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-2 py-2 text-left font-semibold text-gray-700">ID</th>
                    <th className="px-2 py-2 text-left font-semibold text-gray-700">Name</th>
                    <th className="px-2 py-2 text-left font-semibold text-gray-700">Contact</th>
                    <th className="px-2 py-2 text-left font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockStudents.map((student, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-2 py-2 font-medium text-gray-900">{student.id}</td>
                      <td className="px-2 py-2">
                        <div>
                          <div className="font-medium text-gray-900">{student.name}</div>
                          <div className="text-gray-500">{student.batch}</div>
                        </div>
                      </td>
                      <td className="px-2 py-2">
                        <div className="text-gray-600">{student.mobile}</div>
                        <div className="text-gray-500 truncate">{student.email}</div>
                      </td>
                      <td className="px-2 py-2">
                        <div className="flex items-center">
                          {student.status === 'Present' ? (
                            <>
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                              <span className="text-green-700 font-semibold">Present</span>
                            </>
                          ) : (
                            <>
                              <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                              <span className="text-red-700 font-semibold">Absent</span>
                            </>
                          )}
                        </div>
                        {student.time !== '-' && (
                          <div className="text-gray-500 flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {student.time}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Export Section */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2">
            <FileSpreadsheet className="h-5 w-5" />
            <span>Export Data to Excel</span>
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">
            Exports all student data with attendance records
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelMockup;