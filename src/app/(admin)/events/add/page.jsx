import AddEventPage from "@/components/admin/AddEvent";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";

const page = () => {
  return (
    <ProtectedRoute allowedRoles={["admin","super_admin"]}>
      <AddEventPage />
    </ProtectedRoute>
  );
};

export default page;
