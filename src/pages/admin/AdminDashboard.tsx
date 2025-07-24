import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="py-16">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-700">
        Welcome, Admin! You can manage students, view reports, and control the system here.
      </p>
    </div>
  );
};

export default AdminDashboard;
