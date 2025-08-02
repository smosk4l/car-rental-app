'use client';

import AdminLayout from '@/components/Admin/AdminLayout/AdminLayout';
import UsersView from '@/components/Admin/UsersView/UsersView';

const AdminUsers = () => {
  return (
    <AdminLayout>
      <UsersView />
    </AdminLayout>
  );
};

export default AdminUsers;
