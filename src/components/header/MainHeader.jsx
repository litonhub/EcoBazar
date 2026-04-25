import React from 'react'
import Container from '../layouts/Container';
import Logo from '../../assets/images/Logo.png'
import { FiSearch } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const MainHeader = () => {
    return (
        <Container>
            <div className="flex items-center justify-between py-6">

                <img src={Logo} alt="" />

                <div className="flex w-124.5 relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full border border-brdr font-pop text-[15px] text-[#808080] ps-11 py-3.5 rounded-md outline-none"
                    />
                    <FiSearch className='absolute top-4 left-4 size-5 text-logoc' />
                    <button className="bg-primary text-white text-sm font-semibold font-pop leading-[120%] px-6 py-4.25 absolute right-0 rounded-r-md top-px">Search</button>
                </div>

                <div className="flex items-center gap-x-8">
                    <div>
                        <AiOutlineHeart className="size-8 text-logoc cursor-pointer" />
                    </div>

                    <div className="flex items-center gap-x-3 cursor-pointer relative after:w-px after:h-6 after:bg-brdr after:content-[] after:absolute after:top-1 after:-left-4">
                        <div className='relative'>
                            <HiOutlineShoppingBag className='size-8 text-logoc' />
                            <div className='w-4.5 h-4.5 rounded-full leading-4.5 text-center bg-[#2C742F] text-white font-pop font-medium text-sm absolute -top-0.5 -right-0.5'>2</div>
                        </div>
                        <div>
                            <p className="font-pop font-normal text-sm text-[#4D4D4D] leading-[120%]">Shopping cart:</p>
                            <p className="font-pop font-medium text-sm text-logoc leading-[100%]">$57.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default MainHeader
