import React, { useState } from 'react' // ✅ added
import Navimg from '../assets/images/navigation-img.png'
import { Link } from 'react-router';
import Container from '../components/layouts/Container';
import axios from 'axios';
import ResendTimer from '../components/common/ResendTimer';
import PageBanner from '../components/common/PageBanner';

const Forget = () => {

  const [email, setEmail] = useState("")

  const handleForget = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/forgotpassword",
        { email }
      );

      console.log(res.data);

      if (res.data.success) {
        alert(res.data.message);
      } else {
        alert(res.data.message);
      }

    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <PageBanner
        items={[
          "Account",
          "Forget Password",
        ]}
      />

      <div className="flex justify-center py-20">
        <div className="w-130 bg-white rounded-lg shadow-[0_4px_10px_rgba(0,38,3,0.08)] border border-[#f2f2f2] px-6 pt-6 pb-8 text-center">

          <h2 className='flex justify-center font-pop font-semibold text-hsize text-logoc leading-[120%]'>
            Forget your password?
          </h2>
          <p className='defaultfs text-grynine pt-2'>Enter your email below to recover your password</p>

          <div className="pt-5 pb-1">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-brdr font-pop font-normal text-[16px] text-black placeholder:text-grynine leading-[130%] ps-4 py-3.5 rounded-md outline-none"
            />
          </div>
          <ResendTimer />

          <button
            onClick={handleForget}
            className="w-full bg-primary py-3.5 font-pop font-semibold text-sm text-white leading-[120%] rounded-[43px] cursor-pointer">
            Submit
          </button>

          <h3 className='pt-8.5 defaultfs text-gry text-center'>
            <Link to="/login" className='font-medium text-logoc underline'>
              Back to Sign in
            </Link>
          </h3>

        </div>
      </div>
    </>
  )
}

export default Forget;