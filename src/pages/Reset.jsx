import React, { useState } from 'react'
import Navimg from '../assets/images/navigation-img.png'
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useParams } from 'react-router';
import Container from '../components/layouts/Container';
import axios from 'axios';
import { toast, Bounce } from 'react-toastify';
import PageBanner from '../components/common/PageBanner';

const Reset = () => {

  const { token } = useParams();

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswords, setShowPasswords] = useState(false)

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  // validation
  const validate = () => {
    if (!newPassword || !confirmPassword) {
      return "All fields are required"
    }

    if (newPassword.length < 8) {
      return "Password must be at least 8 characters long and include at least one letter, one number, and one special character."
    }

    if (newPassword !== confirmPassword) {
      return "Passwords do not match"
    }

    return null
  }

  const handleReset = async () => {

    const error = validate()

    if (error) {
      setErrorMsg(error)
      setSuccessMsg("")

      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
        transition: Bounce,
      })

      return
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/resetpassword/${token}`,
        {
          newPassword,
          confirmPassword,
        }
      );

      const { success, message } = res.data

      if (!success) {
        setErrorMsg(message)
        setSuccessMsg("")

        toast.error(message, {
          position: "top-center",
          autoClose: 3000,
          transition: Bounce,
        })

      } else {
        setSuccessMsg(message)
        setErrorMsg("")

        toast.success(message, {
          position: "top-center",
          autoClose: 3000,
          transition: Bounce,
        })

        setNewPassword("")
        setConfirmPassword("")
      }

    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong"

      setErrorMsg(msg)
      setSuccessMsg("")

      toast.error(msg, {
        position: "top-center",
        autoClose: 3000,
        transition: Bounce,
      })
    }
  }

  return (
    <div>

      <PageBanner
        items={[
          "Account",
          "Forget Password",
          "Reset Password",
        ]}
      />

      <div className="flex justify-center py-20">
        <div className="w-130 bg-white rounded-lg shadow-[0_4px_10px_rgba(0,38,3,0.08)] border border-[#f2f2f2] px-6 pt-6 pb-8">

          <div className="text-center max-w-85 mx-auto">
            <h2 className='flex justify-center font-pop font-semibold text-hsize text-logoc leading-[120%] pb-2'>
              Reset your Password
            </h2>
            <p className='defaultfs text-gryd'>
              Your previous password has been reset. Please set a new password for your account.
            </p>
          </div>

          <div className="pt-8 pb-4 ">

            <div className='space-y-3'>
              <div className="relative">
                <input
                  type={showPasswords ? "text" : "password"}
                  placeholder="Set a new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-brdr font-pop font-normal text-[16px] text-black placeholder:text-grynine leading-[130%] ps-4 py-3.5 rounded-md outline-none"
                />

                {showPasswords ? (
                  <FiEyeOff
                    onClick={() => setShowPasswords(false)}
                    className='size-5 text-logoc absolute top-3.5 right-4 cursor-pointer'
                  />
                ) : (
                  <FiEye
                    onClick={() => setShowPasswords(true)}
                    className='size-5 text-logoc absolute top-3.5 right-4 cursor-pointer'
                  />
                )}
              </div>

              <div className='relative'>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
            onClick={handleReset}
            className='w-full bg-primary py-3.5 font-pop font-semibold text-sm text-white leading-[120%] rounded-[43px] cursor-pointer'>
            Reset
          </button>

          <h3 className='pt-8.5 defaultfs text-gry text-center'>
            <Link to="/login" className='font-medium text-logoc underline'>
              Back to Sign in
            </Link>
          </h3>
        </div>
      </div>
    </div>
  )
}

export default Reset;