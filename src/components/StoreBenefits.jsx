import React from 'react'
import Container from './layouts/Container'
import Truck from '../assets/svg/Truck'
import Headphone from '../assets/svg/Headphone'
import Bag from '../assets/svg/Bag'
import Package from '../assets/svg/Package'
import { useTranslation } from 'react-i18next'

const StoreBenefits = () => {
    const { t } = useTranslation();

    return (
        <Container className='pb-10'>
            <div className="flex items-center justify-between bg-white rounded-lg shadow-[0px_8px_40px_0px_rgba(0,38,3,0.08)] py-10 px-10">
                <div className="flex gap-x-4">
                    <Truck />
                    <div>
                        <h4 className='font-pop font-semibold text-base text-logoc leading-[120%] pb-2'>{t('store_benefits.free_shipping.title')}</h4>
                        <p className='defaultfs text-grynine'>{t('store_benefits.free_shipping.desc')}</p>
                    </div>
                </div>
                <div className="flex gap-x-4">
                    <Headphone />
                    <div>
                        <h4 className='font-pop font-semibold text-base text-logoc leading-[120%] pb-2'>{t('store_benefits.support.title')}</h4>
                        <p className='defaultfs text-grynine'>{t('store_benefits.support.desc')}</p>
                    </div>
                </div>
                <div className="flex gap-x-4">
                    <Bag />
                    <div>
                        <h4 className='font-pop font-semibold text-base text-logoc leading-[120%] pb-2'>{t('store_benefits.secure_payment.title')}</h4>
                        <p className='defaultfs text-grynine'>{t('store_benefits.secure_payment.desc')}</p>
                    </div>
                </div>
                <div className="flex gap-x-4">
                    <Package />
                    <div>
                        <h4 className='font-pop font-semibold text-base text-logoc leading-[120%] pb-2'>{t('store_benefits.money_back.title')}</h4>
                        <p className='defaultfs text-grynine'>{t('store_benefits.money_back.desc')}</p>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default StoreBenefits;