'use client';

import AdminLayout from '@/components/AdminLayout/AdminLayout';
import UsersView from '@/components/UsersView/UsersView';

const AdminUsers = () => {
  return (
    <AdminLayout>
      <UsersView />
    </AdminLayout>
  );
};

export default AdminUsers;
