import React from 'react';
import AdminPanelMockup from '../components/AdminPanelMockup';

const AdminMockup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Admin Panel UI Mockup
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Student Registration & Attendance Tracking System
          </p>
          <p className="text-lg text-gray-500">
            Professional 4:5 Vertical Layout Design
          </p>
        </div>

        <div className="flex justify-center">
          <AdminPanelMockup />
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Design Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-600 mb-2">🔐 Section 1: Admin Login</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Professional gradient header with shield icon</li>
                <li>• Clean email and password fields</li>
                <li>• Password visibility toggle</li>
                <li>• Secure login button with hover effects</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-2">📱 Section 2: QR Scanner Panel</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Live QR code scanner interface</li>
                <li>• Real-time attendance marking</li>
                <li>• Student details display after scan</li>
                <li>• Comprehensive student data table</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-purple-600 mb-2">📊 Data Management</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Responsive table with all student info</li>
                <li>• Color-coded attendance status</li>
                <li>• Time stamps for attendance</li>
                <li>• Search and filter capabilities</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-2">📤 Section 3: Export Feature</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• One-click Excel export button</li>
                <li>• Exports complete attendance records</li>
                <li>• Professional styling with icons</li>
                <li>• Helpful tooltip information</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">🎨 Design Specifications:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>Layout:</strong> 4:5 Vertical aspect ratio (mobile-optimized)</li>
              <li>• <strong>Color Scheme:</strong> Professional blue/indigo gradients with clean whites</li>
              <li>• <strong>Typography:</strong> Modern font stack with proper hierarchy</li>
              <li>• <strong>Icons:</strong> Lucide React icons throughout</li>
              <li>• <strong>Interactions:</strong> Hover effects, smooth transitions, and micro-animations</li>
              <li>• <strong>Status Indicators:</strong> Green for present, red for absent with visual dots</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMockup;