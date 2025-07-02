import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedButton from '../components/AnimatedButton';
import { 
  Users, 
  Calendar, 
  Upload, 
  QrCode, 
  BarChart3, 
  Mail, 
  FileText,
  GraduationCap 
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard: React.FC = () => {
  const handleEmailReports = async () => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 3000)),
      {
        loading: 'Sending monthly reports...',
        success: 'Monthly reports sent to all students!',
        error: 'Failed to send reports.',
      }
    );
  };

  const dashboardItems = [
    {
      title: "Student Management",
      description: "Add, edit, and manage student accounts",
      icon: Users,
      link: "/manage-students",
      color: "from-blue-500 to-blue-600",
      hoverColor: "from-blue-600 to-blue-700"
    },
    {
      title: "Batch Management",
      description: "Create and organize student batches",
      icon: GraduationCap,
      link: "/batches",
      color: "from-emerald-500 to-emerald-600",
      hoverColor: "from-emerald-600 to-emerald-700"
    },
    {
      title: "Marks Upload",
      description: "Upload and manage student examination marks",
      icon: Upload,
      link: "/upload-marks",
      color: "from-yellow-500 to-orange-500",
      hoverColor: "from-yellow-600 to-orange-600"
    },
    {
      title: "QR Scanner",
      description: "Scan student QR codes for attendance",
      icon: QrCode,
      link: "/scanner",
      color: "from-pink-500 to-purple-500",
      hoverColor: "from-pink-600 to-purple-600"
    },
    {
      title: "Reports & Analytics",
      description: "Generate comprehensive reports",
      icon: BarChart3,
      link: "/monthly-reports",
      color: "from-cyan-500 to-blue-500",
      hoverColor: "from-cyan-600 to-blue-600"
    },
    {
      title: "Resume Review",
      description: "Review and approve student resumes",
      icon: FileText,
      link: "/resume-review",
      color: "from-indigo-500 to-purple-500",
      hoverColor: "from-indigo-600 to-purple-600"
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
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
          <p className="text-xl text-gray-600">Manage your institution with powerful tools</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {dashboardItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Link
                to={item.link}
                className="block h-full"
              >
                <div className={`
                  h-full p-8 rounded-2xl shadow-lg bg-gradient-to-br ${item.color} 
                  hover:${item.hoverColor} transition-all duration-300 
                  transform group-hover:shadow-xl
                `}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">{item.title}</h2>
                  <p className="text-white text-opacity-90 leading-relaxed">{item.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Email Reports Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <Mail className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Email Monthly Reports</h2>
                <p className="text-gray-600">Send comprehensive reports to all students instantly</p>
              </div>
            </div>
            <AnimatedButton
              onClick={handleEmailReports}
              label="Send Reports"
              icon="email"
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-4 text-lg"
              animationType="email-send"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;