
import {
  HiOutlineSquares2X2,
  HiOutlineShoppingBag,
  HiOutlinePlusCircle,
  HiOutlineCog6Tooth,
  HiOutlineArrowLeftOnRectangle,
} from "react-icons/hi2";
import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import api from "../../api/api";


const AdminSidebar = () => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      // Backend error হলেও logout হবে
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    window.location.replace("/admin");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${isActive
      ? "bg-primary text-white"
      : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <div className="w-64 h-screen bg-white border-r flex flex-col justify-between">

      {/* TOP */}
      <div>
        {/* LOGO */}
        <div className="p-5 text-2xl font-bold text-primary">
          Admin Panel
        </div>

        {/* MENU */}
        <nav className="flex flex-col gap-2 px-3">

          <NavLink to="/admin-dashboard" end className={linkClass}>
            <HiOutlineSquares2X2 size={20} />
            Dashboard
          </NavLink>

          <NavLink to="/admin-dashboard/products" className={linkClass}>
            <HiOutlineShoppingBag size={20} />
            Products
          </NavLink>

          <NavLink to="/admin-dashboard/products/add" className={linkClass}>
            <HiOutlinePlusCircle size={20} />
            Add Product
          </NavLink>

          <NavLink to="/admin-dashboard/settings" className={linkClass}>
            <HiOutlineCog6Tooth size={20} />
            Settings
          </NavLink>
        </nav>
      </div>

      {/* BOTTOM */}
      <div className="p-3 border-t">
        <button onClick={handleLogout} className="flex items-center gap-3 text-red-500 hover:text-red-600">
          <HiOutlineArrowLeftOnRectangle size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;