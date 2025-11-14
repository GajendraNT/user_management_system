import Button from "../components/Button";
import InputField from "../components/Input";
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
          <InputField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />

          <InputField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Enter new password"
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button type="submit" className="w-full">
            Save Password
          </Button>
        </form>
      </div>
    </div>
  );
}
