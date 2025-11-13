import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { setupPassword } from "../services/auth";

export function usePasswordSetup() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    if (user && !user.first_login) {
      navigate(
        user.role === "admin" ? "/admin/dashboard" : "/employee/dashboard",
        { replace: true }
      );
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await setupPassword({
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      if (user) {
        const updatedUser = { ...user, first_login: false };
        setUser(updatedUser);

        navigate(
          updatedUser.role === "admin"
            ? "/admin/dashboard"
            : "/employee/dashboard",
          { replace: true }
        );
      } else {
        navigate("/login", { replace: true });
      }
    } catch (err: any) {
      setError(
        err.response?.data?.detail || "Failed to setup password. Try again."
      );
    }
  };

  return {
    newPassword,
    confirmPassword,
    error,
    setNewPassword,
    setConfirmPassword,
    handleSubmit,
  };
}
