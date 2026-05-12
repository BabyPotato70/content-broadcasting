import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  X,
  LayoutDashboard,
  Upload,
  FileText,
  CheckSquare,
  List,
} from "lucide-react";

const teacherLinks = [
  { to: "/teacher/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/teacher/upload", icon: Upload, label: "Upload Content" },
  { to: "/teacher/my-content", icon: FileText, label: "My Content" },
];

const principalLinks = [
  { to: "/principal/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/principal/pending", icon: CheckSquare, label: "Pending Approvals" },
  { to: "/principal/all-content", icon: List, label: "All Content" },
];

export const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const links = user?.role === "teacher" ? teacherLinks : principalLinks;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white border-r z-40 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-end p-4 lg:hidden">
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="px-4 py-2 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};
