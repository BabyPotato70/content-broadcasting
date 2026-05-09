import { useAuth } from "../../hooks/useAuth";
import { Menu, LogOut, User } from "lucide-react";
import { Button } from "../ui";

export const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-40 flex items-center px-4 lg:px-6">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-md hover:bg-gray-100 mr-4"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex-1">
        <h1 className="text-xl font-bold text-primary-600">CBS Platform</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
          <User className="w-4 h-4" />
          <span className="font-medium">{user?.name}</span>
          <span className="px-2 py-0.5 text-xs bg-gray-100 rounded-full capitalize">
            {user?.role}
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={logout}>
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </Button>
      </div>
    </nav>
  );
};
