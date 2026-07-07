import { HiOutlineBell, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useState } from "react";
import { useNavigate } from "react-router";

const AdminTopbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();


  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) { }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    navigate("/admin", {
      replace: true,
    });
  };

  return (
    <div className="w-full h-16 bg-white border-b flex items-center justify-between px-6">

      {/* LEFT - SEARCH */}
      <div className="flex items-center gap-3 w-1/2">
        <HiOutlineMagnifyingGlass
          size={20}
          className="text-gray-500"
        />
        <input
          type="text"
          placeholder="Search products..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* RIGHT - ICONS + USER */}
      <div className="flex items-center gap-5 relative">

        {/* NOTIFICATION */}
        <button className="relative">
          <HiOutlineBell
            size={22}
            className="text-gray-600"
          />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* USER */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <img
            src={user?.avatar || "https://i.pravatar.cc/40?img=12"}
            alt={user?.name}
            className="w-8 h-8 rounded-full object-cover border"
          />

          <span className="text-sm font-medium hidden md:block">
            {user?.name}
          </span>
        </div>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 top-12 w-40 bg-white border rounded-lg shadow-md">
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTopbar;