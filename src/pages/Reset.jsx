import React, { useState } from 'react'
import Navimg from '../assets/images/navigation-img.png'
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from 'react-router';
import { GoHome } from "react-icons/go";
import { FaChevronRight } from "react-icons/fa6";
import Container from '../components/layouts/Container';

const Reset = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswords, setShowPasswords] = useState(false)

  return (
    <div>
      <div className="relative w-full">
        <img src={Navimg} alt="navigation-img" className="w-full h-30 object-cover" />

        <div className="absolute flex inset-0 pt-11">
          <Container className="w-full">
            <div className="flex items-center gap-x-3">
              <GoHome className="size-6 text-gryd" />
              <FaChevronRight className="size-2 text-grynine" />
              <h5 className="text-grynine">Account</h5>
              <FaChevronRight className="size-2 text-grynine" />
              <h5 className="text-grynine">Forget Password</h5>
              <FaChevronRight className="size-2 text-grynine" />
              <h5 className="text-grynine">Verify Code</h5>
              <FaChevronRight className="size-2 text-grynine" />
              <h5 className="text-primary">Reset Password</h5>
            </div>
          </Container>
        </div>
      </div>

      <div className="flex justify-center py-20">
        <div className="w-130 bg-white rounded-lg shadow-[0_4px_10px_rgba(0,38,3,0.08)] border border-[#f2f2f2] px-6 pt-6 pb-8">

          <div className="text-center max-w-85 mx-auto">
            <h2 className='flex justify-center font-pop font-semibold text-hsize text-logoc leading-[120%] pb-2'>
            Reset your Password
          </h2>
          <p className='defaultfs text-gryd'>Your previous password has been reset. Please set a new password for your account.</p>
          </div>

          <div className="pt-8 pb-4 ">

            <div className='space-y-3'>
              <div className="relative">
                <input
                type={showPasswords ? "text" : "password"}
                placeholder="Set a new password"
                className="w-full border border-brdr font-pop font-normal text-[16px] text-grynine leading-[130%] ps-4 py-3.5 rounded-md outline-none"
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
                className="w-full border border-brdr font-pop font-normal text-[16px] text-grynine leading-[130%] ps-4 py-3.5 rounded-md outline-none"
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

          <button className='w-full bg-primary py-3.5 font-pop font-semibold text-sm text-white leading-[120%] rounded-[43px] cursor-pointer'>
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
