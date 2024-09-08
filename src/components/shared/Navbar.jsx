import { NavLink } from "react-router-dom";
import { FaCogs, FaHome } from "react-icons/fa";

export const Navbar = () => {
  return (
    <nav className="flex gap-5 p-2">
      <NavLink
        to="/app"
        className={({ isActive }) =>
          `flex items-center gap-2 ${
            isActive ? "text-gray-600" : "text-gray-400"
          }`
        }
      >
        <FaHome size={22} />
        <span className="hidden md:block">Home</span>
      </NavLink>
      <NavLink
        to="/app/maintenance"
        className={({ isActive }) =>
          `flex items-center gap-2 ${
            isActive ? "text-gray-600" : "text-gray-400"
          }`
        }
      >
        <FaCogs size={22} />
        <span className="hidden md:block">Mantenimientos</span>
      </NavLink>
    </nav>
  );
};
