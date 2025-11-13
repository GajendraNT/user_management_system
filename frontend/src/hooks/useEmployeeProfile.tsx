import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/auth";
import { updateEmployeeProfile } from "../services/employee";

export function useEmployeeProfile() {
  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_role");
    navigate("/login");
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getCurrentUser();
        setEmployee(data);
      } catch {
        alert("Failed to load employee details. Please login again.");
        handleLogout();
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, []);

  const saveProfile = async (formData: any) => {
    const updated = await updateEmployeeProfile(formData);
    setEmployee(updated);
    return updated;
  };

  return { employee, loading, error, setError, saveProfile, handleLogout };
}
