
import {
  ShoppingCart,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-red-600 to-orange-600 p-2 rounded-xl">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">Daily Price Tracker</span>
                <div className="text-sm text-red-400">Fresh Market</div>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your trusted platform to track prices of local markets in
              Bangladesh. Get daily updated prices and vendor information.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-red-400">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/markets"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                  Local Markets
                </Link>
              </li>
              <li>
                <Link
                  href="/offers"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                  Current Offers
                </Link>
              </li>
              <li>
                <Link
                  href="/vendors"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                  Vendors
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-red-400">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/help"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-red-400">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="bg-red-600/20 p-2 rounded-lg">
                  <Mail className="h-4 w-4 text-red-400" />
                </div>
                <span className="text-gray-400">info@kachabazar.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-red-600/20 p-2 rounded-lg">
                  <Phone className="h-4 w-4 text-red-400" />
                </div>
                <span className="text-gray-400">+880 1234-567890</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-red-600/20 p-2 rounded-lg">
                  <MapPin className="h-4 w-4 text-red-400" />
                </div>
                <span className="text-gray-400">Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-red-600/20 p-2 rounded-lg">
                  <Clock className="h-4 w-4 text-red-400" />
                </div>
                <span className="text-gray-400">6 AM - 10 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} Daily Price Tracker. All rights reserved.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <span className="text-gray-500 text-sm">Made with</span>
              <span className="text-red-400 font-medium">❤️ in Bangladesh</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
