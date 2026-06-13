import MembershipApplicationsPage from '@/components/admin/MembershipApplicationsPage';
import ProtectedRoute from '@/components/ProtectedRoute';
import React from 'react';

const page = () => {
  return (
    <ProtectedRoute  allowedRoles={["admin", "super_admin"]}>
      <MembershipApplicationsPage/>
    </ProtectedRoute>
  );
};

export default page;