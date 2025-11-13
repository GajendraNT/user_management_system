export default function Pagination({
  page,
  totalPages,
  disabled,
  onPrev,
  onNext,
}: {
  page: number;
  totalPages: number;
  disabled: boolean;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex justify-center items-center mt-6 gap-4">
      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        onClick={onPrev}
        disabled={page === 1 || disabled}
      >
        Prev
      </button>

      <span className="text-gray-600">
        Page {page} of {totalPages}
      </span>

      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        onClick={onNext}
        disabled={page >= totalPages || disabled}
      >
        Next
      </button>
    </div>
  );
}
