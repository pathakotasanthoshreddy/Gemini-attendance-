import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Eye, CheckCircle } from 'lucide-react';

const ResumeReviewPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-orange-50 to-red-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Resume Review Center</h1>
          <p className="text-xl text-gray-600">Review and approve student resumes for quality assurance</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 border-2 border-dashed border-orange-300 rounded-xl hover:border-orange-400 transition-colors"
            >
              <Eye className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Review Queue</h3>
              <p className="text-gray-600">View pending resumes awaiting approval</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 border-2 border-dashed border-red-300 rounded-xl hover:border-red-400 transition-colors"
            >
              <CheckCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Approval System</h3>
              <p className="text-gray-600">Approve, reject, or request modifications</p>
            </motion.div>
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Review Features</h3>
            <ul className="text-left space-y-2 text-gray-600">
              <li>• Filter resumes by batch, submission date, or status</li>
              <li>• Side-by-side comparison with job requirements</li>
              <li>• Comment system for feedback and suggestions</li>
              <li>• Quality scoring and improvement recommendations</li>
              <li>• Track revision history and changes</li>
              <li>• Bulk approval for multiple resumes</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResumeReviewPage;