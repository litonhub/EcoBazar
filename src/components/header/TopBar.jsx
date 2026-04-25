import React, { useState } from 'react'
import Container from '../layouts/Container'
import { CiLocationOn } from "react-icons/ci";
import Dropdown from '../common/Dropdown';

const TopBar = () => {

  const [language, setLanguage] = useState("Eng");
  const [currency, setCurrency] = useState("USD");

  return (
    <div className='border-b border-solid border-brdr'>
      <Container>
        <div className='flex justify-between items-center font-pop font-normal text-sm leading-[130%] text-gry py-3'>
          <div className='flex items-center gap-2'>
            <CiLocationOn />
            Store Location: Lincoln- 344, Illinois, Chicago, USA
          </div>
          <div className='flex items-center gap-x-10'>
            <div className='flex items-center gap-x-5'>

              <Dropdown
                options={["Eng", "Bng", "Fra"]}
                value={language}
                onChange={setLanguage}
              />
              <Dropdown
                options={["USD", "BDT", "EUR"]}
                value={currency}
                onChange={setCurrency}
              />
            </div>
            <div className='relative after:w-px after:h-3.75 after:bg-brdr after:content-[] after:absolute after:top-0.5 after:-left-5 cursor-pointer'>
              Sign In / Sign Up
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default TopBar;