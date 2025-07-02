import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, GraduationCap } from 'lucide-react';

const StudentRegistrationPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-xl p-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <UserPlus className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Student Registration</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Complete your profile to get started with VCube Portal and unlock all features!
          </p>
          
          <div className="space-y-4 text-left bg-blue-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-blue-800 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              What you'll get access to:
            </h3>
            <ul className="space-y-2 text-blue-700">
              <li>• Personal QR code for attendance tracking</li>
              <li>• Digital ID card and certificates</li>
              <li>• Professional resume builder with AI scoring</li>
              <li>• Real-time progress monitoring</li>
              <li>• Monthly performance reports</li>
            </ul>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
          >
            <p className="text-yellow-800 text-sm">
              <strong>Note:</strong> This registration form will be available once your basic information 
              has been uploaded by the admin. Please contact your institution for more details.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentRegistrationPage;