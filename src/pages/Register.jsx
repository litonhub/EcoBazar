import React, { useState } from 'react'
import Navimg from '../assets/images/navigation-img.png'
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from 'react-router';
import toast, { Toaster } from "react-hot-toast";
import { GoHome } from "react-icons/go";
import { FaChevronRight } from "react-icons/fa";
import Container from '../components/layouts/Container';

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [checked, setChecked] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [error, setError] = useState("")
  const [checkboxError, setCheckboxError] = useState(false)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/

  const validate = (email, pass, confirm) => {
    if (email && !emailRegex.test(email)) {
      return "Invalid email format"
    }
    if (pass && !passwordRegex.test(pass)) {
      return "Password must include uppercase, lowercase, number, special character and be at least 8 characters"
    }
    if (confirm && pass !== confirm) {
      return "Passwords do not match"
    }
    return ""
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const validationError = validate(email, password, confirmPassword)

    if (!email || !password || !confirmPassword) {
      toast.error("All fields are required ❌")
      return
    }

    if (validationError) {
      setError(validationError)
      toast.error(validationError)
      return
    }

    if (!checked) {
      setCheckboxError(true)
      setError("You must accept terms & conditions")
      toast.error("You must accept terms & conditions")
      return
    }

    setCheckboxError(false)
    setError("")
    toast.success("Account Created Successfully ✅")
  }

  return (
    <div>
      <Toaster position="top-right" />
      <div className="relative w-full">
        <img src={Navimg} alt="navigation-img" className="w-full h-30 object-cover" />
        <div className="absolute flex inset-0 pt-11">
          <Container className="w-full">
            <div className="flex items-center gap-x-3">
              <GoHome className="size-6 text-gryd" />
              <FaChevronRight className="size-2 text-grynine" />
              <h5 className="text-grynine">Account</h5>
              <FaChevronRight className="size-2 text-grynine" />
              <h5 className="text-primary">Create Account</h5>
            </div>
          </Container>
        </div>
      </div>

      <div className="flex justify-center py-20">
        <form
          onSubmit={handleSubmit}
          className="w-130 bg-white rounded-lg shadow-[0_4px_10px_rgba(0,38,3,0.08)] border border-[#f2f2f2] px-6 pt-6 pb-8"
        >
          <h2 className='flex justify-center font-pop font-semibold text-hsize text-logoc'>
            Create Account
          </h2>

          <div className="pt-5 pb-4 space-y-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError(validate(e.target.value, password, confirmPassword))
              }}
              className="w-full border border-brdr font-pop font-normal text-[16px] text-grynine leading-[130%] ps-4 py-3.5 rounded-md outline-none"
            />

            <div className='relative'>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError(validate(email, e.target.value, confirmPassword))
                }}
                className="w-full border border-brdr font-pop font-normal text-[16px] text-grynine leading-[130%] ps-4 py-3.5 rounded-md outline-none"
              />

              {showPassword ? (
                <FiEyeOff onClick={() => setShowPassword(false)}
                  className='size-5 absolute top-3.5 right-4 cursor-pointer' />
              ) : (
                <FiEye onClick={() => setShowPassword(true)}
                  className='size-5 absolute top-3.5 right-4 cursor-pointer' />
              )}
            </div>

            <div className='relative'>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  setError(validate(email, password, e.target.value))
                }}
                className="w-full border border-brdr font-pop font-normal text-[16px] text-grynine leading-[130%] ps-4 py-3.5 rounded-md outline-none"
              />

              {showConfirm ? (
                <FiEyeOff onClick={() => setShowConfirm(false)}
                  className='size-5 absolute top-3.5 right-4 cursor-pointer' />
              ) : (
                <FiEye onClick={() => setShowConfirm(true)}
                  className='size-5 absolute top-3.5 right-4 cursor-pointer' />
              )}
            </div>
          </div>

          {error && (
            <p className="text-red-500 bg-red-100 rounded px-6 py-2 text-sm mb-3">
              {error}
            </p>
          )}

          <div className='flex gap-x-1.5 items-center pb-5'>
            <div
              onClick={() => {
                setChecked(!checked)
                setCheckboxError(false)
                setError("")
              }}
              className={`
                w-5 h-5 rounded flex items-center justify-center cursor-pointer border
                ${checkboxError ? "border-red-500" : "border-[#cccccc]"}
              `}
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

            <h4 className='defaultfs text-gry'>
              Accept all terms & Conditions
            </h4>
          </div>

          <button className='w-full bg-primary py-3.5 font-pop font-semibold text-sm text-white leading-[120%] rounded-[43px] cursor-pointer'>
            Create Account
          </button>

          <h3 className='pt-8.5 defaultfs text-gry text-center '>
            Already have account?{" "}
            <Link to="/login" className='text-logoc font-medium underline'>
              Login
            </Link>
          </h3>
        </form>
      </div>
    </div>
  )
}

export default Register