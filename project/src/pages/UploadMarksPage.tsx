import React from 'react';
import { motion } from 'framer-motion';
import { Upload, FileSpreadsheet, Award } from 'lucide-react';

const UploadMarksPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-yellow-50 to-orange-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Upload Student Marks</h1>
          <p className="text-xl text-gray-600">Upload and manage student examination marks by batch and exam type</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 border-2 border-dashed border-yellow-300 rounded-xl hover:border-yellow-400 transition-colors"
            >
              <Upload className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Single Entry</h3>
              <p className="text-gray-600">Manually enter marks for individual students</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 border-2 border-dashed border-orange-300 rounded-xl hover:border-orange-400 transition-colors"
            >
              <FileSpreadsheet className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Bulk Upload</h3>
              <p className="text-gray-600">Upload marks using Excel/CSV templates</p>
            </motion.div>
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Features</h3>
            <ul className="text-left space-y-2 text-gray-600">
              <li>• Support for multiple exam types (Assignments, Tests, Finals)</li>
              <li>• Batch-wise mark uploading and filtering</li>
              <li>• Excel template download for bulk uploads</li>
              <li>• Data validation and error checking</li>
              <li>• Mark history tracking and updates</li>
              <li>• Automatic grade calculation and statistics</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UploadMarksPage;