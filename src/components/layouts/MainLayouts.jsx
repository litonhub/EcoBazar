import React from 'react'
import TopBar from '../header/TopBar'
import { Outlet } from 'react-router'
import MainHeader from '../header/MainHeader'

const MainLayouts = () => {
  return (
    <>
      <TopBar />
      <MainHeader />
      <Outlet />
    </>
  )
}

export default MainLayouts
