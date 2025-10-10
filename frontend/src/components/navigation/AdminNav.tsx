import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bot,
  Store,
  BarChart3,
  Settings,
  LogOut,
  Shield,
  Home,
  Users,
  Activity,
} from 'lucide-react';

export const AdminNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: Home,
      isActive: location.pathname === '/admin',
    },
    {
      title: 'Active Users',
      href: '/admin/users/active',
      icon: Activity,
      isActive: location.pathname.startsWith('/admin/users/active') || location.pathname.match(/^\/admin\/users\/[a-f0-9-]+$/),
    },
    {
      title: 'User Management',
      href: '/admin/users',
      icon: Users,
      isActive: location.pathname === '/admin/users',
    },
    {
      title: 'Agents',
      href: '/admin/agents',
      icon: Bot,
      isActive: location.pathname.startsWith('/admin/agents'),
    },
    {
      title: 'Marketplace',
      href: '/admin/marketplace',
      icon: Store,
      isActive: location.pathname.startsWith('/admin/marketplace'),
    },
    {
      title: 'Analytics',
      href: '/admin/analytics',
      icon: BarChart3,
      isActive: location.pathname.startsWith('/admin/analytics'),
    },
    {
      title: 'Settings',
      href: '/admin/settings',
      icon: Settings,
      isActive: location.pathname.startsWith('/admin/settings'),
    },
  ];

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout clicked');
  };

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Admin Portal
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title}>
                <Link
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    item.isActive
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};
