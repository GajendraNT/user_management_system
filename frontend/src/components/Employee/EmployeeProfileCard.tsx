import Button from "../../components/Button";
import type { Employee } from "../../types";

interface ProfileCardProps {
  employee: Employee;
  isProfileComplete: boolean;
  onEdit: () => void;
}

export default function ProfileCard({
  employee,
  isProfileComplete,
  onEdit,
}: ProfileCardProps) {
  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-lg relative border border-blue-100 hover:shadow-2xl transition duration-300">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-700">
            Profile Information
          </h2>

          <Button
            className="px-4 py-2 text-sm font-semibold"
            variant={isProfileComplete ? "primary" : "secondary"}
            onClick={onEdit}
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
            {employee.phone || (
              <span className="text-gray-400">Not provided</span>
            )}
          </p>
          <p>
            <strong>Address:</strong>{" "}
            {employee.address || (
              <span className="text-gray-400">Not provided</span>
            )}
          </p>
          <p>
            <strong>Blood Group:</strong>{" "}
            {employee.blood_group || (
              <span className="text-gray-400">Not provided</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
