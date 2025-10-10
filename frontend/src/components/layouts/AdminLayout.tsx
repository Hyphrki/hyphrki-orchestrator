import React from 'react';
import { AdminNav } from '../navigation/AdminNav';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin Navigation */}
      <AdminNav />
      
      {/* Main Content */}
      <div className="ml-64"> {/* Adjust margin based on sidebar width */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
