import React from 'react';
import { FiGrid, FiRefreshCcw, FiHeart, FiShoppingBag, FiSettings, FiLogOut } from 'react-icons/fi';
import Container from '../../components/layouts/Container';
import PageBanner from '../../components/common/PageBanner';
import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import api from "../../api/api";
import { toast } from "react-toastify";

const UserDashboard = () => {

const { user, setUser } = useAuth();
const navigate = useNavigate();

  const recentOrders = [
    { id: '#738', date: '8 Sep, 2024', total: '$135.00', products: '5 Products', status: 'Processing' },
    { id: '#703', date: '24 May, 2020', total: '$25.00', products: '1 Product', status: 'on the way' },
    { id: '#130', date: '22 Oct, 2020', total: '$250.00', products: '4 Products', status: 'Completed' },
    { id: '#561', date: '1 Feb, 2020', total: '$35.00', products: '1 Products', status: 'Completed' },
    { id: '#536', date: '21 Sep, 2020', total: '$578.00', products: '13 Products', status: 'Completed' },
    { id: '#492', date: '22 Oct, 2020', total: '$345.00', products: '7 Products', status: 'Completed' },
  ];

  // মেনু লিংকের কমন স্টাইল (Hover Effect সহ)
  const navItemClass = ({ isActive }) =>
    `group flex items-center px-6 py-3 border-l-4 transition-all font-medium ${isActive
      ? "bg-gray-100 text-primary border-primary"
      : "text-gray-600 border-transparent hover:bg-gray-100 hover:text-gray-900 hover:border-green-500"
    }`;

  const navIconClass = "w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-700 transition-colors";

  const handleLogout = async () => {
  try {
    await api.post("/auth/logout");

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    setUser(null);

    toast.success("Logout successful.");

    navigate("/login");
  } catch (err) {
    toast.error(
      err.response?.data?.message ||
      "Logout failed."
    );
  }
};

  return (
    <>
      <PageBanner
        items={[
          "Dashboard",
        ]}
      />

      <Container>
        <div className="flex flex-col md:flex-row gap-6 pt-8 pb-20 min-h-screen text-gray-800 font-sans">

          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 bg-white border border-gray-200 rounded-lg shadow-sm h-fit">
            <h2 className="text-lg font-semibold px-6 py-5">Navigation</h2>
            <nav className="flex flex-col pb-4">

              <NavLink to="/dashboard" className={navItemClass}>
                <FiGrid className={navIconClass} />
                Dashboard
              </NavLink>

              <NavLink to="/orders" className={navItemClass}>
                <FiRefreshCcw className={navIconClass} />
                Order History
              </NavLink>

              <NavLink to="/wishlist" className={navItemClass}>
                <FiHeart className={navIconClass} />
                Wishlist
              </NavLink>

              <NavLink to="/cart" className={navItemClass}>
                <FiShoppingBag className={navIconClass} />
                Shopping Cart
              </NavLink>

              <NavLink to="/settings" className={navItemClass}>
                <FiSettings className={navIconClass} />
                Settings
              </NavLink>

              <button
                onClick={handleLogout}
                className="group flex items-center px-6 py-3 text-gray-600 border-l-4 border-transparent hover:bg-gray-100 hover:text-gray-900 hover:border-green-500 transition-all font-medium mt-2 w-full"
              >
                <FiLogOut className={navIconClass} />
                Log-out
              </button>

            </nav>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col gap-6">

            {/* Top Cards: Profile & Billing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Profile Card */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-gray-100">
                  <img
                    src={
                      user?.avatar ||
                      "https://i.pravatar.cc/150?img=12"
                    }
                    alt={user?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {user?.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  {user?.role}
                </p>
                <button className="text-green-600 font-medium hover:text-green-700 transition-colors">
                  Edit Profile
                </button>
              </div>

              {/* Billing Address Card */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 flex flex-col justify-center">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Billing Address</h4>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {user?.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  4140 Parker Rd. Allentown, New Runda<br />
                  31134
                </p>
                <p className="text-gray-900 text-sm mb-1">
                  {user?.email}
                </p>
                <p className="text-gray-900 text-sm mb-6">254 555-0110</p>
                <button className="text-green-600 font-medium hover:text-green-700 transition-colors text-left">
                  Edit Address
                </button>
              </div>
            </div>

            {/* Recent Order History Table */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-6">
                <h3 className="text-lg font-bold text-gray-900">Recent Order History</h3>
                <button className="text-green-600 font-medium hover:text-green-700 transition-colors">
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-gray-500 text-xs uppercase tracking-wider">
                      <th className="px-6 py-4 font-medium">Order ID</th>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium">Total</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {recentOrders.map((order, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-gray-900 font-medium">{order.id}</td>
                        <td className="px-6 py-4 text-gray-600">{order.date}</td>
                        <td className="px-6 py-4">
                          <span className="text-gray-900 font-medium">{order.total}</span>{' '}
                          <span className="text-gray-500">({order.products})</span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{order.status}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-green-600 font-medium hover:text-green-700 transition-colors">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </>
  );
};

export default UserDashboard;