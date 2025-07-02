import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProtectedRouteProps {
  allowedRoles?: ('admin' | 'student')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isLoggedIn, isAdmin, isStudent, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-4"
          >
            <Loader2 className="w-full h-full text-blue-600" />
          </motion.div>
          <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
          <p className="text-gray-500 mt-2">Please wait while we verify your access</p>
        </motion.div>
      </div>
    );
  }

  if (!isLoggedIn) {
    toast.error("Please log in to access this page.");
    return <Navigate to="/login-student" replace />;
  }

  if (allowedRoles && !allowedRoles.some(role => (role === 'admin' && isAdmin) || (role === 'student' && isStudent))) {
    toast.error("You do not have permission to access this page.");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;