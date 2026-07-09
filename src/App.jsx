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

import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import AdminPublicRoute from "./routes/AdminPublicRoute";
import RecycleBinProducts from "./pages/admin/RecycleBinProducts";
import BulkAddProducts from "./pages/admin/BulkAddProducts";
import AdminSettings from "./components/admindashboard/AdminSettings";

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

        <Route path="products" element={<Products />} />

        <Route path="products/add" element={<AddProduct />} />
        <Route
          path="bulk-add-products"
          element={<BulkAddProducts />}
        />

        <Route
          path="products/edit/:id"
          element={<EditProduct />}
        />
        <Route
          path="/admin-dashboard/products/recycle-bin"
          element={<RecycleBinProducts />}
        />
        <Route
          path="/admin-dashboard/settings"
          element={<AdminSettings />}
        />
      </Route>
    </Routes>
  );
}

export default App;