'use client';

import { useParams } from 'next/navigation';
import EditCarForm from '@/components/Admin/EditCarForm/EditCarForm';
import AdminLayout from '@/components/Admin/AdminLayout/AdminLayout';

const EditCarPage = () => {
  const params = useParams();
  const carId = params.id as string;

  if (!carId) {
    return (
      <AdminLayout>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px',
          }}
        >
          <span>Invalid car ID</span>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <EditCarForm carId={carId} />
    </AdminLayout>
  );
};

export default EditCarPage;
