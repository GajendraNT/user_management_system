import Button from "../Button";
import Modal from "../Modal";

interface DeleteEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  employeeName: string;
  deleting?: boolean;
}

export default function DeleteEmployeeModal({
  isOpen,
  onClose,
  onConfirm,
  employeeName,
  deleting = false,
}: DeleteEmployeeModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width="max-w-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Are you sure?
      </h2>
      <p className="text-gray-600 mb-6">
        Do you really want to delete <strong>{employeeName}</strong>? This
        action cannot be undone.
      </p>
      <div className="flex justify-center gap-3">
        <Button variant="secondary" onClick={onClose} disabled={deleting}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={deleting}>
          {deleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </Modal>
  );
}
