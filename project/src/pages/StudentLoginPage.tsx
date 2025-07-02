import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import AnimatedButton from '../components/AnimatedButton';
import { motion } from 'framer-motion';
import { GraduationCap, Mail, Lock, Smartphone, Key } from 'lucide-react';
import toast from 'react-hot-toast';

const StudentLoginPage: React.FC = () => {
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(identifier, password, 'student');
      navigate('/dashboard-student');
    } catch (error) {
      // toast is handled by AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) {
      toast.error("Please enter your mobile number.");
      return;
    }
    setIsLoading(true);
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)),
      {
        loading: 'Sending OTP...',
        success: 'OTP sent to your mobile!',
        error: 'Failed to send OTP.',
      }
    ).then(() => {
      setOtpSent(true);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const handleOtpLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (identifier === '1234567890' && otp === '1234') {
        await login(identifier, otp, 'student');
        navigate('/dashboard-student');
      } else {
        toast.error("Invalid OTP or Mobile Number.");
      }
    } catch (error) {
      // toast is handled by AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 to-blue-500"></div>
        
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <GraduationCap className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Student Login</h2>
          <p className="text-gray-600">Access your student dashboard</p>
        </div>

        <div className="mb-6 flex rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => { setLoginMethod('password'); setOtpSent(false); }}
            className={`flex-1 px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
              loginMethod === 'password' 
                ? 'bg-white text-blue-600 shadow-md' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Mail className="w-4 h-4 inline mr-2" />
            Email/Password
          </button>
          <button
            onClick={() => { setLoginMethod('otp'); setOtpSent(false); }}
            className={`flex-1 px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
              loginMethod === 'otp' 
                ? 'bg-white text-blue-600 shadow-md' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Smartphone className="w-4 h-4 inline mr-2" />
            OTP Login
          </button>
        </div>

        {loginMethod === 'password' && (
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handlePasswordLogin}
            className="space-y-6"
          >
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="identifier-password">
                <Mail className="w-4 h-4 inline mr-2" />
                Email / Mobile Number
              </label>
              <input
                type="text"
                id="identifier-password"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Your email or mobile"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                <Lock className="w-4 h-4 inline mr-2" />
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <AnimatedButton
              type="submit"
              label="Login"
              isLoading={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-4 text-lg font-semibold"
            />
          </motion.form>
        )}

        {loginMethod === 'otp' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="mobile-otp">
                <Smartphone className="w-4 h-4 inline mr-2" />
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile-otp"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="e.g., 9876543210"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                disabled={otpSent}
              />
            </div>

            {!otpSent ? (
              <AnimatedButton
                onClick={handleSendOtp}
                label="Send OTP"
                isLoading={isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-4 text-lg font-semibold"
              />
            ) : (
              <>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="otp">
                    <Key className="w-4 h-4 inline mr-2" />
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter 4-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    required
                  />
                </div>
                <AnimatedButton
                  onClick={handleOtpLogin}
                  label="Verify OTP & Login"
                  isLoading={isLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 text-lg font-semibold"
                />
              </>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center space-y-2"
        >
          <p className="text-sm text-gray-600">
            Demo credentials: student / student
          </p>
          <p className="text-sm text-gray-600">
            New student? <Link to="/register" className="text-blue-600 hover:underline font-semibold">Register here</Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StudentLoginPage;