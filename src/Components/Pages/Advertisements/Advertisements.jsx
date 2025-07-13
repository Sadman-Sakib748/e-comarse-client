import React from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { Link } from "react-router";  // Import Link

const fetchAdvertisements = async () => {
  const res = await axios.get("http://localhost:5000/offers");
  return res.data;
};

const Advertisements = () => {
  const { data: advertisements = [], isLoading, isError } = useQuery({
    queryKey: ["advertisements"],
    queryFn: fetchAdvertisements,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="animate-spin w-6 h-6 text-white" />
      </div>
    );
  }

  if (isError) {
    toast.error("Failed to load advertisements.");
    return (
      <p className="text-center text-white py-10">Error loading advertisements.</p>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-red-600 to-orange-600">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Special <span className="text-yellow-300">Offers</span>
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Exciting deals and discounts from your local vendors
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advertisements.length === 0 ? (
            <p className="text-white text-center col-span-3">No offers available</p>
          ) : (
            advertisements.map((ad, index) => (
              <motion.div
                key={ad._id || index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
                className="bg-white/95 rounded-lg shadow hover:shadow-2xl transition-all overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={ad.image}
                    alt={ad.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-2 py-1 text-xs font-bold rounded">
                    {ad.discount || "Special"}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{ad.title}</h3>
                  <p className="text-gray-600 mb-4">{ad.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{ad.location || ad.vendor || "Unknown Vendor"}</span>
                    <Link
                      to={`/advertisement/${ad._id}`}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Advertisements;
