import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Footer from '../Components/Footer/Footer';

const MainLayout = () => {
    return (
        <div className='flex flex-col justify-between min-h-screen'>
            <ToastContainer
            position="bottom-right"
            ></ToastContainer>
            <Navbar></Navbar>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
            
        </div>
    );
};

export default MainLayout;