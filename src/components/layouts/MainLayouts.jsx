import React from 'react'
import TopBar from '../TopBar'
import { Outlet } from 'react-router'

const MainLayouts = () => {
  return (
    <>
      <TopBar />
      <Outlet />
    </>
  )
}

export default MainLayouts
