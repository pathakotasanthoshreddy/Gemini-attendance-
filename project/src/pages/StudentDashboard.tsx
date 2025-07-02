import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedButton from '../components/AnimatedButton';
import Modal from '../components/Modal';
import { useAuth } from '../auth/AuthContext';
import QRCode from 'qrcode.react';
import { 
  QrCode, 
  CreditCard, 
  Calendar, 
  BarChart3, 
  Download, 
  FileText,
  Award,
  User
} from 'lucide-react';
import toast from 'react-hot-toast';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false);

  const studentData = {
    id: user?.id || 'STU_001',
    name: user?.name || 'Student User',
    email: 'student@vcube.edu',
    batch: '2025-A',
    course: 'Full Stack Development'
  };

  const handleDownloadIDCard = async () => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)),
      {
        loading: 'Generating ID Card...',
        success: 'ID Card downloaded!',
        error: 'Failed to download ID Card.',
      }
    );
  };

  const handleDownloadMonthlyReport = async () => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 2000)),
      {
        loading: 'Generating Monthly Report...',
        success: 'Monthly Report downloaded!',
        error: 'Failed to download Monthly Report.',
      }
    );
  };

  const dashboardItems = [
    {
      title: "My QR Code",
      description: "Show QR code for attendance",
      icon: QrCode,
      action: () => setIsQRCodeModalOpen(true),
      color: "from-indigo-500 to-purple-500",
      type: "button"
    },
    {
      title: "ID Card",
      description: "Download digital ID card",
      icon: CreditCard,
      action: handleDownloadIDCard,
      color: "from-purple-500 to-pink-500",
      type: "button"
    },
    {
      title: "Attendance",
      description: "View attendance records",
      icon: Calendar,
      link: "/view-attendance",
      color: "from-teal-500 to-cyan-500",
      type: "link"
    },
    {
      title: "Marks History",
      description: "View examination results",
      icon: BarChart3,
      link: "/view-marks",
      color: "from-rose-500 to-pink-500",
      type: "link"
    },
    {
      title: "Monthly Report",
      description: "Download progress report",
      icon: Download,
      action: handleDownloadMonthlyReport,
      color: "from-orange-500 to-red-500",
      type: "button"
    },
    {
      title: "Resume Builder",
      description: "Create professional resume",
      icon: FileText,
      link: "/resume",
      color: "from-green-500 to-emerald-500",
      type: "link"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Welcome Section */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
          >
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Welcome back, {studentData.name}!</h1>
                <div className="text-blue-100 space-y-1">
                  <p><span className="font-semibold">Student ID:</span> {studentData.id}</p>
                  <p><span className="font-semibold">Batch:</span> {studentData.batch}</p>
                  <p><span className="font-semibold">Course:</span> {studentData.course}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dashboard Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {dashboardItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              {item.type === "link" ? (
                <Link to={item.link || "#"} className="block h-full">
                  <div className={`
                    h-full p-8 rounded-2xl shadow-lg bg-gradient-to-br ${item.color} 
                    transition-all duration-300 transform group-hover:shadow-xl
                    hover:from-opacity-90 hover:to-opacity-90
                  `}>
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-4 bg-white bg-opacity-20 rounded-xl">
                        <item.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">{item.title}</h2>
                    <p className="text-white text-opacity-90 leading-relaxed">{item.description}</p>
                  </div>
                </Link>
              ) : (
                <button onClick={item.action} className="block h-full w-full text-left">
                  <div className={`
                    h-full p-8 rounded-2xl shadow-lg bg-gradient-to-br ${item.color} 
                    transition-all duration-300 transform group-hover:shadow-xl
                    hover:from-opacity-90 hover:to-opacity-90
                  `}>
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-4 bg-white bg-opacity-20 rounded-xl">
                        <item.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">{item.title}</h2>
                    <p className="text-white text-opacity-90 leading-relaxed">{item.description}</p>
                  </div>
                </button>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* QR Code Modal */}
      <Modal
        isOpen={isQRCodeModalOpen}
        onClose={() => setIsQRCodeModalOpen(false)}
        title="Your Attendance QR Code"
        size="sm"
      >
        <div className="flex flex-col items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="p-6 border-4 border-blue-500 rounded-2xl shadow-lg mb-6 bg-white"
          >
            <QRCode 
              value={studentData.id} 
              size={256} 
              level="H"
              className="rounded-lg"
            />
          </motion.div>
          <div className="text-center space-y-2">
            <p className="text-xl font-semibold text-gray-800">
              {studentData.name}
            </p>
            <p className="text-lg text-gray-600">
              Student ID: <span className="font-mono font-bold">{studentData.id}</span>
            </p>
            <p className="text-sm text-gray-500">
              Present this QR code to your instructor for attendance marking
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StudentDashboard;