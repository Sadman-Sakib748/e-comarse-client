import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X, ShoppingCart, TrendingUp, MapPin, Globe } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("en"); // language toggle still present, but only English text now
  const { user, logOut } = useAuth();
  const [userRole, setUserRole] = useState("user"); // user, vendor, admin

  const toggleLanguage = () => {
    // You can disable or remove this if you want to only keep English
    setLanguage(language === "en" ? "en" : "en");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully!");
    } catch (err) {
      toast.error("Logout failed! " + (err.message || ""));
    }
  };

  // const getDashboardRoute = () => {
  //   switch (userRole) {
  //     case "admin":
  //       return "/admin/dashboard";
  //     case "vendor":
  //       return "/vendor/dashboard";
  //     default:
  //       return "/user/dashboard";
  //   }
  // };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-1 px-3 py-2 rounded-md transition ${
              isActive ? "text-yellow-300" : "text-gray-700 hover:text-red-600"
            }`
          }
          onClick={() => setIsOpen(false)}
        >
          <ShoppingCart className="h-4 w-4" />
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/BrowseAll"
          className={({ isActive }) =>
            `flex items-center gap-1 px-3 py-2 rounded-md transition ${
              isActive ? "text-yellow-300" : "text-gray-700 hover:text-red-600"
            }`
          }
          onClick={() => setIsOpen(false)}
        >
          <TrendingUp className="h-4 w-4" />
          All Products
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/markets"
          className={({ isActive }) =>
            `flex items-center gap-1 px-3 py-2 rounded-md transition ${
              isActive ? "text-yellow-300" : "text-gray-700 hover:text-red-600"
            }`
          }
          onClick={() => setIsOpen(false)}
        >
          <MapPin className="h-4 w-4" />
          Markets
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/offers"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md transition ${
              isActive ? "text-yellow-300" : "text-gray-700 hover:text-red-600"
            }`
          }
          onClick={() => setIsOpen(false)}
        >
          Offers
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink
            to={`/dashboard/home`}
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition ${
                isActive ? "text-yellow-300" : "text-gray-700 hover:text-red-600"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-red-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3">
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

            {/* Language Toggle */}
            <li>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 border border-red-200 hover:bg-red-50 bg-transparent rounded px-3 py-1 text-sm text-red-600"
                aria-label="Toggle language"
              >
                <Globe className="h-4 w-4" />
                EN
              </button>
            </li>

            {/* User Menu */}
            {user ? (
              <>
                <li>
                  <button
                    onClick={handleLogout}
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
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="hover:text-red-600 transition px-3 py-2 rounded-md"
                    onClick={() => setIsOpen(false)}
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

                {/* Language Toggle */}
                <li>
                  <button
                    onClick={() => {
                      toggleLanguage();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 border border-red-200 hover:bg-red-50 bg-transparent rounded px-3 py-1 text-sm text-red-600 w-full"
                  >
                    <Globe className="h-4 w-4" />
                    EN
                  </button>
                </li>

                {/* User Menu */}
                {user ? (
                  <>
                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
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
                        onClick={() => setIsOpen(false)}
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        className="hover:text-red-600 transition px-3 py-2 rounded-md block"
                        onClick={() => setIsOpen(false)}
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
