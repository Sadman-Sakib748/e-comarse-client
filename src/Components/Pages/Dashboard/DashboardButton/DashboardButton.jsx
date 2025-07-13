// src/components/DashboardButton.jsx
import React from 'react';
import { Link } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';


const DashboardButton = () => {
    const { user } = useAuth();
    const [role, isLoading] = useRole();

    if (!user || isLoading) return null;

    // Role-based dashboard route
    let dashboardPath = '/dashboard/home';
    if (role === 'admin') {
        dashboardPath = '/dashboard/allUsers';
    } else if (role === 'vendor') {
        dashboardPath = '/dashboard/product';
    } else if (role === 'user') {
        dashboardPath = `/dashboard/payment/${user?.uid || '123456'}`;
    }

    return (
        <Link
            to={dashboardPath}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
            Dashboard
        </Link>
    );
};

export default DashboardButton;
