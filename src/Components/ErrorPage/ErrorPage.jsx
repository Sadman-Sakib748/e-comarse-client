/* eslint-disable no-unused-vars */
import { Link } from 'react-router';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const ErrorPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex flex-col justify-center items-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="bg-white border border-red-200 rounded-xl shadow-xl p-8 md:p-10 max-w-md text-center"
            >
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="flex justify-center mb-6"
                >
                    <AlertTriangle className="text-red-600 w-16 h-16" />
                </motion.div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Oops! Page Not Found
                </h1>
                <p className="text-gray-600 mb-6">
                    The page you're looking for doesn't exist. Let's get you back home.
                </p>

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-all duration-300"
                >
                    🏠 Back to Home
                </Link>
            </motion.div>

            <p className="mt-8 text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Daily Price Tracker. Made with ❤️ in Bangladesh.
            </p>
        </div>
    );
};

export default ErrorPage;
