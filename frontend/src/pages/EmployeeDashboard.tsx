import { useEffect, useState } from "react";
import { useEmployeeProfile } from "../hooks/useEmployeeProfile";
import Header from "../components/Header";
import ProfileCard from "../components/Employee/EmployeeProfileCard";
import EditProfileModal from "../components/Employee/EditProfileModal";
import Container from "../components/Container";

export default function EmployeeDashboard() {
  const { employee, loading, saveProfile, handleLogout } = useEmployeeProfile();

  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    document.title = "Employee Dashboard - User Management System";
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading your profile...
      </div>
    );

  if (!employee)
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        No employee found.
      </div>
    );

  const isProfileComplete =
    employee.phone && employee.address && employee.blood_group;

  return (
    <>
      <Header
        title="Employee Dashboard"
        subtitle="View and manage your personal profile details."
        onLogout={handleLogout}
      />
      <Container>
        <div className="py-2">
          <ProfileCard
            employee={employee}
            isProfileComplete={isProfileComplete}
            onEdit={() => setIsEditOpen(true)}
          />

          <EditProfileModal
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            initialValues={{
              phone: employee.phone || "",
              address: employee.address || "",
              blood_group: employee.blood_group || "",
            }}
            onSave={async (data: any) => {
              await saveProfile(data);
              setIsEditOpen(false);
            }}
          />
        </div>
      </Container>
    </>
  );
}
