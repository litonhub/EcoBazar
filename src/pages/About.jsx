import React from 'react'
import PageBanner from '../components/common/PageBanner';
import Container from '../components/layouts/Container';
import Aboutone from '../assets/images/aboutone.webp'
import Abouttwo from '../assets/images/abouttwo.jpg'
import Truck from '../assets/svg/Truck';
import Package from '../assets/svg/Package';
import Bag from '../assets/svg/Bag';
import Headphone from '../assets/svg/Headphone';
import Leaf from '../assets/svg/Leaf';
import Star from '../assets/svg/Star';
const About = () => {
  return (
    <div>
      <PageBanner
        items={[
          "About",
        ]}
      />

      <Container>
        <div className="py-20">
          <div className='flex justify-between items-center gap-x-10'>
            <div className="w-151">
              <h1 className='font-pop font-semibold text-[56px] text-logoc leading-[120%] pb-8'>100% Trusted Organic Food Store</h1>
              <p className='font-pop font-normal text-[18px] text-gry leading-[150%]'>Morbi porttitor ligula in nunc varius sagittis. Proin dui nisi, laoreet ut tempor ac, cursus vitae eros. Cras quis ultricies elit. Proin ac lectus arcu. Maecenas aliquet vel tellus at accumsan. Donec a eros non massa vulputate ornare. Vivamus ornare commodo ante, at commodo felis congue vitae.
              </p>
            </div>
            <div className="w-179">
              <img src={Aboutone} alt="About Img" className='rounded-lg' />
            </div>
          </div>
        </div>
      <div className='flex items-center gap-x-5'>
        <img src={Abouttwo} alt="About Img" className='rounded-l-lg' />
        <div >
          <div className='w-142.5'>
            <h1 className='font-pop font-semibold text-[56px] text-logoc leading-[120%] pb-8'>100% Trusted Organic Food Store</h1>
            <p className='font-pop font-normal text-[16px] text-gryd leading-[150%]'>Pellentesque a ante vulputate leo porttitor luctus sed eget eros. Nulla et rhoncus neque. Duis non diam eget est luctus tincidunt a a mi. Nulla eu eros consequat tortor tincidunt feugiat.</p>
          </div>

          <div className="flex items-center gap-x-6 pt-6">
            <div className="flex flex-col gap-y-6">
              <div className="flex items-center gap-x-4">
                <div className="bg-[rgba(0,178,6,0.1)] w-18 h-18 rounded-full flex justify-center items-center">

                  <Leaf />

                </div>
                <div >
                  <h2 className='font-pop font-medium text-[18px] text-logoc leading-[150%] pb-2'>100% Organic food</h2>
                  <p className='defaultfs text-gryd'>100% healthy & Fresh food.</p>
                </div>
              </div>

              <div className="flex items-center gap-x-4">
                <div className="bg-[rgba(0,178,6,0.1)] w-18 h-18 rounded-full flex justify-center items-center">

                  <Star />

                </div>
                <div >
                  <h2 className='font-pop font-medium text-[18px] text-logoc leading-[150%] pb-2'>Customer Feedback</h2>
                  <p className='defaultfs text-gryd'>Our happy customer</p>
                </div>
              </div>

              <div className="flex items-center gap-x-4">
                <div className="bg-[rgba(0,178,6,0.1)] w-18 h-18 rounded-full flex justify-center items-center">

                  <Truck />

                </div>
                <div >
                  <h2 className='font-pop font-medium text-[18px] text-logoc leading-[150%] pb-2'>Free Shipping</h2>
                  <p className='defaultfs text-gryd'>Free shipping with discount</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-6">
              <div className="flex items-center gap-x-4">
                <div className="bg-[rgba(0,178,6,0.1)] w-18 h-18 rounded-full flex justify-center items-center">

                  <Headphone />

                </div>
                <div >
                  <h2 className='font-pop font-medium text-[18px] text-logoc leading-[150%] pb-2'>Great Support 24/7</h2>
                  <p className='defaultfs text-gryd'>Instant access to Contact</p>
                </div>
              </div>

              <div className="flex items-center gap-x-4">
                <div className="bg-[rgba(0,178,6,0.1)] w-18 h-18 rounded-full flex justify-center items-center">

                  <Bag />

                </div>
                <div >
                  <h2 className='font-pop font-medium text-[18px] text-logoc leading-[150%] pb-2'>100% Sucure Payment</h2>
                  <p className='defaultfs text-gryd'>We ensure your money is save</p>
                </div>
              </div>

              <div className="flex items-center gap-x-4">
                <div className="bg-[rgba(0,178,6,0.1)] w-18 h-18 rounded-full flex justify-center items-center">

                  <Package />

                </div>
                <div >
                  <h2 className='font-pop font-medium text-[18px] text-logoc leading-[150%] pb-2'>Money-Back Guarantee</h2>
                  <p className='defaultfs text-gryd'>30 Days Money-Back Guarantee</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      </Container>
    </div>
  )
}

export default About;
