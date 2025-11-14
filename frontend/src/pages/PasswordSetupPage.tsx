import Button from "../components/Button";
import { usePasswordSetup } from "../hooks/usePasswordSetup";

export default function PasswordSetupPage() {
  const {
    newPassword,
    confirmPassword,
    error,
    setNewPassword,
    setConfirmPassword,
    handleSubmit,
  } = usePasswordSetup();

  return (
    <div className="flex items-center justify-center h-screen bg-linear-to-br from-teal-200 to-white">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-teal-700 mb-4 text-center">
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
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-400"
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
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-400"
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
