'use client';

import AdminLayout from '@/components/Admin/AdminLayout/AdminLayout';
import AdminDashboard from '@/components/Admin/AdminDashboard/AdminDashboard';

const Admin = () => {
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
};

export default Admin;
