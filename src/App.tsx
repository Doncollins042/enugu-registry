import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import EstateDetails from './components/EstateDetails';
import SurveyPlan from './components/SurveyPlan';
import PlotDetails from './components/PlotDetails';
import PaymentPage from './components/PaymentPage';
import Portfolio from './components/Portfolio';
import DocumentVerification from './components/DocumentVerification';
import GroundRent from './components/GroundRent';
import GovernorsConsent from './components/GovernorsConsent';
import AdminDashboard from './components/AdminDashboard';
import UserSettings from './components/UserSettings';
import AdvancedSearch from './components/AdvancedSearch';
import HelpCenter from './components/HelpCenter';
import Reports from './components/Reports';

function App() {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([
    { id: '1', type: 'system', title: 'Welcome!', message: 'Welcome to Enugu Land Registry', time: 'Just now', read: false },
  ]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  const handleLogin = (userData: any, userToken: string) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userToken);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
  };

  const handlePurchase = (property: any) => {
    setProperties([...properties, property]);
    const newNotification = {
      id: Date.now().toString(),
      type: 'payment',
      title: 'Property Purchased!',
      message: `You now own ${property.plotNumber}`,
      time: 'Just now',
      read: false,
    };
    setNotifications([newNotification, ...notifications]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const addNotification = (notification: any) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      time: 'Just now',
      read: false,
    };
    setNotifications([newNotification, ...notifications]);
  };

  const handleUpdateUser = (userData: any) => {
    setUser({ ...user, ...userData });
    localStorage.setItem('user', JSON.stringify({ ...user, ...userData }));
  };

  return (
    <Router>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: { background: '#1e3a8a', color: '#fff', padding: '12px 20px', borderRadius: '8px', fontSize: '14px' },
          success: { style: { background: '#059669' } },
          error: { style: { background: '#dc2626' } },
        }}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={user ? <Navigate to="/dashboard" /> : <AuthPage onLogin={handleLogin} />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} onLogout={handleLogout} notifications={notifications} onMarkRead={markNotificationAsRead} onMarkAllRead={markAllNotificationsAsRead} /> : <Navigate to="/auth" />} />
        <Route path="/estate/:name" element={<EstateDetails addNotification={addNotification} />} />
        <Route path="/survey/:name" element={<SurveyPlan />} />
        <Route path="/plot-details" element={<PlotDetails />} />
        <Route path="/payment" element={<PaymentPage onPurchase={handlePurchase} />} />
        <Route path="/portfolio" element={user ? <Portfolio properties={properties} /> : <Navigate to="/auth" />} />
        <Route path="/verify" element={<DocumentVerification addNotification={addNotification} />} />
        <Route path="/ground-rent" element={<GroundRent properties={properties} addNotification={addNotification} />} />
        <Route path="/governors-consent" element={<GovernorsConsent properties={properties} addNotification={addNotification} />} />
        <Route path="/settings" element={user ? <UserSettings user={user} onUpdateUser={handleUpdateUser} /> : <Navigate to="/auth" />} />
        <Route path="/search" element={<AdvancedSearch />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/reports" element={user ? <Reports properties={properties} /> : <Navigate to="/auth" />} />
        <Route path="/admin" element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;