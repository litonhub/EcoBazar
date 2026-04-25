import React from 'react'
import TopBar from '../header/TopBar'
import { Outlet } from 'react-router'
import MainHeader from '../header/MainHeader'
import Navbar from '../header/Navbar'
import FooterNewsletter from '../footer/FooterNewsletter'
import MainFooter from '../footer/MainFooter'

const MainLayouts = () => {
  return (
    <>
      <TopBar />
      <MainHeader />
      <Navbar />
      <Outlet />
      <FooterNewsletter />
      <MainFooter />
    </>
  )
}

export default MainLayouts
