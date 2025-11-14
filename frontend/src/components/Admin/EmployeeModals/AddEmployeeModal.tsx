import React from "react";
import Button from "../../Button";
import Modal from "../../Modal";
import InputField from "../../Input";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (e: React.FormEvent) => void;
  newEmployee: any;
  setNewEmployee: (data: any) => void;
  loading: boolean;
  error?: string;
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
  {
    label: "Confirm Password",
    type: "password",
    valueKey: "confirm_password",
    placeholder: "Enter confirm password",
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
      <h2 className="text-xl font-bold text-teal-700 mb-4">Add New Employee</h2>

      <form onSubmit={onAdd} className="space-y-4">
        {newEmpInput.map((field) => (
          <InputField
            key={field.valueKey}
            label={field.label}
            type={field.type}
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
        ))}

        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            id="isAdmin"
            checked={newEmployee.is_admin || false}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                is_admin: e.target.checked,
              })
            }
            disabled={loading}
            className="w-4 h-4 checked:background-teal-500 focus:ring-0 rounded"
          />
          <label htmlFor="isAdmin" className="text-sm font-medium">
            Make this user an Admin
          </label>
        </div>

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
