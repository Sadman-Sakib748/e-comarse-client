// components/MarketStats.jsx

import React from "react";
import { MapPin, Users, Clock, Star } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { label: "Active Markets", value: "85+", icon: MapPin },
  { label: "Verified Vendors", value: "500+", icon: Users },
  { label: "Daily Updates", value: "2000+", icon: Clock },
  { label: "Happy Customers", value: "10,000+", icon: Star },
];

const MarketStats = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Our <span className="text-red-600">Statistics</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              className="text-center group"
            >
              <div className="bg-gradient-to-br from-red-100 to-orange-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="h-10 w-10 text-red-600" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketStats;
