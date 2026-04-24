import React from 'react'
import TopBar from '../header/TopBar'
import { Outlet } from 'react-router'
import MainHeader from '../header/MainHeader'
import Navbar from '../header/Navbar'

const MainLayouts = () => {
  return (
    <>
      <TopBar />
      <MainHeader />
      <Navbar />
      <Outlet />
    </>
  )
}

export default MainLayouts
