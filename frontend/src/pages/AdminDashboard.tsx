import { useEffect, useState } from "react";
import type { Employee, SortOption } from "../types";

import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import AddEmployeeModal from "../components/EmployeeModals/AddEmployeeModal";
import DeleteEmployeeModal from "../components/EmployeeModals/DeleteEmployeeModal";
import EmployeeDetailModal from "../components/EmployeeModals/EmployeeDetailModal";
import { addEmployee, getEmployees, deleteEmployee } from "../services/admin";

export default function AdminDashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [bloodGroupFilter, setBloodGroupFilter] = useState("all");
  const [newEmployee, setNewEmployee] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("name_asc");

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

  const fetchEmployees = async () => {
    setFetching(true);
    try {
      const [sort_by, sort_order] =
        sortOption === "name_asc"
          ? ["first_name", "asc"]
          : sortOption === "name_desc"
          ? ["first_name", "desc"]
          : sortOption === "email_asc"
          ? ["email", "asc"]
          : ["email", "desc"];

      const { employees, total_count } = await getEmployees(
        page,
        limit,
        searchTerm,
        sort_by,
        sort_order,
        bloodGroupFilter
      );

      setEmployees(employees);
      setTotalCount(total_count);

      if (employees.length === 0 && page > 1 && total_count > 0) {
        setPage((p) => Math.max(1, p - 1));
      }
    } catch (err) {
      console.error("Failed to fetch employees:", err);
      alert("Failed to load employees. Please try again.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchEmployees();
    }, 500); 
    return () => clearTimeout(delay);
  }, [page, searchTerm, sortOption]);

  const handleDeleteEmployee = async () => {
    if (!selectedEmployee) return;
    setDeleting(true);
    try {
      await deleteEmployee(selectedEmployee.id);
      alert(`${selectedEmployee.first_name} deleted successfully.`);
      fetchEmployees();
      setIsDeleteOpen(false);
    } catch {
      alert("Failed to delete employee.");
    } finally {
      setDeleting(false);
    }
  };

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !newEmployee.first_name ||
      !newEmployee.last_name ||
      !newEmployee.email ||
      !newEmployee.password
    ) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...newEmployee,
        confirm_password: newEmployee.password,
      };

      const createdEmp = await addEmployee(payload);
      alert(
        `Employee ${createdEmp.first_name} ${createdEmp.last_name} added successfully!`
      );

      fetchEmployees();

      setIsAddOpen(false);
      setNewEmployee({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      });
    } catch (err: any) {
      console.error("Add employee failed:", err);

      const msg =
        err.response?.data?.detail ||
        err.message ||
        "Failed to add employee. Please try again.";

      if (msg.toLowerCase().includes("email")) {
        alert(
          "This email is already registered. Please use a different email."
        );
      } else {
        alert(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBloodGroupChange = (value: string) => {
    setBloodGroupFilter(value);
    setPage(1);
  };

  return (
    <div className="p-6 sm:p-8 min-h-screen bg-linear-to-b from-blue-50 to-white">
      <Header
        title="Admin Dashboard"
        subtitle="Manage, search, and paginate employees."
        onAdd={() => setIsAddOpen(true)}
        onLogout={handleLogout}
      />

      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortOption={sortOption}
        onSortChange={setSortOption}
        bloodGroupFilter={bloodGroupFilter}
        onBloodGroupChange={handleBloodGroupChange}
      />

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        {fetching ? (
          <div className="p-6 text-center text-gray-500">
            Loading employees...
          </div>
        ) : employees.length > 0 ? (
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Email</th>
                <th className="p-3 border-b text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-blue-50">
                  <td className="p-3 border-b">
                    {emp.first_name} {emp.last_name}
                  </td>
                  <td className="p-3 border-b">{emp.email}</td>
                  <td className="p-3 border-b text-center">
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => {
                        setSelectedEmployee(emp);
                        setIsDeleteOpen(true);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No employees found.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalCount > 0 && (
        <div className="flex justify-center items-center mt-6 gap-4">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || fetching}
          >
            Prev
          </button>

          <span className="text-gray-600">
            Page {page} of {Math.max(1, Math.ceil(totalCount / limit))}
          </span>

          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((p) => p + 1)}
            disabled={
              page >= Math.ceil(totalCount / limit) ||
              fetching ||
              employees.length === 0
            }
          >
            Next
          </button>
        </div>
      )}

      {/* Modals */}
      <AddEmployeeModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddEmployee}
        newEmployee={newEmployee}
        setNewEmployee={setNewEmployee}
        loading={loading}
      />

      <EmployeeDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        employee={selectedEmployee}
      />

      <DeleteEmployeeModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteEmployee}
        employeeName={`${selectedEmployee?.first_name || ""} ${
          selectedEmployee?.last_name || ""
        }`}
        deleting={deleting}
      />
    </div>
  );
}
