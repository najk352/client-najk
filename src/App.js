import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import HomePage from './pages/HomePage.js';
import JobsPage from './pages/JobsPage.js';
import JobDetailPage from './pages/JobDetailPage.js';
import ApplicationWizard from './forms/ApplicationWizard.js';
import TrackApplicationPage from './pages/TrackApplicationPage.js';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import AboutPage from './pages/AboutPage.js';
import PartnersPage from './pages/PartnersPage.js';
import ServicesPage from './pages/ServicesPage.js';
import ContactUsPage from './pages/ContactUsPage.js';
import AdminDashboardPage from './pages/AdminDashboardPage.js';
import AdminJobsPage from './pages/AdminJobsPage.js';
import AdminApplicationsPage from './pages/AdminApplicationsPage.js';
import AdminContactMessagesPage from './pages/AdminContactMessagesPage.js'; // <--- NEW IMPORT
import { useAuth } from './context/AuthContext.js';
import './App.css';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Global loading spinner for route transitions
function RouteLoader() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500); // Simulate loading
    return () => clearTimeout(timer);
  }, [location]);
  return loading ? (
    <div className="route-loader">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : null;
}

function App() {
  const { user } = useAuth();

  const AdminRoute = ({ children }) => {
    return user && user.role === 'admin' ? children : <Navigate to="/login" replace />;
  };

  const JobSeekerRoute = ({ children }) => {
    return user && user.role === 'job_seeker' ? children : <Navigate to="/login" replace />;
  };

  const PublicRoute = ({ children }) => {
    return children;
  };

  return (
    <Router>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>} />
          <Route path="/about" element={<PublicRoute><AboutPage /></PublicRoute>} />
          <Route path="/partners" element={<PublicRoute><PartnersPage /></PublicRoute>} />
          <Route path="/jobs" element={<PublicRoute><JobsPage /></PublicRoute>} />
          <Route path="/jobs/:id" element={<PublicRoute><JobDetailPage /></PublicRoute>} />
          <Route path="/services" element={<PublicRoute><ServicesPage /></PublicRoute>} />
          <Route path="/contact" element={<PublicRoute><ContactUsPage /></PublicRoute>} />
          
          <Route path="/apply/:jobId?" element={<JobSeekerRoute><ApplicationWizard /></JobSeekerRoute>} />
          <Route path="/track-application" element={<JobSeekerRoute><TrackApplicationPage /></JobSeekerRoute>} />

          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
          <Route path="/admin/jobs" element={<AdminRoute><AdminJobsPage /></AdminRoute>} />
          <Route path="/admin/applications" element={<AdminRoute><AdminApplicationsPage /></AdminRoute>} />
          <Route path="/admin/contact-messages" element={<AdminRoute><AdminContactMessagesPage /></AdminRoute>} /> {/* <--- NEW ROUTE */}

          {/* Fallback for unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <RouteLoader />
      </main>
      <Footer />
    </Router>
  );
}

export default App;