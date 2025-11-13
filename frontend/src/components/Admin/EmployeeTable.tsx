import type { Employee } from "../../types";

export default function EmployeeTable({
  employees,
  onSelect,
  onDelete,
}: {
  employees: Employee[];
  onSelect: (emp: Employee) => void;
  onDelete: (emp: Employee) => void;
}) {
  return (
    <table className="min-w-full text-left border-collapse">
      <thead className="bg-blue-100 text-gray-700">
        <tr>
          <th className="p-3 border-b">Name</th>
          <th className="p-3 border-b">Email</th>
          <th className="p-3 border-b text-center">Action</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((emp) => (
          <tr
            key={emp.id}
            className="hover:bg-blue-50 cursor-pointer"
            onClick={() => onSelect(emp)}
          >
            <td className="p-3 border-b">
              {emp.first_name} {emp.last_name}
            </td>
            <td className="p-3 border-b">{emp.email}</td>

            <td
              className="p-3 border-b text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => onDelete(emp)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
