import { useState } from "react";
import Modal from "../../components/Modal";
import Button from "../../components/Button";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues: {
    phone: string;
    address: string;
    blood_group: string;
  };
  onSave: (data: {
    phone: string;
    address: string;
    blood_group: string;
  }) => void;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  initialValues,
  onSave,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState(initialValues);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    if (!formData.address.trim()) {
      setError("Address cannot be empty.");
      return;
    }

    if (!formData.blood_group) {
      setError("Please select a valid blood group.");
      return;
    }

    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="max-w-md">
      <h2 className="text-lg sm:text-xl font-semibold text-teal-700 mb-4 text-center">
        Edit Your Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="text"
            maxLength={10}
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value.replace(/\D/g, "").slice(0, 10),
              })
            }
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-teal-400"
            placeholder="10-digit phone"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-teal-400"
            placeholder="Enter address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Blood Group</label>
          <select
            value={formData.blood_group}
            onChange={(e) =>
              setFormData({ ...formData, blood_group: e.target.value })
            }
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-teal-400"
          >
            <option value="">Select</option>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Modal>
  );
}
