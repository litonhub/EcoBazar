import {
  HiOutlineSquares2X2,
  HiOutlineShoppingBag,
  HiOutlinePlusCircle,
  HiOutlineCog6Tooth,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineTag,
} from "react-icons/hi2";
import { LuTicketPercent } from "react-icons/lu";
import { NavLink, useNavigate } from "react-router";
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

  // Premium active & inactive state styling
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${isActive
      ? "bg-primary text-white shadow-md shadow-primary/25"
      : "text-gray-500 hover:bg-primary/5 hover:text-primary"
    }`;

  return (
    <div className="flex w-64 flex-col justify-between border-r border-brdrtwo bg-white font-pop">

      {/* TOP SECTION */}
      <div className="flex flex-col">

        {/* LOGO AREA */}
        <div className="flex h-20 items-center px-6">
          <div className="flex items-center gap-2 text-2xl font-bold text-primary">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow-sm">
              <span className="text-lg">A</span>
            </div>
            Admin Panel
          </div>
        </div>

        {/* NAVIGATION MENU */}
        <div className="flex flex-col gap-6 px-4 pt-4">

          {/* Main Menu Group */}
          <div>
            <p className="mb-3 px-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Main Menu
            </p>
            <nav className="flex flex-col gap-1.5">
              <NavLink to="/admin-dashboard" end className={linkClass}>
                <HiOutlineSquares2X2 size={20} />
                Dashboard
              </NavLink>

              <NavLink to="/admin-dashboard/products" end className={linkClass}>
                <HiOutlineShoppingBag size={20} />
                Products
              </NavLink>
            </nav>
          </div>

          {/* Product Management Group */}
          <div>
            <p className="mb-3 px-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Management
            </p>
            <nav className="flex flex-col gap-1.5">
              <NavLink to="/admin-dashboard/categories/add" className={linkClass}>
                <HiOutlineTag size={20} />
                Add Category
              </NavLink>
              <NavLink to="/admin-dashboard/products/add" className={linkClass}>
                <HiOutlinePlusCircle size={20} />
                Add Product
              </NavLink>

              <NavLink to="/admin-dashboard/bulk-add-products" className={linkClass}>
                <HiOutlinePlusCircle size={20} />
                Bulk Add Products
              </NavLink>

              <NavLink to="/admin-dashboard/coupons" className={linkClass}>
                <LuTicketPercent size={20} />
                Coupons
              </NavLink>
            </nav>
          </div>

          {/* Settings Group */}
          <div>
            <p className="mb-3 px-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
              System
            </p>
            <nav className="flex flex-col gap-1.5">
              <NavLink to="/admin-dashboard/settings" className={linkClass}>
                <HiOutlineCog6Tooth size={20} />
                Settings
              </NavLink>
            </nav>
          </div>

        </div>
      </div>

      {/* BOTTOM SECTION (LOGOUT) */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition-all duration-300 hover:bg-red-50 hover:text-red-600"
        >
          <HiOutlineArrowLeftOnRectangle size={20} />
          Logout
        </button>
      </div>

    </div>
  );
};

export default AdminSidebar;