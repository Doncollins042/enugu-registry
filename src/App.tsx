import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Auth & Layout
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

// Main Features
import AdvancedSearch from './components/AdvancedSearch';
import EstateDetails from './components/EstateDetails';
import Payment from './components/Payment';
import LandPaymentSummary from './components/LandPaymentSummary';
import Settings from './components/Settings';
import UserSettings from './components/UserSettings';

// Government Services
import DocumentVerification from './components/DocumentVerification';
import DocumentUpload from './components/DocumentUpload';
import GovernorsConsent from './components/GovernorsConsent';
import GroundRent from './components/GroundRent';
import SurveyPlan from './components/SurveyPlan';

// Additional Pages
import Portfolio from './components/Portfolio';
import HelpCenter from './components/HelpCenter';
import Reports from './components/Reports';
import AdminDashboard from './components/AdminDashboard';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1e3a5f',
              color: '#fff',
              borderRadius: '12px',
              padding: '12px 20px',
            },
            success: {
              style: {
                background: '#059669',
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#059669',
              },
            },
            error: {
              style: {
                background: '#dc2626',
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#dc2626',
              },
            },
          }}
        />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<LandingPage />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/search" element={
            <ProtectedRoute>
              <AdvancedSearch />
            </ProtectedRoute>
          } />
          
          <Route path="/estate/:slug" element={
            <ProtectedRoute>
              <EstateDetails />
            </ProtectedRoute>
          } />
          
          <Route path="/land-payment-summary" element={
            <ProtectedRoute>
              <LandPaymentSummary />
            </ProtectedRoute>
          } />
          
          <Route path="/payment" element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          
          <Route path="/user-settings" element={
            <ProtectedRoute>
              <UserSettings />
            </ProtectedRoute>
          } />
          
          {/* Government Services */}
          <Route path="/services/document-verification" element={
            <ProtectedRoute>
              <DocumentVerification />
            </ProtectedRoute>
          } />
          
          <Route path="/services/document-upload" element={
            <ProtectedRoute>
              <DocumentUpload />
            </ProtectedRoute>
          } />
          
          <Route path="/services/governors-consent" element={
            <ProtectedRoute>
              <GovernorsConsent />
            </ProtectedRoute>
          } />
          
          <Route path="/services/ground-rent" element={
            <ProtectedRoute>
              <GroundRent />
            </ProtectedRoute>
          } />
          
          <Route path="/services/survey-plan" element={
            <ProtectedRoute>
              <SurveyPlan />
            </ProtectedRoute>
          } />
          
          {/* Additional Pages */}
          <Route path="/portfolio" element={
            <ProtectedRoute>
              <Portfolio />
            </ProtectedRoute>
          } />
          
          <Route path="/my-properties" element={
            <ProtectedRoute>
              <Portfolio />
            </ProtectedRoute>
          } />
          
          <Route path="/help" element={
            <ProtectedRoute>
              <HelpCenter />
            </ProtectedRoute>
          } />
          
          <Route path="/support" element={
            <ProtectedRoute>
              <HelpCenter />
            </ProtectedRoute>
          } />
          
          <Route path="/reports" element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          } />
          
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          {/* Catch all - redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;