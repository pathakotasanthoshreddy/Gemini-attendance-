import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Upload } from 'lucide-react';

const ManageStudentsPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-green-50 to-emerald-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Student Management</h1>
          <p className="text-xl text-gray-600">Add, view, edit, and manage student accounts</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 border-2 border-dashed border-green-300 rounded-xl hover:border-green-400 transition-colors"
            >
              <UserPlus className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Add Single Student</h3>
              <p className="text-gray-600">Manually add individual student profiles with complete details</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 border-2 border-dashed border-blue-300 rounded-xl hover:border-blue-400 transition-colors"
            >
              <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Bulk Upload</h3>
              <p className="text-gray-600">Upload multiple students using Excel/CSV files</p>
            </motion.div>
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Coming Soon</h3>
            <ul className="text-left space-y-2 text-gray-600">
              <li>• Student search and filtering capabilities</li>
              <li>• Batch assignment and management</li>
              <li>• Student profile editing and updates</li>
              <li>• Export student data and reports</li>
              <li>• Student account activation/deactivation</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageStudentsPage;