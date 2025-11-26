import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoadingScreen from './components/LoadingScreen';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import EstateDetails from './components/EstateDetails';
import PlotDetails from './components/PlotDetails';
import PaymentPage from './components/PaymentPage';
import Portfolio from './components/Portfolio';
import DocumentVerification from './components/DocumentVerification';
import GovernorsConsent from './components/GovernorsConsent';
import GroundRent from './components/GroundRent';
import HelpCenter from './components/HelpCenter';
import AdvancedSearch from './components/AdvancedSearch';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (userData: any, authToken: string) => {
    setUser(userData);
    setToken(authToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={user ? <Navigate to="/dashboard" /> : <AuthPage onLogin={handleLogin} />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/auth" />} />
        <Route path="/admin" element={user ? <AdminDashboard /> : <Navigate to="/auth" />} />
        <Route path="/estate/:slug" element={<EstateDetails />} />
        <Route path="/plot/:id" element={<PlotDetails />} />
        <Route path="/payment" element={user ? <PaymentPage /> : <Navigate to="/auth" />} />
        <Route path="/portfolio" element={user ? <Portfolio /> : <Navigate to="/auth" />} />
        <Route path="/verify" element={<DocumentVerification />} />
        <Route path="/governors-consent" element={user ? <GovernorsConsent /> : <Navigate to="/auth" />} />
        <Route path="/ground-rent" element={user ? <GroundRent /> : <Navigate to="/auth" />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/search" element={<AdvancedSearch />} />
      </Routes>
    </Router>
  );
}

export default App;