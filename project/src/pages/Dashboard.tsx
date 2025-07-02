import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Calendar, TrendingUp, Download, Clock, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { getDashboardData, exportStudents, exportAttendance } from '../api/admin';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [exportLoading, setExportLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      if (token) {
        const data = await getDashboardData(token);
        setDashboardData(data);
      }
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportStudents = async () => {
    setExportLoading(true);
    try {
      if (token) {
        const blob = await exportStudents(token);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'students.csv';
        link.click();
        window.URL.revokeObjectURL(url);
        toast.success('Students exported successfully!');
      }
    } catch (error) {
      toast.error('Failed to export students');
    } finally {
      setExportLoading(false);
    }
  };

  const handleExportAttendance = async () => {
    setExportLoading(true);
    try {
      if (token) {
        const blob = await exportAttendance(undefined, undefined, token);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'attendance.csv';
        link.click();
        window.URL.revokeObjectURL(url);
        toast.success('Attendance exported successfully!');
      }
    } catch (error) {
      toast.error('Failed to export attendance');
    } finally {
      setExportLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6 mt-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      name: 'Total Students',
      value: dashboardData?.totalStudents || 0,
      icon: Users,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      name: 'Today\'s Attendance',
      value: dashboardData?.todayAttendance || 0,
      icon: Calendar,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      name: 'Present Today',
      value: dashboardData?.presentToday || 0,
      icon: CheckCircle,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    {
      name: 'Attendance Rate',
      value: `${dashboardData?.attendanceRate || 0}%`,
      icon: TrendingUp,
      color: 'bg-orange-500',
      textColor: 'text-orange-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 mt-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of your attendance management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Attendance */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Attendance</h2>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {dashboardData?.recentAttendance?.length > 0 ? (
              dashboardData.recentAttendance.map((record: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      {record.studentId?.firstName} {record.studentId?.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{record.studentId?.course}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {format(new Date(record.timeIn), 'HH:mm')}
                    </p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      record.status === 'present' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {record.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No recent attendance records</p>
            )}
          </div>
        </div>

        {/* Attendance Trend */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">7-Day Attendance Trend</h2>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-3">
            {dashboardData?.attendanceTrend?.map((day: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {format(new Date(day.date), 'MMM dd')}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${dashboardData.totalStudents > 0 ? (day.count / dashboardData.totalStudents) * 100 : 0}%` 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8">
                    {day.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Section */}
      <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Export Data</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleExportStudents}
            disabled={exportLoading}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            <span>Export Students</span>
          </button>
          <button
            onClick={handleExportAttendance}
            disabled={exportLoading}
            className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            <span>Export Attendance</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;