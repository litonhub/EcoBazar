import React, { useState, useEffect } from "react";
import TopBar from "../header/TopBar";
import { Outlet } from "react-router";
import MainHeader from "../header/MainHeader";
import Navbar from "../header/Navbar";
import FooterNewsletter from "../footer/FooterNewsletter";
import MainFooter from "../footer/MainFooter";
import NewsletterModal from "../NewsletterModal";

const MainLayouts = () => {

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hide = localStorage.getItem("hideModal");

    if (!hide || hide === "false") {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
     <>
      <TopBar />
      <MainHeader />
      <Navbar />

      <NewsletterModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
      
      <Outlet />
      <FooterNewsletter />
      <MainFooter />
    </>
  )
}

export default MainLayouts
