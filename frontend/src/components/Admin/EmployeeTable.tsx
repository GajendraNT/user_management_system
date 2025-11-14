import { useState } from "react";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import type { Employee } from "../../types";
import Button from "../Button";

interface Props {
  employees: Employee[];
  onSelect: (emp: Employee) => void; // row click → open modal
  onDelete: (emp: Employee) => void;
}

export default function EmployeeTable({
  employees,
  onSelect,
  onDelete,
}: Props) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleExpand = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setExpandedRow(expandedRow === id ? null : id);
  };

  const renderValue = (value?: string) =>
    value ? value : <span className="italic text-gray-400">Not Available</span>;

  return (
    <table className="min-w-full text-left border-collapse">
      <thead className="bg-teal-100 text-gray-700">
        <tr>
          <th className="p-3 border-b">Name</th>
          <th className="p-3 border-b">Email</th>
          <th className="p-3 border-b text-center w-10">Actions</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((emp) => {
          const isExpanded = expandedRow === emp.id;

          return (
            <>
              <tr
                key={emp.id}
                className="hover:bg-teal-50 cursor-pointer transition"
                onClick={() => onSelect(emp)}
              >
                <td className="p-3 border-b">
                  {emp.first_name} {emp.last_name}
                </td>

                <td className="p-3 border-b">{emp.email}</td>

                <td className="p-3 border-b text-center">
                  <div className="flex items-center justify-center gap-4">
                    <Button onClick={(e) => toggleExpand(e, emp.id)}>
                      {isExpanded ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>

                    <Button
                      variant="danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(emp);
                      }}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </td>
              </tr>

              {/* EXPANDED INFORMATION ROW */}
              {isExpanded && (
                <tr className="bg-teal-50/60">
                  <td colSpan={3} className="p-4 border-b text-gray-700">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <p>
                        <strong>Phone:</strong> {renderValue(emp.phone)}
                      </p>
                      <p>
                        <strong>Blood Group:</strong>{" "}
                        {renderValue(emp.blood_group)}
                      </p>
                      <p>
                        <strong>Address:</strong> {renderValue(emp.address)}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </>
          );
        })}
      </tbody>
    </table>
  );
}
