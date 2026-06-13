import ManageEventsPage from '@/components/admin/ManageEvents';
import ProtectedRoute from '@/components/ProtectedRoute';
import React from 'react';

const page = () => {
  return (
    <ProtectedRoute allowedRoles={["admin","super_admin"]}>
      <ManageEventsPage/>
    </ProtectedRoute>
  );
};

export default page;