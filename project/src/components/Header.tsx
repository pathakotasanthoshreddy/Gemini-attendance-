import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import AnimatedButton from './AnimatedButton';
import { GraduationCap } from 'lucide-react';

const Header: React.FC = () => {
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleScannerClick = () => {
    if (isAdmin) {
      navigate('/scanner');
    } else {
      alert("Scanner is for Admin only. Please log in as Admin.");
      navigate('/login-admin');
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-800 to-blue-900 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold flex items-center space-x-2 hover:text-blue-200 transition">
          <GraduationCap className="w-8 h-8" />
          <span>VCube Portal</span>
        </Link>
        <nav className="flex space-x-6 items-center">
          {!isLoggedIn ? (
            <>
              <Link to="/register" className="hover:text-blue-200 transition font-medium">Register</Link>
              <button 
                onClick={handleScannerClick} 
                className="hover:text-blue-200 transition font-medium"
              >
                Scanner
              </button>
              <Link to="/login-admin" className="hover:text-blue-200 transition font-medium">Admin Login</Link>
              <Link to="/login-student" className="hover:text-blue-200 transition font-medium">Student Login</Link>
            </>
          ) : (
            <>
              {isAdmin && (
                <Link to="/dashboard-admin" className="hover:text-blue-200 transition font-medium">
                  Admin Dashboard
                </Link>
              )}
              {!isAdmin && (
                <Link to="/dashboard-student" className="hover:text-blue-200 transition font-medium">
                  Student Dashboard
                </Link>
              )}
              <AnimatedButton
                onClick={logout}
                label="Logout"
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2"
                animationType="default"
              />
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;