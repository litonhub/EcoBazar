import React from 'react'
import Container from '../layouts/Container'
import { CiLocationOn } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";

const TopBar = () => {
  return (
    <div className='border-b border-solid border-brdr'>
     <Container>
        <div className='flex justify-between font-pop font-normal text-sm text-gry leading-[130%] py-3'>
            <div className='flex items-center gap-2'><CiLocationOn /> Store Location: Lincoln- 344, Illinois, Chicago, USA</div>
            <div className='flex gap-x-10'>
                <div className='flex gap-x-5'>
                    <div className='flex items-center gap-x-1.5'>Eng <FaAngleDown /></div>
                    <div className='flex items-center gap-x-1.5'>USD <FaAngleDown /></div>
                </div>
                <div className='relative after:w-px after:h-3.75 after:bg-brdr after:content-[] after:absolute after:top-0.5 after:-left-5'>
                    Sign In / Sign Up
                </div>
            </div>
        </div>
     </Container>
    </div>
  )
}

export default TopBar
