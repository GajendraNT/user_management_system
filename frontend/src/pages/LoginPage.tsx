import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import { getCurrentUser } from "../services/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const user = await login(email, password);

      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user?.role === "employee") {
        navigate("/employee/dashboard");
      } else {
        navigate("/login");
      }
    } catch (err: any) {
      setError("Invalid credentials");
    }
  };

  useEffect(() => {
    document.title = "Login - User Management System";
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    async function getUser() {
      try {
        const user = await getCurrentUser();
        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else if (user.role === "employee") {
          navigate("/employee/dashboard");
        } else {
          throw new Error("Invalid user role");
        }
      } catch (error: any) {
        console.log("No valid session found");
        localStorage.removeItem("access_token");
        alert(error.message);
        navigate("/login");
      }
    }

    if (token) {
      getUser();
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-linear-to-br from-blue-50 to-white">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              placeholder="eg. gajendra@mail.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              placeholder="************"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
