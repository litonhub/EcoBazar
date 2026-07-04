import React from 'react'
import Navimg from '../assets/images/navigation-img.png'
import { Link, useNavigate } from "react-router";
import { GoHome } from "react-icons/go";
import { FaChevronRight } from "react-icons/fa6";
import Container from '../components/layouts/Container';
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/api";
import ResendTimer from "../components/common/ResendTimer";

const Verify = () => {

  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const email = sessionStorage.getItem("resetEmail");

  const handleVerify = async () => {

    if (!otp.trim()) {
      toast.error("OTP is required.");
      return;
    }

    if (!email) {
      toast.error("Email not found. Please try again.");
      navigate("/forget");
      return;
    }

    try {

      const response = await api.post(
        "/auth/verify-reset-otp",
        {
          email,
          otp: otp.trim(),
        }
      );

      sessionStorage.setItem(
        "resetOTP",
        otp.trim()
      );

      toast.success(response.data.message);

      navigate("/resetpassword");

    } catch (err) {

      const message =
        err.response?.data?.message ||
        "Something went wrong.";

      toast.error(message);
    }
  };


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
              <h5 className="text-primary">Verify Code</h5>
            </div>
          </Container>
        </div>
      </div>

      <div className="flex justify-center py-20">
        <div className="w-130 bg-white rounded-lg shadow-[0_4px_10px_rgba(0,38,3,0.08)] border border-[#f2f2f2] px-6 pt-6 pb-8">

          <div className='text-center'>
            <h2 className='flex justify-center font-pop font-semibold text-hsize text-logoc leading-[120%]'>
              Verify code
            </h2>
            <p className='defaultfs text-grynine pt-2'>An authentication code has been sent to your email.</p>
          </div>

          <div className="pt-5 pb-2">
            <input
              name="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter your code"
              className="w-full border border-brdr font-pop font-normal text-[16px] text-grynine leading-[130%] ps-4 py-3.5 rounded-md outline-none"
            />

          </div>
          <div className="pb-3 ps-1.5">
            <ResendTimer />
          </div>

          <button
            onClick={handleVerify}
            className="w-full bg-primary py-3.5 font-pop font-semibold text-sm text-white leading-[120%] rounded-[43px] cursor-pointer"
          >
            Verify
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

export default Verify;

