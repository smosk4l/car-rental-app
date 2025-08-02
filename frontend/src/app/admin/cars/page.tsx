'use client';

import AdminLayout from '@/components/Admin/AdminLayout/AdminLayout';
import CarsView from '@/components/Admin/CarsView/CarsView';

const AdminCars = () => {
  return (
    <AdminLayout>
      <CarsView />
    </AdminLayout>
  );
};

export default AdminCars;
