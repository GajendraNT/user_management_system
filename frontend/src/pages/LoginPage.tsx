import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError("Invalid credentials");
    }
  };

  useEffect(() => {
    document.title = "Login - User Management System";
  },[]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/dashboard");
    }
  },[]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button type="submit" className="w-full" variant="primary">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
