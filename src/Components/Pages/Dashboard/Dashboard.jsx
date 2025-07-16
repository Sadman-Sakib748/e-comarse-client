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
import Spinner from '../Spinner/Spinner';

const Dashboard = () => {
  const { user } = useAuth();
  const [role, isLoading] = useRole();


  if (isLoading) return <div className="p-4"><Spinner /></div>;



  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-6">Dashboard</h2>
        <nav className="space-y-4 flex-1">


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
              <Link to={`/dashboard/paymentHistory`} className="flex items-center gap-2 px-4 py-2 rounded text-red-500 hover:bg-red-100">
                <CreditCard className="w-5 h-5" /> Payment History
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
              <Link to="/dashboard/adminallProducts" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200">
                <User className="w-5 h-5" /> All product
              </Link>
              <Link to="/dashboard/adminOffersPage" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200">
                <User className="w-5 h-5" /> All  Advertisement
              </Link>
              <Link to="/dashboard/allOrder" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200">
                <User className="w-5 h-5" /> All Order
              </Link>

            </>
          )}

          {role === 'user' && (
            <>
              <Link to="/dashboard/home" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200">
                <Package className="w-5 h-5" /> Dashbord Home
              </Link>
              <Link to="/dashboard/product" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200">
                <Package className="w-5 h-5" /> Product
              </Link>
              <Link to="/dashboard/updateProfile" className="flex items-center gap-2 px-4 py-2 rounded text-red-500 hover:bg-red-100">
                <User className="w-5 h-5" /> Update Profile
              </Link>
              <Link to={`/dashboard/paymentHistory`} className="flex items-center gap-2 px-4 py-2 rounded text-red-500 hover:bg-red-100">
                <CreditCard className="w-5 h-5" /> Payment History
              </Link>
            </>
          )}

          <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded text-red-500 hover:bg-red-100">
            <LogOut className="w-5 h-5" /> Back to Home
          </Link>
        </nav>

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
