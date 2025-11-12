import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Footer from "../Components/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-linear-to-b from-green-50 via-green-100 to-green-200  dark:bg-neutral-900 dark:via-neutral-700 dark:to-neutral-800">
      {/* Navbar Section */}
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="grow">
        <ToastContainer position="bottom-right" />
        <div>
          <Outlet />
        </div>
      </main>

      {/* Footer Section */}
      <footer className=" backdrop-blur-md border-t border-green-200 shadow-inner">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
