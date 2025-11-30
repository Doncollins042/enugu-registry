import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Components
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdvancedSearch from './components/AdvancedSearch';
import EstateDetails from './components/EstateDetails';
import LandPaymentSummary from './components/LandPaymentSummary';
import Payment from './components/Payment';
import Settings from './components/Settings';
import UserSettings from './components/UserSettings';
import Portfolio from './components/Portfolio';
import HelpCenter from './components/HelpCenter';
import Reports from './components/Reports';
import AdminDashboard from './components/AdminDashboard';
import DocumentVerification from './components/DocumentVerification';
import DocumentUpload from './components/DocumentUpload';
import GovernorsConsent from './components/GovernorsConsent';
import GroundRent from './components/GroundRent';
import SurveyPlan from './components/SurveyPlan';
import LandingPage from './components/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import FloatingSupport from './components/FloatingSupport';

function App() {
  return (
    <BrowserRouter>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#0a2540',
            color: '#fff',
            borderRadius: '12px',
            padding: '12px 16px',
          },
          success: {
            iconTheme: {
              primary: '#0d6e5d',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
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

        {/* Government Services Routes */}
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

        {/* Catch all - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      {/* Floating Support Button - appears on all pages */}
      <FloatingSupport />
    </BrowserRouter>
  );
}

export default App;