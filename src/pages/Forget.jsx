import React from 'react'
import Navimg from '../assets/images/navigation-img.png'
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from 'react-router';
import { GoHome } from "react-icons/go";
import { FaChevronRight } from "react-icons/fa6";
import Container from '../components/layouts/Container';

const Forget = () => {


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
              <h5 className="text-primary">Forget Password</h5>
            </div>
          </Container>
        </div>
      </div>

      <div className="flex justify-center py-20">
        <div className="w-130 bg-white rounded-lg shadow-[0_4px_10px_rgba(0,38,3,0.08)] border border-[#f2f2f2] px-6 pt-6 pb-8 text-center">

          <h2 className='flex justify-center font-pop font-semibold text-hsize text-logoc leading-[120%]'>
            Forget your password?
          </h2>
          <p className='defaultfs text-grynine pt-2'>Enter your email below to recover your password</p>

          <div className="pt-5 pb-4 space-y-3">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-brdr font-pop font-normal text-[16px] text-grynine leading-[130%] ps-4 py-3.5 rounded-md outline-none"
            />

          </div>

          <button className='w-full bg-primary py-3.5 font-pop font-semibold text-sm text-white leading-[120%] rounded-[43px] cursor-pointer'>
            Submit
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

export default Forget;
