import Button from "./Button";

interface HeaderProps {
  title: string;
  subtitle?: string;
  onAdd?: () => void;
  onLogout: () => void;
}

export default function Header({ title, subtitle, onAdd, onLogout }: HeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-700">{title}</h1>
        {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
      </div>
      <div className="flex gap-3 mt-4 sm:mt-0">
        {onAdd && <Button onClick={onAdd}>+ Add New Employee</Button>}
        <Button variant="danger" onClick={onLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
