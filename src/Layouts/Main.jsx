import React from 'react';
import { Outlet } from 'react-router';
import NavBer from '../Components/Pages/NavBer/NavBer';
import Footer from '../Components/Pages/Footer/Footer';

const Main = () => {
    return (
        <div>
            <NavBer></NavBer>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;