import Button from "../Button";
import Modal from "../Modal";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (e: React.FormEvent) => void;
  newEmployee: any;
  setNewEmployee: (data: any) => void;
}

export default function AddEmployeeModal({
  isOpen,
  onClose,
  onAdd,
  newEmployee,
  setNewEmployee,
}: AddEmployeeModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold text-blue-700 mb-4">Add New Employee</h2>
      <form onSubmit={onAdd} className="space-y-4">
        {["first_name", "last_name", "email", "password"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium mb-1 capitalize">
              {field.replace("_", " ")}
            </label>
            <input
              type={field === "password" ? "password" : "text"}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={(newEmployee as any)[field]}
              onChange={(e) =>
                setNewEmployee({
                  ...newEmployee,
                  [field]: e.target.value,
                })
              }
            />
          </div>
        ))}
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Add</Button>
        </div>
      </form>
    </Modal>
  );
}
