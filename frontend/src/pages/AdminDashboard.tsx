import { useEffect, useState } from "react";
import type { Employee, SortOption } from "../types";

import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import AddEmployeeModal from "../components/EmployeeModals/AddEmployeeModal";
import DeleteEmployeeModal from "../components/EmployeeModals/DeleteEmployeeModal";
import EmployeeDetailModal from "../components/EmployeeModals/EmployeeDetailModal";
import { addEmployee } from "../services/admin";

export default function AdminDashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [newEmployee, setNewEmployee] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("name_asc");
  const [bloodGroupFilter, setBloodGroupFilter] = useState("all");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  // debounce search/filter/sort
  useEffect(() => {
    const timer = setTimeout(() => {
      let results = employees.filter((e) => e.role === "employee");

      if (searchTerm.trim() !== "") {
        const lower = searchTerm.toLowerCase();
        results = results.filter(
          (emp) =>
            emp.first_name.toLowerCase().includes(lower) ||
            emp.last_name.toLowerCase().includes(lower) ||
            emp.email.toLowerCase().includes(lower) ||
            (emp.blood_group && emp.blood_group.toLowerCase().includes(lower))
        );
      }

      if (bloodGroupFilter !== "all") {
        results = results.filter(
          (emp) =>
            emp.blood_group?.toLowerCase() === bloodGroupFilter.toLowerCase()
        );
      }

      results = results.sort((a, b) => {
        switch (sortOption) {
          case "name_asc":
            return a.first_name.localeCompare(b.first_name);
          case "name_desc":
            return b.first_name.localeCompare(a.first_name);
          case "email_asc":
            return a.email.localeCompare(b.email);
          case "email_desc":
            return b.email.localeCompare(a.email);
          case "blood_asc":
            return (a.blood_group || "").localeCompare(b.blood_group || "");
          case "blood_desc":
            return (b.blood_group || "").localeCompare(a.blood_group || "");
          default:
            return 0;
        }
      });

      setFilteredEmployees(results);
    }, 400);

    return () => clearTimeout(timer);
  }, [employees, searchTerm, sortOption, bloodGroupFilter]);

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
        first_name: newEmployee.first_name,
        last_name: newEmployee.last_name,
        email: newEmployee.email,
        password: newEmployee.password,
        confirm_password: newEmployee.password,
      };

      const createdEmp = await addEmployee(payload);

      setEmployees((prev) => [
        ...prev,
        {
          id: createdEmp.id,
          first_name: createdEmp.first_name,
          last_name: createdEmp.last_name,
          email: createdEmp.email,
          role: createdEmp.role,
        },
      ]);

      alert(`Employee ${createdEmp.first_name} ${createdEmp.last_name} added successfully!`);
      setIsAddOpen(false);
      setNewEmployee({ first_name: "", last_name: "", email: "", password: "" });
    } catch (err: any) {
      console.error("Add employee failed:", err);
      const msg =
        err.response?.data?.detail ||
        err.message ||
        "Failed to add employee. Please try again.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 min-h-screen bg-linear-to-b from-blue-50 to-white">
      <Header
        title="Admin Dashboard"
        subtitle="Manage, search, filter, and sort employees."
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

      {/* Employee Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <tr
                  key={emp.email}
                  className="hover:bg-blue-50 cursor-pointer"
                  onClick={() => {
                    setSelectedEmployee(emp);
                    setIsDetailOpen(true);
                  }}
                >
                  <td className="p-3 border-b font-medium text-gray-800">
                    {emp.first_name} {emp.last_name}
                  </td>
                  <td className="p-3 border-b">{emp.email}</td>
                  <td
                    className="p-3 border-b text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="text-red-600 hover:text-red-800 font-medium transition"
                      onClick={() => {
                        setSelectedEmployee(emp);
                        setIsDeleteOpen(true);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center text-gray-500 py-6">
                  No employees match your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
        onConfirm={() => {}}
        employeeName={`${selectedEmployee?.first_name || ""} ${
          selectedEmployee?.last_name || ""
        }`}
      />
    </div>
  );
}
