
import { motion } from "framer-motion";
import { TrendingUp, MapPin, Zap } from "lucide-react";

const Banner = () => {
  return (
     <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 via-orange-600/90 to-pink-600/90"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-20"></div>

      <div className="relative container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6"
          >
            <Zap className="h-5 w-5 text-yellow-300" />
            <span className="text-sm font-medium">Live Price Tracking</span>
          </motion.div>

          <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block">Daily Price</span>
            <span className="block text-yellow-300">Tracker</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Stay informed with real-time local market prices and make smarter buying decisions
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-white text-red-600 hover:bg-gray-100 text-lg font-semibold px-8 py-4 rounded-lg shadow-md transition duration-300 flex items-center justify-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              View Today’s Prices
            </button>
            <button className="border border-white text-white hover:bg-white hover:text-red-600 text-lg font-semibold px-8 py-4 rounded-lg transition duration-300 flex items-center justify-center">
              <MapPin className="mr-2 h-5 w-5" />
              Find Markets
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Background Effects */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
    </section>
  );
};

export default Banner;
