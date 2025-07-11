import React from 'react';
import { Outlet, Link } from 'react-router'; // Use 'react-router-dom' instead of 'react-router'
import useAuth from '../../hooks/useAuth';
import {
  Home,
  Package,
  CreditCard,
  User,
  LogOut
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const email = user?.email;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-2xl font-bold text-center mb-6">Dashboard</h2>
        <nav className="space-y-4">
          <Link to="/dashboard/home" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200">
            <Home className="w-5 h-5" /> Home
          </Link>
          <Link to={`/dashboard/product`} className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200">
            <Package className="w-5 h-5" /> Product
          </Link>
          <Link to="/dashboard/paymentHistory" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200">
            <CreditCard className="w-5 h-5" /> Payment History
          </Link>
          <Link to="/dashboard/createProduct" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200">
            <CreditCard className="w-5 h-5" /> Create Product
          </Link>
          <Link to="/dashboard/myProducts" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200">
            <CreditCard className="w-5 h-5" /> My Products
          </Link>
          <Link to="/dashboard/updateProfile" className="flex items-center gap-2 px-4 py-2 rounded text-red-500 hover:bg-red-100">
            <User className="w-5 h-5" /> Update Profile
          </Link>
          <Link to="/dashboard/allUsers" className="flex items-center gap-2 px-4 py-2 rounded text-red-500 hover:bg-red-100">
            <User className="w-5 h-5" /> all Users
          </Link>
          <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded text-red-500 hover:bg-red-100">
            <LogOut className="w-5 h-5" /> Back to Home
          </Link>
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
