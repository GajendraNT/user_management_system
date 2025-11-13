import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-3">
      <h1 className="text-4xl font-bold text-red-600">404</h1>
      <p className="text-gray-600">Page not found</p>
      <Button variant="secondary" onClick={() => navigate("/login")}>
        Go To Home
      </Button>
    </div>
  );
}
