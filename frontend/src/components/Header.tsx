import { LogOut, UserPlus } from "lucide-react";
import Button from "./Button";

interface HeaderProps {
  title: string;
  subtitle?: string;
  onAdd?: () => void;
  onLogout: () => void;
}

export default function Header({
  title,
  subtitle,
  onAdd,
  onLogout,
}: HeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 px-10 py-3 bg-teal-100/20 backdrop-blur rounded-lg shadow sticky top-0 z-10 ">
      <div>
        <h1 className="text-3xl font-bold text-teal-700">{title}</h1>
        {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
      </div>
      <div className="flex gap-3 mt-4 sm:mt-0">
        {onAdd && (
          <Button onClick={onAdd}>
            <UserPlus />
          </Button>
        )}
        <Button variant="danger" onClick={onLogout}>
          <LogOut />
        </Button>
      </div>
    </div>
  );
}
