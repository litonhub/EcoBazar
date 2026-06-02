import React from 'react'
import Container from './layouts/Container'
import Truck from '../assets/svg/Truck'
import Headphone from '../assets/svg/Headphone'
import Bag from '../assets/svg/Bag'
import Package from '../assets/svg/Package'

const StoreBenefits = () => {
  return (
    <Container className='pb-10'>
        <div className="flex items-center justify-between bg-white rounded-lg shadow-[0px_8px_40px_0px_rgba(0,38,3,0.08)] py-10 px-10">
            <div className="flex gap-x-4">
                <Truck />
                <div>
                    <h4 className='font-pop font-semibold text-base text-logoc leading-[120%] pb-2'>Free Shipping</h4>
                    <p className='defaultfs text-grynine'>Free shipping on all your order</p>
                </div>
            </div>
            <div className="flex gap-x-4">
                <Headphone />
                <div>
                    <h4 className='font-pop font-semibold text-base text-logoc leading-[120%] pb-2'>Customer Support 24/7</h4>
                    <p className='defaultfs text-grynine'>Instant access to Support</p>
                </div>
            </div>
            <div className="flex gap-x-4">
                <Bag />
                <div>
                    <h4 className='font-pop font-semibold text-base text-logoc leading-[120%] pb-2'>100% Secure Payment</h4>
                    <p className='defaultfs text-grynine'>We ensure your money is save</p>
                </div>
            </div>
            <div className="flex gap-x-4">
                <Package />
                <div>
                    <h4 className='font-pop font-semibold text-base text-logoc leading-[120%] pb-2'>Money-Back Guarantee</h4>
                    <p className='defaultfs text-grynine'>30 Days Money-Back Guarantee</p>
                </div>
            </div>
        </div>
    </Container>
  )
}

export default StoreBenefits;
