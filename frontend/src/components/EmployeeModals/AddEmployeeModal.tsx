import React from "react";
import Button from "../Button";
import Modal from "../Modal";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (e: React.FormEvent) => void;
  newEmployee: any;
  setNewEmployee: (data: any) => void;
  loading: boolean;
}

const newEmpInput = [
  {
    label: "First Name",
    type: "text",
    valueKey: "first_name",
    placeholder: "Enter first name",
  },
  {
    label: "Last Name",
    type: "text",
    valueKey: "last_name",
    placeholder: "Enter last name",
  },
  {
    label: "Email",
    type: "email",
    valueKey: "email",
    placeholder: "Enter email",
  },
  {
    label: "Password",
    type: "password",
    valueKey: "password",
    placeholder: "Enter password",
  },
];

export default function AddEmployeeModal({
  isOpen,
  onClose,
  onAdd,
  newEmployee,
  setNewEmployee,
  loading,
}: AddEmployeeModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold text-blue-700 mb-4">Add New Employee</h2>
      <form onSubmit={onAdd} className="space-y-4">
        {newEmpInput.map((field) => (
          <div key={field.valueKey}>
            <label className="block text-sm font-medium mb-1 capitalize">
              {field.label}
            </label>
            <input
              type={field.type}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={(newEmployee as any)[field.valueKey] || ""}
              placeholder={field.placeholder}
              onChange={(e) =>
                setNewEmployee({
                  ...newEmployee,
                  [field.valueKey]: e.target.value,
                })
              }
              disabled={loading}
            />
          </div>
        ))}
        <div className="flex justify-end gap-3 mt-4">
          <Button
            variant="secondary"
            type="button"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Add"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
