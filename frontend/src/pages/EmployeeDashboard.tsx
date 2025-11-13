import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { getCurrentUser } from "../services/auth";
import { updateEmployeeProfile } from "../services/employee";
import Button from "../components/Button";
import Modal from "../components/Modal";

export default function EmployeeDashboard() {
  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    blood_group: "",
  });
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_role");
    navigate("/login");
  };

  useEffect(() => {
    document.title = "Employee Dashboard - User Management System";
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getCurrentUser();
        setEmployee(data);
      } catch (err) {
        console.error("Failed to fetch employee:", err);
        alert("Failed to load employee details. Please login again.");
        handleLogout();
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, []);

  const handleEditClick = () => {
    setFormData({
      phone: employee?.phone || "",
      address: employee?.address || "",
      blood_group: employee?.blood_group || "",
    });
    setError("");
    setIsEditOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.match(phoneRegex)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    if (!formData.address.trim()) {
      setError("Address cannot be empty.");
      return;
    }

    if (!formData.blood_group) {
      setError("Please select a valid blood group.");
      return;
    }

    try {
      const updated = await updateEmployeeProfile(formData);
      alert("Profile updated successfully!");
      setEmployee(updated);
      setIsEditOpen(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Failed to update profile. Try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading your profile...
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        No employee found.
      </div>
    );
  }

  const isProfileComplete =
    employee.phone && employee.address && employee.blood_group;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-100 p-4 sm:p-8">
      <Header
        title="Employee Dashboard"
        subtitle="View and manage your personal profile details."
        onLogout={handleLogout}
      />

      <div className="flex justify-center mt-10">
        <div
          className="
            bg-white 
            rounded-2xl 
            shadow-xl 
            p-6 sm:p-8 
            w-full 
            max-w-lg 
            relative 
            transition-all 
            duration-300 
            border border-blue-100 
            hover:shadow-2xl
          "
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-700 text-center">
              Profile Information
            </h2>
            <Button
              className="px-4 py-2 text-sm font-semibold"
              variant={isProfileComplete ? "primary" : "secondary"}
              onClick={handleEditClick}
            >
              {isProfileComplete ? "Edit Details" : "Fill Details"}
            </Button>
          </div>

          <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
            <p>
              <strong>Name:</strong> {employee.first_name} {employee.last_name}
            </p>
            <p>
              <strong>Email:</strong> {employee.email}
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              {employee.phone ? (
                <span className="text-gray-800">{employee.phone}</span>
              ) : (
                <span className="text-gray-400">Not provided</span>
              )}
            </p>
            <p>
              <strong>Address:</strong>{" "}
              {employee.address ? (
                <span className="text-gray-800">{employee.address}</span>
              ) : (
                <span className="text-gray-400">Not provided</span>
              )}
            </p>
            <p>
              <strong>Blood Group:</strong>{" "}
              {employee.blood_group ? (
                <span className="text-gray-800">{employee.blood_group}</span>
              ) : (
                <span className="text-gray-400">Not provided</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Edit / Fill Details Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        width="max-w-md"
      >
        <h2 className="text-lg sm:text-xl font-semibold text-blue-700 mb-4 text-center">
          {isProfileComplete ? "Edit Your Details" : "Complete Your Profile"}
        </h2>

        <form onSubmit={handleSave} className="space-y-4">
          {error && (
            <p className="text-red-500 text-sm text-center font-medium">
              {error}
            </p>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // 🔒 remove all non-digit chars
                if (value.length <= 10) {
                  setFormData({ ...formData, phone: value });
                }
              }}
              onKeyDown={(e) => {
                // 🧠 allow only control keys & numbers
                const allowedKeys = [
                  "Backspace",
                  "Delete",
                  "ArrowLeft",
                  "ArrowRight",
                  "Tab",
                ];
                if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                  e.preventDefault();
                }
              }}
              placeholder="Enter 10-digit phone number"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              maxLength={10}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="Enter address"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Blood Group
            </label>
            <select
              value={formData.blood_group}
              onChange={(e) =>
                setFormData({ ...formData, blood_group: e.target.value })
              }
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select</option>
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                (group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setIsEditOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
