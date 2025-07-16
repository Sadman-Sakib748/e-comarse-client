import React, { useState } from "react";
import { Link, NavLink } from "react-router"; 
import { Menu, X, ShoppingCart, TrendingUp, MapPin } from "lucide-react"; 
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import useRole from "../../hooks/useRole";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();
  const [role, roleLoading] = useRole(); 

  const effectiveRole = (
    role ||
    user?.role ||
    user?.userRole ||
    user?.roleName ||
    "user"
  )
    .toString()
    .toLowerCase();

  // Determine dashboard destination path based on role
  const dashboardPath = effectiveRole === "admin" ? "/dashboard/allusers" : "/dashboard/home";
  // -------------------------------------------------------------------------

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => setIsOpen(false);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully!");
    } catch (err) {
      toast.error("Logout failed! " + (err?.message || ""));
    }
  };

  // central styles for NavLink
  const navBase = "flex items-center gap-1 px-3 py-2 rounded-md transition";
  const navClass = ({ isActive }) =>
    `${navBase} ${isActive ? "text-yellow-300" : "text-gray-700 hover:text-red-600"}`;

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={navClass} onClick={closeMenu}>
          <ShoppingCart className="h-4 w-4" />
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/BrowseAll" className={navClass} onClick={closeMenu}>
          <TrendingUp className="h-4 w-4" />
          All Products
        </NavLink>
      </li>

      <li>
        <NavLink to="/markets" className={navClass} onClick={closeMenu}>
          <MapPin className="h-4 w-4" />
          Markets
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/offer"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md transition ${isActive ? "text-yellow-300" : "text-gray-700 hover:text-red-600"}`
          }
          onClick={closeMenu}
        >
          Offers
        </NavLink>
      </li>

      {user && !roleLoading && (
        <li>
          <NavLink
            to={dashboardPath}
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition ${isActive ? "text-yellow-300" : "text-gray-700 hover:text-red-600"}`
            }
            onClick={closeMenu}
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-red-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3" onClick={closeMenu}>
            <div className="bg-gradient-to-r from-red-600 to-orange-600 p-2 rounded-xl">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-800">Daily Price Tracker</span>
              <div className="text-xs text-red-600 font-medium">Fresh Market</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navLinks}

            {/* User Menu */}
            {user ? (
              <>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                    className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-4 py-2 rounded font-semibold border-0"
                  >
                    Logout
                  </button>
                </li>
                <li className="flex items-center gap-2">
                  <img
                    src={user.photoURL || "https://i.ibb.co/2y8NwRF/avatar.png"}
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <span className="text-sm">{user.displayName || user.email}</span>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="hover:text-red-600 transition px-3 py-2 rounded-md"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="hover:text-red-600 transition px-3 py-2 rounded-md"
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 hover:text-red-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-red-100 rounded-b-md">
              <ul className="flex flex-col space-y-2 text-sm font-medium">
                {navLinks}

                {/* User Menu */}
                {user ? (
                  <>
                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          closeMenu();
                        }}
                        className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-4 py-2 rounded font-semibold border-0 w-full text-left"
                      >
                        Logout
                      </button>
                    </li>
                    <li className="flex items-center gap-2 px-3 py-2">
                      <img
                        src={user.photoURL || "https://i.ibb.co/2y8NwRF/avatar.png"}
                        alt="User"
                        className="w-7 h-7 rounded-full border"
                      />
                      <span>{user.displayName || user.email}</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className="hover:text-red-600 transition px-3 py-2 rounded-md block"
                        onClick={closeMenu}
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        className="hover:text-red-600 transition px-3 py-2 rounded-md block"
                        onClick={closeMenu}
                      >
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
