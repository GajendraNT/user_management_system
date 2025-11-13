import { useState } from "react";
import { useEmployees } from "../hooks/useEmployees";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import LoaderOverlay from "../components/LoaderOverlay";
import EmployeeTable from "../components/Admin/EmployeeTable";
import type { Employee } from "../types";
import Pagination from "../components/Pagination";
import AddEmployeeModal from "../components/Admin/EmployeeModals/AddEmployeeModal";
import EmployeeDetailModal from "../components/Admin/EmployeeModals/EmployeeDetailModal";
import DeleteEmployeeModal from "../components/Admin/EmployeeModals/DeleteEmployeeModal";

export default function AdminDashboard() {
  const {
    employees,
    totalCount,
    searchTerm,
    sortOption,
    bloodGroupFilter,
    fetching,
    page,
    limit,
    setSearchTerm,
    setSortOption,
    setPage,
    setBloodGroupFilter,
    addNewEmployee,
    deleteOneEmployee,
  } = useEmployees();

  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  return (
    <div className="p-6 sm:p-8 min-h-screen bg-linear-to-b from-blue-50 to-white">
      <Header
        title="Admin Dashboard"
        subtitle="Manage, search, filter, and paginate employees."
        onAdd={() => setIsAddOpen(true)}
        onLogout={handleLogout}
      />

      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortOption={sortOption}
        onSortChange={setSortOption}
        bloodGroupFilter={bloodGroupFilter}
        onBloodGroupChange={setBloodGroupFilter}
      />

      <div className="relative overflow-x-auto bg-white rounded-2xl shadow-md">
        {fetching && <LoaderOverlay />}

        {employees.length > 0 ? (
          <EmployeeTable
            employees={employees}
            onSelect={(emp) => {
              setIsDetailOpen(true);
              setSelectedEmployee(emp);
            }}
            onDelete={(emp) => {
              setSelectedEmployee(emp);
              setIsDeleteOpen(true);
            }}
          />
        ) : (
          !fetching && (
            <div className="p-6 text-center text-gray-500">
              No employees found.
            </div>
          )
        )}
      </div>

      {totalCount > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          disabled={fetching}
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
        />
      )}

      <AddEmployeeModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={addNewEmployee}
        newEmployee={{}}
        setNewEmployee={() => {}}
        loading={false}
      />

      <EmployeeDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        employee={selectedEmployee}
      />

      <DeleteEmployeeModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => deleteOneEmployee(selectedEmployee?.id || 0)}
        employeeName={
          selectedEmployee
            ? `${selectedEmployee.first_name} ${selectedEmployee.last_name}`
            : ""
        }
        deleting={false}
      />
    </div>
  );
}
