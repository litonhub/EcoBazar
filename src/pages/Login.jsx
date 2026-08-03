import React, { useState } from 'react'
import Navimg from '../assets/images/navigation-img.png'
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from 'react-router';
import { toast } from "react-toastify";
import Container from '../components/layouts/Container';
import PageBanner from '../components/common/PageBanner';
import api from "../api/api";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router";

const Login = () => {

  const { getMe } = useAuth();
  const navigate = useNavigate();

  const [checked, setChecked] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });

    setErrorMsg("");
  };

  const handleLogin = async () => {

    if (!loginData.email.trim()) {
      setErrorMsg("Email is required.");
      toast.error("Email is required.");
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(loginData.email.trim())) {
      setErrorMsg("Please enter a valid email address.");
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!loginData.password) {
      setErrorMsg("Password is required.");
      toast.error("Password is required.");
      return;
    }

    setErrorMsg("");
    setLoading(true);

    try {

      const response = await api.post(
        "/auth/login",
        loginData
      );

      const { accessToken, user } =
        response.data.data;

      if (user.role !== "user") {

        try {
          await api.post("/auth/logout");
        } catch { }

        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        toast.error("Please login from Admin Login.");

        return;
      }

      localStorage.setItem(
        "accessToken",
        accessToken
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      await getMe();

      setSuccessMsg(response.data.message);
      setErrorMsg("");

      setLoginData({
        email: "",
        password: "",
      });

      toast.success(response.data.message);

      navigate("/", {
        replace: true,
      });

    } catch (err) {

      const message =
        err.response?.data?.message ||
        "Something went wrong";

      setErrorMsg(message);
      setSuccessMsg("");

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageBanner
        items={[
          "Account",
          "Login",
        ]}
      />

      <div className="flex justify-center py-10 lg:py-20 px-4 lg:px-0">
        <div className="w-full sm:w-100 lg:w-130 bg-white rounded-lg shadow-[0_4px_10px_rgba(0,38,3,0.08)] border border-[#f2f2f2] px-6 pt-6 pb-8">

          <h2 className='flex justify-center text-center font-pop font-semibold text-[24px] lg:text-hsize text-logoc leading-[120%]'>
            Sign In
          </h2>

          <div className="pt-5 pb-4 space-y-3">
            <input
              name="email"
              value={loginData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              className="w-full border border-brdr font-pop font-normal text-[16px] text-black placeholder:text-grynine leading-[130%] ps-4 py-3.5 rounded-md outline-none"
            />

            <div className='relative'>
              <input
                name="password"
                value={loginData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border border-brdr font-pop font-normal text-[16px] text-black placeholder:text-grynine leading-[130%] ps-4 py-3.5 rounded-md outline-none"
              />

              {showPassword ? (
                <FiEyeOff
                  onClick={() => setShowPassword(false)}
                  className='size-5 text-logoc absolute top-3.5 right-4 cursor-pointer'
                />
              ) : (
                <FiEye
                  onClick={() => setShowPassword(true)}
                  className='size-5 text-logoc absolute top-3.5 right-4 cursor-pointer'
                />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pb-5">
            <label
              onClick={() => setChecked(!checked)}
              className='flex gap-x-1.5 items-center cursor-pointer'
            >
              <div className="w-5 h-5 rounded flex items-center justify-center border border-[#cccccc] shrink-0">
                {checked && (
                  <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <h4 className='defaultfs text-gry'>
                Remember me
              </h4>
            </label>
            <Link to="/forget" className='defaultfs text-gry cursor-pointer underline'>
              Forget Password?
            </Link>
          </div>

          {errorMsg && (
            <p className="text-red-500 bg-red-100 rounded px-4 py-2 text-sm mb-3">
              {errorMsg}
            </p>
          )}

          {successMsg && (
            <p className="text-green-700 bg-green-100 rounded px-4 py-2 text-sm mb-3">
              {successMsg}
            </p>
          )}

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-primary py-3.5 font-pop font-semibold text-sm text-white leading-[120%] rounded-[43px] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <h3 className='pt-8.5 defaultfs text-gry text-center'>
            Don’t have account?{" "}
            <Link to="/register" className='font-medium text-logoc underline'>
              Register
            </Link>
          </h3>

        </div>
      </div>
    </div>
  )
}

export default Login;