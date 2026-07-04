import React, { useState } from 'react'
import Navimg from '../assets/images/navigation-img.png'
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from 'react-router';
import { toast, Bounce } from 'react-toastify';
import Container from '../components/layouts/Container';
import api from "../api/api";
import PageBanner from '../components/common/PageBanner';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [checked, setChecked] = useState(false)

  // const navigate = useNavigate()
  const [regData, setRegData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    terms: false
  });

  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  let handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    let name = e.target.name
    let value = e.target.value

    if (name !== 'terms') {
      setRegData({ ...regData, [name]: value })
    } else {
      setRegData({ ...regData, terms: !regData.terms })
    }
  }

  let handleClick = async () => {

    // Password Match Check
    if (regData.password !== regData.confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    // Terms Check
    if (!regData.terms) {
      toast.error("Please accept Terms & Conditions", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    try {

      const response = await api.post("/auth/register", {
        name: "User",
        email: regData.email,
        password: regData.password,
      });

      const { success, message } = response.data;

      if (success) {
        setSuccessMsg(message);
        setErrorMsg("");

        toast.success(message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        });

        // navigate("/login");
      }

    } catch (err) {

      const message =
        err.response?.data?.message ||
        "Something went wrong";

      setErrorMsg(message);
      setSuccessMsg("");

      toast.error(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div>

      <PageBanner
        items={[
          "Account",
          "Create Account",
        ]}
      />

      {/* Form */}
      <div className="flex justify-center py-20">
        <form
          className="w-130 bg-white rounded-lg shadow-[0_4px_10px_rgba(0,38,3,0.08)] border border-[#f2f2f2] px-6 pt-6 pb-8"
        >
          <h2 className='flex justify-center font-pop font-semibold text-hsize text-logoc'>
            Create Account
          </h2>

          <div className="pt-5 pb-4 space-y-3">
            <input
              onChange={handleChange}
              name='email'
              type="email"
              placeholder="Email"
              className="w-full border border-brdr font-pop text-[16px] text-black placeholder:text-grynine ps-4 py-3.5 rounded-md outline-none"
            />

            {/* Password */}
            <div className='relative'>
              <input
                onChange={handleChange}
                name='password'
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border border-brdr font-pop text-[16px] text-black placeholder:text-grynine ps-4 py-3.5 rounded-md outline-none"
              />

              {showPassword ? (
                <FiEyeOff
                  onClick={() => setShowPassword(false)}
                  className='size-5 absolute top-3.5 right-4 cursor-pointer'
                />
              ) : (
                <FiEye
                  onClick={() => setShowPassword(true)}
                  className='size-5 absolute top-3.5 right-4 cursor-pointer'
                />
              )}
            </div>

            {/* Confirm Password */}
            <div className='relative'>
              <input
                onChange={handleChange}
                name='confirmPassword'
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full border border-brdr font-pop text-[16px] text-black placeholder:text-grynine ps-4 py-3.5 rounded-md outline-none"
              />

              {showConfirm ? (
                <FiEyeOff
                  onClick={() => setShowConfirm(false)}
                  className='size-5 absolute top-3.5 right-4 cursor-pointer'
                />
              ) : (
                <FiEye
                  onClick={() => setShowConfirm(true)}
                  className='size-5 absolute top-3.5 right-4 cursor-pointer'
                />
              )}
            </div>
          </div>

          {errorMsg && (
            <p className="text-red-500 bg-red-100 rounded px-6 py-2 text-sm mb-3">
              {errorMsg}
            </p>
          )}
          {successMsg && (
            <p className="text-green-800 bg-green-100 rounded px-6 py-2 text-sm mb-3">
              {successMsg}
            </p>
          )}

          {/* Checkbox */}
          <div className='flex gap-x-1.5 items-center pb-5'>
            <div
              onClick={() => {
                setChecked(!checked);
                setRegData({ ...regData, terms: !checked });
              }}

              className="w-5 h-5 rounded flex items-center justify-center cursor-pointer border border-[#cccccc]"
            >
              {checked && (
                <svg
                  className="w-3 h-3 text-black"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>

            <h4 onClick={() => {
              setChecked(!checked);
              setRegData({ ...regData, terms: !checked });
            }}
              className='defaultfs text-gry cursor-pointer'>Accept all terms & Conditions
            </h4>
          </div>

          <button type='button' onClick={handleClick} className='w-full bg-primary py-3.5 font-pop font-semibold text-sm text-white rounded-[43px] cursor-pointer'>
            Create Account
          </button>

          <h3 className='pt-8.5 defaultfs text-gry text-center'>
            Already have account?{" "}
            <Link to="/login" className='text-logoc font-medium underline'>Login</Link>
          </h3>
        </form>
      </div>
    </div>
  )
}

export default Register;