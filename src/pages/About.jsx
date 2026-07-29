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
        {/* First Section */}
        <div className="py-12 lg:py-20 px-4 md:px-6 lg:px-0">
          <div className='flex flex-col lg:flex-row justify-between items-center gap-10'>
            <div className="w-full lg:w-151 text-center lg:text-left">
              <h1 className='font-pop font-semibold text-[32px] md:text-[40px] lg:text-[56px] text-logoc leading-[120%] pb-4 lg:pb-8'>
                100% Trusted Organic Food Store
              </h1>
              <p className='font-pop font-normal text-[15px] lg:text-[18px] text-gry leading-[150%] text-justify lg:text-left'>
                Morbi porttitor ligula in nunc varius sagittis. Proin dui nisi, laoreet ut tempor ac, cursus vitae eros. Cras quis ultricies elit. Proin ac lectus arcu. Maecenas aliquet vel tellus at accumsan. Donec a eros non massa vulputate ornare. Vivamus ornare commodo ante, at commodo felis congue vitae.
              </p>
            </div>
            <div className="w-full lg:w-179">
              <img src={Aboutone} alt="About Img" className='rounded-lg w-full h-auto object-cover' />
            </div>
          </div>
        </div>

        {/* Second Section */}
        <div className='flex flex-col lg:flex-row items-center gap-8 lg:gap-x-5 px-4 md:px-6 lg:px-0 pb-12 lg:pb-20'>
          
          <img src={Abouttwo} alt="About Img" className='rounded-lg lg:rounded-l-lg lg:rounded-r-none w-full lg:w-1/2 h-auto object-cover' />
          
          <div className="w-full lg:w-auto">
            <div className='w-full lg:w-142.5 text-center lg:text-left'>
              <h1 className='font-pop font-semibold text-[32px] md:text-[40px] lg:text-[56px] text-logoc leading-[120%] pb-4 lg:pb-8'>
                100% Trusted Organic Food Store
              </h1>
              <p className='font-pop font-normal text-[14px] lg:text-[16px] text-gryd leading-[150%] text-justify lg:text-left'>
                Pellentesque a ante vulputate leo porttitor luctus sed eget eros. Nulla et rhoncus neque. Duis non diam eget est luctus tincidunt a a mi. Nulla eu eros consequat tortor tincidunt feugiat.
              </p>
            </div>

            {/* Features Grid */}
            <div className="flex flex-col sm:flex-row items-start lg:items-center gap-6 lg:gap-x-6 pt-8 lg:pt-6">
              
              {/* Column 1 */}
              <div className="flex flex-col gap-y-6 w-full sm:w-1/2">
                <div className="flex items-center gap-x-4">
                  <div className="bg-[rgba(0,178,6,0.1)] w-14 h-14 lg:w-18 lg:h-18 rounded-full flex justify-center items-center shrink-0">
                    <Leaf />
                  </div>
                  <div>
                    <h2 className='font-pop font-medium text-[16px] lg:text-[18px] text-logoc leading-[150%] pb-1 lg:pb-2'>100% Organic food</h2>
                    <p className='text-[13px] lg:defaultfs text-gryd'>100% healthy & Fresh food.</p>
                  </div>
                </div>

                <div className="flex items-center gap-x-4">
                  <div className="bg-[rgba(0,178,6,0.1)] w-14 h-14 lg:w-18 lg:h-18 rounded-full flex justify-center items-center shrink-0">
                    <Star />
                  </div>
                  <div>
                    <h2 className='font-pop font-medium text-[16px] lg:text-[18px] text-logoc leading-[150%] pb-1 lg:pb-2'>Customer Feedback</h2>
                    <p className='text-[13px] lg:defaultfs text-gryd'>Our happy customer</p>
                  </div>
                </div>

                <div className="flex items-center gap-x-4">
                  <div className="bg-[rgba(0,178,6,0.1)] w-14 h-14 lg:w-18 lg:h-18 rounded-full flex justify-center items-center shrink-0">
                    <Truck />
                  </div>
                  <div>
                    <h2 className='font-pop font-medium text-[16px] lg:text-[18px] text-logoc leading-[150%] pb-1 lg:pb-2'>Free Shipping</h2>
                    <p className='text-[13px] lg:defaultfs text-gryd'>Free shipping with discount</p>
                  </div>
                </div>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-y-6 w-full sm:w-1/2">
                <div className="flex items-center gap-x-4">
                  <div className="bg-[rgba(0,178,6,0.1)] w-14 h-14 lg:w-18 lg:h-18 rounded-full flex justify-center items-center shrink-0">
                    <Headphone />
                  </div>
                  <div>
                    <h2 className='font-pop font-medium text-[16px] lg:text-[18px] text-logoc leading-[150%] pb-1 lg:pb-2'>Great Support 24/7</h2>
                    <p className='text-[13px] lg:defaultfs text-gryd'>Instant access to Contact</p>
                  </div>
                </div>

                <div className="flex items-center gap-x-4">
                  <div className="bg-[rgba(0,178,6,0.1)] w-14 h-14 lg:w-18 lg:h-18 rounded-full flex justify-center items-center shrink-0">
                    <Bag />
                  </div>
                  <div>
                    <h2 className='font-pop font-medium text-[16px] lg:text-[18px] text-logoc leading-[150%] pb-1 lg:pb-2'>100% Sucure Payment</h2>
                    <p className='text-[13px] lg:defaultfs text-gryd'>We ensure your money is save</p>
                  </div>
                </div>

                <div className="flex items-center gap-x-4">
                  <div className="bg-[rgba(0,178,6,0.1)] w-14 h-14 lg:w-18 lg:h-18 rounded-full flex justify-center items-center shrink-0">
                    <Package />
                  </div>
                  <div>
                    <h2 className='font-pop font-medium text-[16px] lg:text-[18px] text-logoc leading-[150%] pb-1 lg:pb-2'>Money-Back Guarantee</h2>
                    <p className='text-[13px] lg:defaultfs text-gryd'>30 Days Money-Back Guarantee</p>
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