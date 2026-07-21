import React, { useEffect } from "react";
import Container from '../../components/layouts/Container';
import Sidebar from '../../components/common/DashboardSidebar';
import PageBanner from '../../components/common/PageBanner';
import api from "../../api/api";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query"; 
import { getDefaultAddress } from "../../services/addressService"; 
import { getMyOrders } from "../../services/orderService"; 

const UserDashboard = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  // Fetching Default Address from Backend
  const { data: address } = useQuery({
    queryKey: ["default-address"],
    queryFn: getDefaultAddress,
  });

  // Fetching Orders from Backend
  const { data: ordersResponse, isLoading: isOrdersLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: getMyOrders,
  });

  // Extract orders and keep only the top 6 recent orders
  const allOrders = ordersResponse?.data?.orders || ordersResponse?.data || [];
  const recentOrders = allOrders.slice(0, 6);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setUser(null);
      toast.success("Logout successful.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed.");
    }
  };

  const handleEditAddress = () => {
    navigate("/settings", {
      state: { scrollTo: "billing-address" },
    });
  };

  return (
    <>
      <PageBanner items={[
        "Account",
        "Dashboard"
        ]} />

      <Container>
        <div className="flex flex-col md:flex-row gap-6 pt-8 pb-20 min-h-screen text-gray-800 font-pop">
          <Sidebar activeMenu="Dashboard" handleLogout={handleLogout} />

          <div className="flex-1 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Profile Card */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-gray-100">
                  <img src={user?.avatar || "https://i.pravatar.cc/150?img=12"} alt={user?.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{user?.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{user?.role}</p>
                <Link to="/settings" className="text-green-600 font-medium hover:text-green-700 transition-colors cursor-pointer">
                  Edit Profile
                </Link>
              </div>

              {/* Billing Address Card */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 flex flex-col justify-center">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Billing Address</h4>
                {address ? (
                  <>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{address.firstName} {address.lastName}</h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {address.street}, {address.city}, {address.state?.name || address.state}<br />
                      {address.country?.name || address.country} - {address.zipCode}
                    </p>
                    <p className="text-gray-900 text-sm mb-1">{address.email}</p>
                    <p className="text-gray-900 text-sm mb-6">{address.phone}</p>
                  </>
                ) : (
                  <p className="text-gray-500 text-sm mb-6">No billing address found.</p>
                )}
                <button onClick={handleEditAddress} className="text-green-600 font-medium hover:text-green-700 transition-colors text-left cursor-pointer">
                  {address ? "Edit Address" : "Add Address"}
                </button>
              </div>
            </div>

            {/* Recent Order History Table */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-6">
                <h3 className="text-lg font-bold text-gray-900">Recent Order History</h3>
                <button 
                  onClick={() => navigate("/order-history")}
                  className="text-green-600 font-medium hover:text-green-700 transition-colors cursor-pointer"
                >
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
                    {isOrdersLoading ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-10 text-center text-gray-500">Loading orders...</td>
                      </tr>
                    ) : recentOrders.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-10 text-center text-gray-500">No recent orders found.</td>
                      </tr>
                    ) : (
                      recentOrders.map((order) => {
                        
                        // [FIX]: Extracting Total Price accurately (Checking possible backend keys)
                        const orderTotal = order.totalPrice || order.totalAmount || order.total || order.grandTotal || 0;
                        
                        // [FIX]: Extracting Total Products accurately
                        const orderProductsCount = order.totalItems || order.items?.length || order.products?.length || order.orderItems?.length || 0;

                        return (
                          <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-gray-900 font-medium uppercase">#{order._id.substring(0, 6)}...</td>
                            <td className="px-6 py-4 text-gray-600">
                              {new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-gray-900 font-medium">${Number(orderTotal).toFixed(2)}</span>
                              <span className="text-gray-500"> ({orderProductsCount} {orderProductsCount > 1 ? 'Products' : 'Product'})</span>
                            </td>
                            <td className="px-6 py-4 text-gray-600 capitalize">{order.orderStatus || 'Pending'}</td>
                            <td className="px-6 py-4 text-right">
                              <button 
                                onClick={() => navigate(`/order-details/${order._id}`)}
                                className="text-green-600 font-medium hover:text-green-700 transition-colors cursor-pointer"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
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