import { employees } from "../data/dummyData";

export default function EmployeeDashboard() {
  const employee = employees.find((e) => e.email === "gajendra@mail.com");

  if (!employee) return <p className="p-8 text-red-600">No employee found.</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Employee Dashboard
        </h1>
        <div className="space-y-3 text-gray-700">
          <p><strong>Name:</strong> {employee.first_name} {employee.last_name}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Phone:</strong> {employee.phone}</p>
          <p><strong>Address:</strong> {employee.address}</p>
          <p><strong>Blood Group:</strong> {employee.blood_group}</p>
        </div>
      </div>
    </div>
  );
}
