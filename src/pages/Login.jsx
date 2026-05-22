import React, { useState } from 'react'
import Navimg from '../assets/images/navigation-img.png'
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from 'react-router';
import Container from '../components/layouts/Container';
import PageBanner from '../components/common/PageBanner';

const Login = () => {

  const [checked, setChecked] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <PageBanner
        items={[
          "Account",
          "Login",
        ]}
      />

      <div className="flex justify-center py-20">
        <div className="w-130 bg-white rounded-lg shadow-[0_4px_10px_rgba(0,38,3,0.08)] border border-[#f2f2f2] px-6 pt-6 pb-8">

          <h2 className='flex justify-center font-pop font-semibold text-hsize text-logoc leading-[120%]'>
            Sign In
          </h2>

          <div className="pt-5 pb-4 space-y-3">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-brdr font-pop font-normal text-[16px] text-black placeholder:text-grynine leading-[130%] ps-4 py-3.5 rounded-md outline-none"
            />

            <div className='relative'>
              <input
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
              <div className="w-5 h-5 rounded flex items-center justify-center border border-[#cccccc]">
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

          <button className='w-full bg-primary py-3.5 font-pop font-semibold text-sm text-white leading-[120%] rounded-[43px] cursor-pointer'>
            Login
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

export default Login