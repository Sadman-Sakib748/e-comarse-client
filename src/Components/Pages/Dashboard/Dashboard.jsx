import React, { useState } from 'react';
import { Outlet, Link } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import {
  Home,
  Package,
  CreditCard,
  User,
  LogOut
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [role, isLoading] = useRole();

  const [activeView, setActiveView] = useState(role);

  if (isLoading) return <div className="p-4">Loading...</div>;

  const roleRouteMap = {
    user: `/dashboard/payment/${user?.uid}`,
    vendor: '/dashboard/product',
    admin: '/dashboard/allUsers',
  };

  const roles = ['user', 'vendor', 'admin'];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-6">Dashboard</h2>
        <nav className="space-y-4 flex-1">
          <Link to="/dashboard/home" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200">
            <Home className="w-5 h-5" /> Home
          </Link>

          {role === 'vendor' && (
            <>
              <Link to="/dashboard/product" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200">
                <Package className="w-5 h-5" /> Product
              </Link>
              <Link to="/dashboard/createProduct" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200">
                <CreditCard className="w-5 h-5" /> Create Product
              </Link>
              <Link to="/dashboard/myProducts" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200">
                <CreditCard className="w-5 h-5" /> My Products
              </Link>
              <Link to="/dashboard/venAddAdver" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200">
                <CreditCard className="w-5 h-5" />  Add Advertisements
              </Link>
              <Link to="/dashboard/MyAdvertisements" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200">
                <CreditCard className="w-5 h-5" /> My Advertisements
              </Link>
            </>
          )}

          {role === 'admin' && (
            <>
              <Link to="/dashboard/allUsers" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200">
                <User className="w-5 h-5" /> All Users
              </Link>
              <Link to="/dashboard/allUsers" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200">
                <User className="w-5 h-5" /> All product
              </Link>
              <Link to="/dashboard/allUsers" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200">
                <User className="w-5 h-5" /> All  Advertisement
              </Link>
              <Link to="/dashboard/allUsers" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200">
                <User className="w-5 h-5" /> All Order
              </Link>
            </>
          )}

          {role === 'user' && (
            <>
              <Link to="/dashboard/updateProfile" className="flex items-center gap-2 px-4 py-2 rounded text-red-500 hover:bg-red-100">
                <User className="w-5 h-5" /> Update Profile
              </Link>
              <Link to={`/dashboard/payment/${user?.uid}`} className="flex items-center gap-2 px-4 py-2 rounded text-red-500 hover:bg-red-100">
                <CreditCard className="w-5 h-5" /> Payment
              </Link>
            </>
          )}

          <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded text-red-500 hover:bg-red-100">
            <LogOut className="w-5 h-5" /> Back to Home
          </Link>
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-300">
          <p className="font-semibold mb-2 text-center">View Data by Role</p>
          <div className="flex justify-around">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setActiveView(r)}
                className={`px-3 py-1 rounded font-medium transition
                  ${activeView === r ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                `}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>
          <div className="mt-3 text-center">
            <Link
              to={roleRouteMap[activeView] || '/dashboard/home'}
              className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Go to {activeView ? activeView.charAt(0).toUpperCase() + activeView.slice(1) : ''}
            </Link>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow px-6 py-4">
          <h1 className="text-xl font-semibold">Welcome to Dashboard</h1>
          <p className="text-sm text-gray-600">Logged in as: {user?.email}</p>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
