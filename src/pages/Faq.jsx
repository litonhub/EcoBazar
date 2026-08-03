import React, { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import Container from '../components/layouts/Container';
import Faqimg from '../assets/images/faqimg.png';

const Faq = () => {

  const [openId, setOpenId] = useState(1);

  const faqData = [
    {
      id: 1,
      question: "In elementum est a ante sodales iaculis.",
      answer: "Morbi porttitor ligula in nunc varius sagittis. Proin dui nisi, laoreet ut tempor ac, cursus vitae eros. Cras quis ultricies elit. Proin ac lectus arcu. Maecenas aliquet vel tellus at accumsan. Donec a eros non massa vulputate ornare. Vivamus ornare commodo ante, at commodo felis congue vitae."
    },
    {
      id: 2,
      question: "Etiam lobortis massa eu nibh tempor elementum.",
      answer: "Morbi porttitor ligula in nunc varius sagittis. Proin dui nisi, laoreet ut tempor ac, cursus vitae eros. Cras quis ultricies elit. Proin ac lectus arcu."
    },
    {
      id: 3,
      question: "In elementum est a ante sodales iaculis.",
      answer: "Maecenas aliquet vel tellus at accumsan. Donec a eros non massa vulputate ornare. Vivamus ornare commodo ante, at commodo felis congue vitae."
    },
    {
      id: 4,
      question: "Aenean quis quam nec lacus semper dignissim.",
      answer: "Proin dui nisi, laoreet ut tempor ac, cursus vitae eros. Cras quis ultricies elit. Proin ac lectus arcu."
    },
    {
      id: 5,
      question: "Nulla tincidunt eros id tempus accumsan.",
      answer: "Donec a eros non massa vulputate ornare. Vivamus ornare commodo ante, at commodo felis congue vitae."
    }
  ];

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-white font-pop overflow-hidden pt-10 lg:pt-0">
      <Container>

        <div className="flex flex-col lg:flex-row items-end lg:gap-18.25 justify-between">
          <div className="w-full lg:w-148 shrink-0 pb-12 lg:pb-26.5 lg:pt-47 flex flex-col">
            <h2 className="text-hsize lg:text-[42px] font-semibold text-logoc leading-[1.2] mb-10">
              Welcome, Let's Talk<br />About Our Ecobazar
            </h2>

            <div className="flex flex-col gap-4">
              {faqData.map((item) => {
                const isActive = openId === item.id;

                return (
                  <div 
                    key={item.id} 
                    className={`rounded-lg overflow-hidden transition-all duration-300 ${
                      isActive ? 'bg-white border border-[#00B207]' : 'bg-[#F2F2F2] border border-transparent'
                    }`}
                  >
                    <button 
                      onClick={() => toggleFaq(item.id)}
                      className={`w-full flex items-center justify-between px-6 py-4.5 cursor-pointer outline-none transition-colors duration-300 ${
                        isActive ? 'border-b border-[#00B207]' : 'border-b border-transparent'
                      }`}
                    >
                      <h3 
                        className={`text-[16px] font-medium text-left transition-colors duration-300 ${
                          isActive ? 'text-[#00B207]' : 'text-logoc'
                        }`}
                      >
                        {item.question}
                      </h3>
                      <div 
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
                          isActive ? 'bg-[#f2f2f2] text-logoc' : 'bg-white text-logoc'
                        }`}
                      >
                        {isActive ? <FiMinus size={16} /> : <FiPlus size={16} />}
                      </div>
                    </button>

                    <div 
                      className={`grid transition-all duration-300 ease-in-out ${
                        isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 pt-4 text-gry text-[14px] leading-[1.7]">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full lg:w-185.25 flex justify-center lg:justify-end items-end">
            <img 
              src={Faqimg} 
              alt="Farmer holding vegetables" 
              className="w-full lg:w-185.25 h-auto lg:h-202 object-contain object-bottom block"
              style={{ marginBottom: '-1px' }}
            />
          </div>

        </div>
      </Container>
    </section>
  );
};

export default Faq;