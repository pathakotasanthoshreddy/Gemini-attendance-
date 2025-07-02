import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute';
import PageTransitionWrapper from './components/PageTransitionWrapper';
import Header from './components/Header';

// Import all pages
import HomePage from './pages/HomePage';
import AdminLoginPage from './pages/AdminLoginPage';
import StudentLoginPage from './pages/StudentLoginPage';
import StudentRegistrationPage from './pages/StudentRegistrationPage';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import QRScannerPage from './pages/QRScannerPage';
import ManageStudentsPage from './pages/ManageStudentsPage';
import BatchManagementPage from './pages/BatchManagementPage';
import UploadMarksPage from './pages/UploadMarksPage';
import MonthlyReportsAdminPage from './pages/MonthlyReportsAdminPage';
import ViewAttendancePage from './pages/ViewAttendancePage';
import ViewMarksHistoryPage from './pages/ViewMarksHistoryPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import ResumeReviewPage from './pages/ResumeReviewPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route 
              path="/" 
              element={
                <PageTransitionWrapper transitionType="fadeIn">
                  <HomePage />
                </PageTransitionWrapper>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PageTransitionWrapper transitionType="slideLeft">
                  <StudentRegistrationPage />
                </PageTransitionWrapper>
              } 
            />
            <Route 
              path="/login-admin" 
              element={
                <PageTransitionWrapper transitionType="fadeIn">
                  <AdminLoginPage />
                </PageTransitionWrapper>
              } 
            />
            <Route 
              path="/login-student" 
              element={
                <PageTransitionWrapper transitionType="slideUp">
                  <StudentLoginPage />
                </PageTransitionWrapper>
              } 
            />

            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route 
                path="/dashboard-admin" 
                element={
                  <PageTransitionWrapper transitionType="crossFadeScale">
                    <AdminDashboard />
                  </PageTransitionWrapper>
                } 
              />
              <Route 
                path="/scanner" 
                element={
                  <PageTransitionWrapper transitionType="zoomIn">
                    <QRScannerPage />
                  </PageTransitionWrapper>
                } 
              />
              <Route 
                path="/manage-students" 
                element={
                  <PageTransitionWrapper transitionType="slideRight">
                    <ManageStudentsPage />
                  </PageTransitionWrapper>
                } 
              />
              <Route 
                path="/batches" 
                element={
                  <PageTransitionWrapper transitionType="slideRight">
                    <BatchManagementPage />
                  </PageTransitionWrapper>
                } 
              />
              <Route 
                path="/upload-marks" 
                element={
                  <PageTransitionWrapper transitionType="slideRight">
                    <UploadMarksPage />
                  </PageTransitionWrapper>
                } 
              />
              <Route 
                path="/monthly-reports" 
                element={
                  <PageTransitionWrapper transitionType="slideRight">
                    <MonthlyReportsAdminPage />
                  </PageTransitionWrapper>
                } 
              />
              <Route 
                path="/resume-review" 
                element={
                  <PageTransitionWrapper transitionType="slideRight">
                    <ResumeReviewPage />
                  </PageTransitionWrapper>
                } 
              />
            </Route>

            {/* Protected Student Routes */}
            <Route element={<ProtectedRoute allowedRoles={['student']} />}>
              <Route 
                path="/dashboard-student" 
                element={
                  <PageTransitionWrapper transitionType="crossFadeScale">
                    <StudentDashboard />
                  </PageTransitionWrapper>
                } 
              />
              <Route 
                path="/view-attendance" 
                element={
                  <PageTransitionWrapper transitionType="slideRight">
                    <ViewAttendancePage />
                  </PageTransitionWrapper>
                } 
              />
              <Route 
                path="/view-marks" 
                element={
                  <PageTransitionWrapper transitionType="slideRight">
                    <ViewMarksHistoryPage />
                  </PageTransitionWrapper>
                } 
              />
              <Route 
                path="/resume" 
                element={
                  <PageTransitionWrapper transitionType="slideLeft">
                    <ResumeBuilderPage />
                  </PageTransitionWrapper>
                } 
              />
            </Route>

            {/* Catch-all for undefined routes */}
            <Route 
              path="*" 
              element={
                <PageTransitionWrapper transitionType="fadeIn">
                  <NotFoundPage />
                </PageTransitionWrapper>
              } 
            />
          </Routes>
        </AnimatePresence>
        
        <Toaster 
          position="top-right" 
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
            },
          }}
        />
      </div>
    </AuthProvider>
  );
}

export default App;