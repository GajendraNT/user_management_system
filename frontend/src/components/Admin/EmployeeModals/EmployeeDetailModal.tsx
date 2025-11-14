import Button from "../../Button";
import Modal from "../../Modal";
import type { Employee } from "../../../types";

interface EmployeeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
}

export default function EmployeeDetailModal({
  isOpen,
  onClose,
  employee,
}: EmployeeDetailModalProps) {
  if (!employee) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold text-teal-700 mb-4">
        Employee Details
      </h2>
      <div className="space-y-2 text-gray-700 text-sm sm:text-base leading-relaxed">
        <p>
          <strong>Name:</strong> {employee.first_name} {employee.last_name}
        </p>
        <p>
          <strong>Email:</strong> {employee.email}
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          {employee.phone ? (
            <span className="text-gray-800">{employee.phone}</span>
          ) : (
            <span className="text-gray-400">Not provided</span>
          )}
        </p>
        <p>
          <strong>Address:</strong>{" "}
          {employee.address ? (
            <span className="text-gray-800">{employee.address}</span>
          ) : (
            <span className="text-gray-400">Not provided</span>
          )}
        </p>
        <p>
          <strong>Blood Group:</strong>{" "}
          {employee.blood_group ? (
            <span className="text-gray-800">{employee.blood_group}</span>
          ) : (
            <span className="text-gray-400">Not provided</span>
          )}
        </p>
      </div>
      <div className="flex justify-end mt-6">
        <Button onClick={onClose}>Close</Button>
      </div>
    </Modal>
  );
}
