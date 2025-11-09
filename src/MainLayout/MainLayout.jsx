import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

const MainLayout = () => {
    return (
        <div>
            <ToastContainer
            position="bottom-right"
            ></ToastContainer>
            <Navbar></Navbar>
            <Outlet></Outlet>
            
        </div>
    );
};

export default MainLayout;