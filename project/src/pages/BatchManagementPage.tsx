import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Plus, Calendar } from 'lucide-react';

const BatchManagementPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-indigo-50 to-purple-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Batch Management</h1>
          <p className="text-xl text-gray-600">Create and organize student batches efficiently</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 border-2 border-dashed border-indigo-300 rounded-xl hover:border-indigo-400 transition-colors"
            >
              <Plus className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Create New Batch</h3>
              <p className="text-gray-600">Set up new batches with course details, schedules, and capacity</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 border-2 border-dashed border-purple-300 rounded-xl hover:border-purple-400 transition-colors"
            >
              <Calendar className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Manage Schedules</h3>
              <p className="text-gray-600">Organize batch timings, instructors, and classroom assignments</p>
            </motion.div>
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Batch Management Features</h3>
            <ul className="text-left space-y-2 text-gray-600">
              <li>• Create batches with custom naming conventions</li>
              <li>• Assign courses and curriculum to batches</li>
              <li>• Set batch capacity and enrollment limits</li>
              <li>• Schedule class timings and instructor assignments</li>
              <li>• Move students between batches</li>
              <li>• Generate batch-wise reports and analytics</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BatchManagementPage;