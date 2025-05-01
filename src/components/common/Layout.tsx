import React from 'react';
import { Home, Ticket, Users, Settings, LogOut, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (page: 'dashboard' | 'customers' | 'tickets' | 'profile' | 'settings') => void;
  currentPage: string;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavigate, currentPage, onLogout }) => {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar and Main Content */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 pt-5">
          <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pb-4 overflow-y-auto">
              <nav className="mt-5 flex-1 px-2 space-y-1">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className={`w-full text-left ${
                    currentPage === 'dashboard'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <Home className={`${
                    currentPage === 'dashboard' ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 h-5 w-5`} />
                  Dashboard
                </button>
                <button
                  onClick={() => onNavigate('tickets')}
                  className={`w-full text-left ${
                    currentPage === 'tickets'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <Ticket className={`${
                    currentPage === 'tickets' ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 h-5 w-5`} />
                  Tickets
                </button>
                <button
                  onClick={() => onNavigate('customers')}
                  className={`w-full text-left ${
                    currentPage === 'customers'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <Users className={`${
                    currentPage === 'customers' ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 h-5 w-5`} />
                  Customers
                </button>
                <button
                  onClick={() => onNavigate('profile')}
                  className={`w-full text-left ${
                    currentPage === 'profile'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <User className={`${
                    currentPage === 'profile' ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 h-5 w-5`} />
                  Profile
                </button>
                <button
                  onClick={() => onNavigate('settings')}
                  className={`w-full text-left ${
                    currentPage === 'settings'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <Settings className={`${
                    currentPage === 'settings' ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 h-5 w-5`} />
                  Settings
                </button>
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <button onClick={onLogout} className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div>
                    <img
                      className="inline-block h-9 w-9 rounded-full"
                      src="https://randomuser.me/api/portraits/men/1.jpg"
                      alt="User profile"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {userData.firstName} {userData.lastName}
                    </p>
                    <div className="flex items-center text-xs font-medium text-gray-500 group-hover:text-gray-700">
                      <LogOut className="mr-1 h-4 w-4" /> Sign out
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 md:pl-64">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;