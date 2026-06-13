import ClubDashboard from '@/components/admin/ClubDashboard';
import ProtectedRoute from '@/components/ProtectedRoute';
import React from 'react';

const page = () => {
  return (
    <ProtectedRoute allowedRoles={["admin","super_admin"]}>
      <ClubDashboard/>
    </ProtectedRoute>
  );
};

export default page;