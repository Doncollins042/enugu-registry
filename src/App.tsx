import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Auth & Layout
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

// Main Features
import PropertySearch from './components/PropertySearch';
import PropertyDetails from './components/PropertyDetails';
import EstateDetails from './components/EstateDetails';
import Payment from './components/Payment';
import LandPaymentSummary from './components/LandPaymentSummary';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Notifications from './components/Notifications';

// Government Services
import GovernmentServices from './components/GovernmentServices';
import TitleVerification from './components/TitleVerification';
import DocumentAuthentication from './components/DocumentAuthentication';
import SurveyRequest from './components/SurveyRequest';
import TaxCalculator from './components/TaxCalculator';
import DisputeResolution from './components/DisputeResolution';
import NameSearch from './components/NameSearch';

// Additional Pages
import MyProperties from './components/MyProperties';
import Transactions from './components/Transactions';
import Support from './components/Support';
import FAQ from './components/FAQ';

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
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/search" element={
            <ProtectedRoute>
              <PropertySearch />
            </ProtectedRoute>
          } />
          
          <Route path="/property/:id" element={
            <ProtectedRoute>
              <PropertyDetails />
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
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          
          <Route path="/notifications" element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          } />
          
          {/* Government Services */}
          <Route path="/services" element={
            <ProtectedRoute>
              <GovernmentServices />
            </ProtectedRoute>
          } />
          
          <Route path="/services/title-verification" element={
            <ProtectedRoute>
              <TitleVerification />
            </ProtectedRoute>
          } />
          
          <Route path="/services/document-authentication" element={
            <ProtectedRoute>
              <DocumentAuthentication />
            </ProtectedRoute>
          } />
          
          <Route path="/services/survey-request" element={
            <ProtectedRoute>
              <SurveyRequest />
            </ProtectedRoute>
          } />
          
          <Route path="/services/tax-calculator" element={
            <ProtectedRoute>
              <TaxCalculator />
            </ProtectedRoute>
          } />
          
          <Route path="/services/dispute-resolution" element={
            <ProtectedRoute>
              <DisputeResolution />
            </ProtectedRoute>
          } />
          
          <Route path="/services/name-search" element={
            <ProtectedRoute>
              <NameSearch />
            </ProtectedRoute>
          } />
          
          {/* Additional Pages */}
          <Route path="/my-properties" element={
            <ProtectedRoute>
              <MyProperties />
            </ProtectedRoute>
          } />
          
          <Route path="/transactions" element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          } />
          
          <Route path="/support" element={
            <ProtectedRoute>
              <Support />
            </ProtectedRoute>
          } />
          
          <Route path="/faq" element={
            <ProtectedRoute>
              <FAQ />
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