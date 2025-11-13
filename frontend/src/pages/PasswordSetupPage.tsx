import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { setupPassword } from "../services/auth";
import Button from "../components/Button";

export default function PasswordSetupPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  useEffect(() => {
    document.title = "Setup Password - User Management System";
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/login", { replace: true });
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
      // ✅ Call backend API
      await setupPassword({
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      // ✅ Safely update context (ensure user isn’t null)
      if (user) {
        const updatedUser = { ...user, first_login: false };
        setUser(updatedUser);

        // ✅ Use updatedUser instead of user (ensures correct role)
        navigate(
          updatedUser.role === "admin"
            ? "/admin/dashboard"
            : "/employee/dashboard",
          { replace: true }
        );
      } else {
        // Edge case: user might be null in rare cases (fresh reload)
        // fallback to manual redirect based on token
        navigate("/login", { replace: true });
      }
    } catch (err: any) {
      console.error("Password setup failed:", err);
      setError(
        err.response?.data?.detail || "Failed to setup password. Try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-white">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          Setup New Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Confirm new password"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button type="submit" className="w-full">
            Save Password
          </Button>
        </form>
      </div>
    </div>
  );
}
