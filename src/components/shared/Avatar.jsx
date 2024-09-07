import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export const Avatar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  const avatar = user?.avatarurl
    ? user?.avatarurl
    : "https://via.placeholder.com/40";

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center space-x-2 bg-gray-100 p-2 rounded-full hover:bg-gray-200 focus:outline-none duration-200"
      >
        <img
          src={avatar}
          alt="Avatar de usuario"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
        />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 duration-200">
          <div className="py-2">
            <span className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer hover:text-primary">
              Mantenimientos
            </span>
            <span
              onClick={logout}
              className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer hover:text-primary"
            >
              Cerrar sesión
            </span>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 z-40 duration-200"
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </div>
  );
};
