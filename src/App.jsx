import "./App.css";
import { Routes, Route } from "react-router";

import Home from "./pages/Home";
import MainLayouts from "./components/layouts/MainLayouts";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Forget from "./pages/Forget";
import Verify from "./pages/Verify";
import Reset from "./pages/Reset";
import Contact from "./pages/Contact";
import About from "./pages/About";
import TrackOrder from "./components/TrackOrder";
import AllHotDeals from "./pages/AllHotDeals";
import UserDashboard from "./pages/dashboard/UserDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import VerifyEmail from "./pages/VerifyEmail";
import Settings from "./pages/dashboard/Setting";

import DashboardLayout from "./components/layouts/DashboardLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Products from "./pages/admin/Products";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import AdminLogin from "./pages/admin/AdminLogin";
import CouponList from "./pages/admin/coupons/CouponList";
import AddCoupon from "./pages/admin/coupons/AddCoupon";
import EditCoupon from "./pages/admin/coupons/EditCoupon";
import CouponRecycleBin from "./pages/admin/coupons/CouponRecycleBin";

import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import AdminPublicRoute from "./routes/AdminPublicRoute";
import RecycleBinProducts from "./pages/admin/RecycleBinProducts";
import BulkAddProducts from "./pages/admin/BulkAddProducts";
import AdminSettings from "./components/admindashboard/AdminSettings";
import AddCategory from "./pages/admin/AddCategory";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Routes>
      {/* ================= PUBLIC WEBSITE ================= */}
      <Route element={<MainLayouts />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/resetpassword" element={<Reset />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/allhotdeals" element={<AllHotDeals />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product-details/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* USER DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* ================= ADMIN LOGIN ================= */}
      <Route
        path="/admin"
        element={
          <AdminPublicRoute>
            <AdminLogin />
          </AdminPublicRoute>
        }
      />

      {/* ================= ADMIN DASHBOARD ================= */}
      <Route
        path="/admin-dashboard"
        element={
          <AdminProtectedRoute>
            <DashboardLayout />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />

        <Route path="categories/add" element={<AddCategory />} />
        <Route path="products" element={<Products />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="bulk-add-products" element={<BulkAddProducts />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="products/recycle-bin" element={<RecycleBinProducts />} />
        <Route path="coupons" element={<CouponList />} />
        <Route path="coupons/add" element={<AddCoupon />} />
        <Route path="coupons/edit/:id" element={<EditCoupon />} />
        <Route path="coupons/recycle-bin" element={<CouponRecycleBin />} />

        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}

export default App;