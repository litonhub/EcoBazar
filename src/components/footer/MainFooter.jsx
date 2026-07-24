import React from 'react'
import { FaApple, FaGooglePlay } from "react-icons/fa";
import Container from '../layouts/Container';
import footerlogo from '../../assets/images/footerlogo.png'
import ApplePay from '../../assets/images/applepay.png'
import Visa from '../../assets/images/visa.png'
import Discover from '../../assets/images/Discover.png'
import Mastercard from '../../assets/images/Mastercard.png'
import SecureP from '../../assets/images/securep.png'
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

const MainFooter = () => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t('footer.col1.title'),
      links: [
        t('footer.col1.link1'),
        t('footer.col1.link2'),
        t('footer.col1.link3'),
        t('footer.col1.link4')
      ],
    },
    {
      title: t('footer.col2.title'),
      links: [
        t('footer.col2.link1'),
        t('footer.col2.link2'),
        t('footer.col2.link3'),
        t('footer.col2.link4')
      ],
    },
    {
      title: t('footer.col3.title'),
      links: [
        t('footer.col3.link1'),
        t('footer.col3.link2'),
        t('footer.col3.link3'),
        t('footer.col3.link4')
      ],
    },
  ];

  return (
    <div className="bg-logoc">
      <Container>
        <footer>
          <div className="py-15 flex justify-between">
            <div className="max-w-95">
              <img src={footerlogo} alt="footerlogo" />
              <p className='font-pop font-normal text-sm text-gryd leading-[150%] py-4 mr-9'>
                {t('footer.description')}
              </p>
              <div className="flex gap-x-4">
                <div className="flex items-center gap-x-3 font-pop leading-[150%] relative">
                  <Link to='tel:+8801701054694' className="text-white font-medium font-sm">{t('footer.phone_number')}</Link>
                  <span className="absolute left-0 -bottom-1 w-[41%] h-0.5 bg-primary"></span>
                  <span className='text-[16px] font-normal text-gryd'>{t('footer.or')}</span>
                  <Link to='mailto:liton01766@gmail.com' className="text-white font-medium font-sm underline">{t('footer.email')}</Link>
                  <span className="absolute right-0 -bottom-1 w-[49%] h-0.5 bg-primary"></span>
                </div>
              </div>
            </div>
            <div className="flex gap-x-19.5">
              {columns.map((col, i) => (
                <div key={i}>
                  <h4 className="font-pop text-white text-16px leading-[150%] mb-5 font-medium relative inline-block">
                    {col.title}
                    <span className="absolute left-0 -bottom-1 w-6 h-0.5 bg-primary"></span>
                  </h4>

                  <ul className="space-y-3">
                    {col.links.map((link, idx) => (
                      <li key={idx} className="defaultfs text-grynine hover:text-white cursor-pointer">
                        {link}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div>
              <h4 className="text-white font-pop text-[20px] leading-[150%] mb-7.5 font-medium relative inline-block">
                {t('footer.download_app_title')}
                <span className="absolute left-0 -bottom-1 w-6 h-0.5 bg-primary"></span>
              </h4>

              <div className="flex gap-x-2">
                <div className="flex items-center gap-1.5 bg-subb p-2.5 rounded-sm cursor-pointer hover:bg-gray-700 transition">
                  <FaApple className="size-7 text-white" />
                  <div className="text-pop">
                    <p className='font-normal text-xs text-[#B3B3B3] leading-[130%]'>{t('footer.download_on')}</p>
                    <p className="text-white text-[16px] font-medium leading-[150%]">{t('footer.app_store')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-x-1.5 bg-subb p-2.5 rounded-sm cursor-pointer hover:bg-gray-700 transition">
                  <FaGooglePlay className="size-6 text-white" />
                  <div className="text-pop">
                    <p className='font-normal text-xs text-[#B3B3B3] leading-[130%]'>{t('footer.download_on')}</p>
                    <p className="text-white text-[16px] font-medium leading-[150%]">{t('footer.google_play')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-subb py-6 flex items-center justify-between">
            <p className="defaultfs text-gryd">
              {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-x-3">
              <img src={ApplePay} alt="" />
              <img src={Visa} alt="" />
              <img src={Discover} alt="" />
              <img src={Mastercard} alt="" />
              <img src={SecureP} alt="" />
            </div>
          </div>
        </footer>
      </Container>
    </div>
  )
}

export default MainFooter;