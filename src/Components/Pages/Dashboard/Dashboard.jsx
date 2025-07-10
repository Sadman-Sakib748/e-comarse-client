import React from 'react';
import { Outlet, Link } from 'react-router';
import useAuth from '../../hooks/useAuth';

const Dashboard = () => {
    const {user} = useAuth();
    const email = user?.email;
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-4">
                <h2 className="text-2xl font-bold text-center mb-6">Dashboard</h2>
                <nav className="space-y-4">
                    <Link to="/dashboard/home" className="block px-4 py-2 rounded hover:bg-gray-200">
                        Home
                    </Link>
                    <Link to={`/dashboard/product/${email}`} className="block px-4 py-2 rounded hover:bg-gray-200">
                        Product
                    </Link>
                    <Link to="/dashboard/settings" className="block px-4 py-2 rounded hover:bg-gray-200">Settings</Link>
                    <Link to="/" className="block px-4 py-2 rounded text-red-500 hover:bg-red-100">Back to Home</Link>
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Top Navbar */}
                <header className="bg-white shadow px-6 py-4">
                    <h1 className="text-xl font-semibold">Welcome to Admin Dashboard</h1>
                </header>

                {/* Routed Content */}
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
