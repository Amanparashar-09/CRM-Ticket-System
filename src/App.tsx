import { useState, useEffect } from "react";
import CustomerList from "./pages/CustomerList";
import CustomerDetail from "./pages/CustomerDetail";
import TicketList from "./pages/TicketList";
import TicketDetail from "./pages/TicketDetail";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import React from 'react';
import Layout from "./components/common/Layout";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

type Page = 'dashboard' | 'customers' | 'tickets' | 'profile' | 'settings' | 'signup' | 'login';
type CustomerView = 'list' | 'detail';
type TicketView = 'list' | 'detail';
type AuthState = 'authenticated' | 'unauthenticated';

function App() {
  const [authState, setAuthState] = useState<AuthState>('unauthenticated');
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [customerView, setCustomerView] = useState<CustomerView>('list');
  const [ticketView, setTicketView] = useState<TicketView>('list');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('userData');
    if (userData) {
      setAuthState('authenticated');
      setCurrentPage('dashboard');
    }
  }, []);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    if (page === 'customers') {
      setCustomerView('list');
      setSelectedCustomerId(null);
    }
    if (page === 'tickets') {
      setTicketView('list');
      setSelectedTicketId(null);
    }
  };

  const handleSignupComplete = () => {
    setAuthState('authenticated');
    setCurrentPage('dashboard');
  };

  const handleLoginComplete = () => {
    setAuthState('authenticated');
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setAuthState('unauthenticated');
    setCurrentPage('login');
  };

  const renderAuthPages = () => {
    switch (currentPage) {
      case 'login':
        return <Login onLoginComplete={handleLoginComplete} onSignupClick={() => setCurrentPage('signup')} />;
      case 'signup':
        return <Signup onSignupComplete={handleSignupComplete} />;
      default:
        return <Login onLoginComplete={handleLoginComplete} onSignupClick={() => setCurrentPage('signup')} />;
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'customers':
        if (customerView === 'list') {
          return <CustomerList onSelectCustomer={(id) => {
            setSelectedCustomerId(id);
            setCustomerView('detail');
          }} />;
        } else {
          return <CustomerDetail
            customerId={selectedCustomerId!}
            onBack={() => {
              setCustomerView('list');
              setSelectedCustomerId(null);
            }}
          />;
        }
      case 'tickets':
        if (ticketView === 'list') {
          return <TicketList onSelectTicket={(id) => {
            setSelectedTicketId(id);
            setTicketView('detail');
          }} />;
        } else {
          return <TicketDetail
            ticketId={selectedTicketId!}
            onBack={() => {
              setTicketView('list');
              setSelectedTicketId(null);
            }}
          />;
        }
      case 'profile':
        return <Profile />;
      case 'settings':
        return <div>Settings Page</div>;
      default:
        return <Dashboard />;
    }
  };

  if (authState === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gray-50">
        {renderAuthPages()}
        <Toaster position="top-right" />
      </div>
    );
  }

  return (
    <Layout onNavigate={handleNavigate} currentPage={currentPage} onLogout={handleLogout}>
      {renderPage()}
      <Toaster position="top-right" />
    </Layout>
  );
}

export default App;
