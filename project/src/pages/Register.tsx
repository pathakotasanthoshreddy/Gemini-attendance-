import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserPlus, Download, Mail, Phone, User, BookOpen, Calendar, Users, QrCode } from 'lucide-react';
import toast from 'react-hot-toast';
import { registerStudent } from '../api/students';

interface RegisterFormData {
  fullName: string;
  mobileNumber: string;
  studentOrProfessional: string;
  howDidYouHear: string;
  attendingOffline: string;
  vcubeStudent: string;
  courseBatch: string;
  technicalCourse: string;
  courseDetails: string;
  aiToolsKnowledge: string;
  email: string;
}

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [registeredStudent, setRegisteredStudent] = useState<any>(null);
  
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<RegisterFormData>();

  const vcubeStudentValue = watch('vcubeStudent');
  const technicalCourseValue = watch('technicalCourse');

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      console.log('Form data submitted:', data);

      // Transform the data to match the backend expectations
      const studentData = {
        firstName: data.fullName.split(' ')[0] || data.fullName,
        lastName: data.fullName.split(' ').slice(1).join(' ') || 'Workshop',
        email: data.email,
        phoneNumber: data.mobileNumber,
        course: 'DevOps with AI Tools Workshop',
        year: 1,
        section: 'A',
        // Store additional workshop-specific data
        workshopData: {
          studentOrProfessional: data.studentOrProfessional,
          howDidYouHear: data.howDidYouHear,
          attendingOffline: data.attendingOffline,
          vcubeStudent: data.vcubeStudent,
          courseBatch: data.courseBatch,
          technicalCourse: data.technicalCourse,
          courseDetails: data.courseDetails,
          aiToolsKnowledge: data.aiToolsKnowledge
        }
      };

      console.log('Sending student data to API:', studentData);

      const response = await registerStudent(studentData);
      console.log('Registration response:', response);
      
      setRegisteredStudent(response.student);
      toast.success('Registration successful! Welcome to the workshop!');
      reset();
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Registration failed';
      toast.error(errorMessage);
      
      // Show more detailed error information
      if (error.response?.data?.details) {
        console.error('Error details:', error.response.data.details);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const downloadQRCode = () => {
    if (registeredStudent?.qrCode) {
      const link = document.createElement('a');
      link.href = registeredStudent.qrCode;
      link.download = `${registeredStudent.studentId}-workshop-qr-code.png`;
      link.click();
    }
  };

  if (registeredStudent) {
    return (
      <div className="max-w-2xl mx-auto p-6 mt-8">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <QrCode className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
          <p className="text-gray-600 mb-6">
            Welcome {registeredStudent.fullName}! You're registered for the DevOps with AI Tools Workshop.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Your participant ID: {registeredStudent.studentId}
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <img 
              src={registeredStudent.qrCode} 
              alt="Workshop QR Code" 
              className="w-48 h-48 mx-auto mb-4"
            />
            <p className="text-sm text-gray-600 mb-4">
              This is your unique QR code for workshop attendance. Save it to your device and bring it on the workshop day.
            </p>
            <button
              onClick={downloadQRCode}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
            >
              <Download className="h-4 w-4" />
              <span>Download QR Code</span>
            </button>
          </div>

          <div className="text-left bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Workshop Details:</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <div>📅 Date: 05th July, 2025 (Saturday)</div>
              <div>📍 Mode: Offline Only</div>
              <div>👨‍🏫 Trainer: Mr. Krishna Reddy</div>
              <div>💰 Fee: 100% Free</div>
              <div>📧 Email: {registeredStudent.email}</div>
            </div>
          </div>

          <button
            onClick={() => setRegisteredStudent(null)}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Register Another Participant
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Register and Get QR Code</h1>
          <p className="text-gray-600">
            Register for the DevOps with AI Tools Workshop and get your attendance QR code
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4 inline mr-1" />
              Full Name
            </label>
            <input
              type="text"
              {...register('fullName', { required: 'Full name is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="h-4 w-4 inline mr-1" />
              Mobile Number (Active WhatsApp Num)
            </label>
            <input
              type="tel"
              {...register('mobileNumber', { required: 'Mobile number is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your WhatsApp number"
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.mobileNumber.message}</p>
            )}
          </div>

          {/* Student or Professional */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Are you a student or working professional?
            </label>
            <select
              {...register('studentOrProfessional', { required: 'This field is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select option</option>
              <option value="Student">Student</option>
              <option value="Working Professional">Working Professional</option>
              <option value="Fresher">Fresher</option>
              <option value="Job Seeker">Job Seeker</option>
            </select>
            {errors.studentOrProfessional && (
              <p className="text-red-500 text-sm mt-1">{errors.studentOrProfessional.message}</p>
            )}
          </div>

          {/* How did you hear */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How did you hear about this workshop?
            </label>
            <select
              {...register('howDidYouHear', { required: 'This field is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select option</option>
              <option value="Social Media">Social Media</option>
              <option value="Friends/Colleagues">Friends/Colleagues</option>
              <option value="VCube Website">VCube Website</option>
              <option value="Email">Email</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="College/University">College/University</option>
              <option value="Other">Other</option>
            </select>
            {errors.howDidYouHear && (
              <p className="text-red-500 text-sm mt-1">{errors.howDidYouHear.message}</p>
            )}
          </div>

          {/* Attending Offline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Will you be attending the session on Saturday In Offline Mode?
            </label>
            <select
              {...register('attendingOffline', { required: 'This field is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select option</option>
              <option value="Yes, I will attend offline">Yes, I will attend offline</option>
              <option value="No, I cannot attend offline">No, I cannot attend offline</option>
              <option value="Maybe, depends on circumstances">Maybe, depends on circumstances</option>
            </select>
            {errors.attendingOffline && (
              <p className="text-red-500 text-sm mt-1">{errors.attendingOffline.message}</p>
            )}
          </div>

          {/* VCube Student */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Are you a Student of VCUBE?
            </label>
            <select
              {...register('vcubeStudent', { required: 'This field is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.vcubeStudent && (
              <p className="text-red-500 text-sm mt-1">{errors.vcubeStudent.message}</p>
            )}
          </div>

          {/* Course and Batch (conditional) - Shows when VCube student is Yes */}
          {vcubeStudentValue === 'Yes' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <BookOpen className="h-4 w-4 inline mr-1" />
                Course & batch num
              </label>
              <input
                type="text"
                {...register('courseBatch')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., DevOps - Batch 15"
              />
            </div>
          )}

          {/* Technical Course Outside */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Have you taken any technical course outside of college?
            </label>
            <select
              {...register('technicalCourse', { required: 'This field is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.technicalCourse && (
              <p className="text-red-500 text-sm mt-1">{errors.technicalCourse.message}</p>
            )}
          </div>

          {/* Course Details (conditional) */}
          {technicalCourseValue === 'Yes' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                If yes, where did you take it and which course was it?
              </label>
              <textarea
                {...register('courseDetails')}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Completed AWS DevOps course from XYZ Institute"
              />
            </div>
          )}

          {/* AI Tools Knowledge */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Are you aware of any AI tools used in Multicloud DevOps? Mention Some of the tools.
            </label>
            <textarea
              {...register('aiToolsKnowledge', { required: 'This field is required' })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., GitHub Copilot, Azure AI, AWS CodeWhisperer, etc. (or write 'No' if not aware)"
            />
            {errors.aiToolsKnowledge && (
              <p className="text-red-500 text-sm mt-1">{errors.aiToolsKnowledge.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="h-4 w-4 inline mr-1" />
              Mail ID
            </label>
            <input
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Registering...</span>
              </>
            ) : (
              <>
                <UserPlus className="h-5 w-5" />
                <span>Register Student</span>
              </>
            )}
          </button>
        </form>

        {/* Workshop Info */}
        <div className="mt-8 bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Workshop Information:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>📅 <strong>Date:</strong> 05th July, 2025 (Saturday)</li>
            <li>📍 <strong>Mode:</strong> Offline Only</li>
            <li>👨‍🏫 <strong>Trainer:</strong> Mr. Krishna Reddy (Multi-Cloud & DevSecOps)</li>
            <li>💰 <strong>Fee:</strong> 100% Free</li>
            <li>🎯 <strong>Topics:</strong> kubectl, GitHub Copilot, Azure AI Foundry, Modern DevOps Tools</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Register;