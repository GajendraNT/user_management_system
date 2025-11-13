// src/pages/Login/useLogin.ts
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCurrentUser } from "../services/auth";

export function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle login submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await login(email, password);

      const user = await getCurrentUser();

      if (user.first_login) {
        navigate("/setup-password", { replace: true });
      } else {
        navigate(
          user.role === "admin" ? "/admin/dashboard" : "/employee/dashboard",
          { replace: true }
        );
      }
    } catch {
      setError("Invalid credentials");
    }
  };

  // Auto-redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    async function checkUser() {
      try {
        const user = await getCurrentUser();

        navigate(
          user.role === "admin" ? "/admin/dashboard" : "/employee/dashboard",
          { replace: true }
        );
      } catch {
        localStorage.removeItem("access_token");
      }
    }

    checkUser();
  }, [navigate]);

  return {
    email,
    password,
    error,
    setEmail,
    setPassword,
    handleSubmit,
  };
}
