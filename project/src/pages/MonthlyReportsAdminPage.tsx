import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Download, Calendar } from 'lucide-react';

const MonthlyReportsAdminPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-teal-50 to-cyan-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <BarChart3 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Monthly Reports & Analytics</h1>
          <p className="text-xl text-gray-600">Generate comprehensive statistical reports and insights</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 border-2 border-dashed border-teal-300 rounded-xl hover:border-teal-400 transition-colors"
            >
              <Calendar className="w-12 h-12 text-teal-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Monthly Reports</h3>
              <p className="text-gray-600">Generate detailed monthly performance reports</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 border-2 border-dashed border-cyan-300 rounded-xl hover:border-cyan-400 transition-colors"
            >
              <Download className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Export Data</h3>
              <p className="text-gray-600">Download reports in various formats (PDF, Excel)</p>
            </motion.div>
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Report Analytics</h3>
            <ul className="text-left space-y-2 text-gray-600">
              <li>• Attendance trends and patterns analysis</li>
              <li>• Academic performance statistics</li>
              <li>• Batch-wise comparison reports</li>
              <li>• Student progress tracking over time</li>
              <li>• Interactive charts and visualizations</li>
              <li>• Automated report generation and scheduling</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MonthlyReportsAdminPage;