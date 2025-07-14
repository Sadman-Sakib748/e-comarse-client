// components/TodayProducts.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Clock, MapPin, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router"; // ✅ ensure correct import
import useAxiousSecure from "../../hooks/useAxiousSecure";
import Spinner from "../Spinner/Spinner";


const TodayProducts = () => {
  const axiosSecure = useAxiousSecure();

  const { data: todayProducts = [], isLoading, isError } = useQuery({
    queryKey: ["todayProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/product");
      // ✅ Filter only approved products
      return res.data.filter((p) => p.status === "approved");
    },
  });

  if (isLoading) return <Spinner />;

  if (isError) {
    return (
      <div className="py-16 text-center text-red-500 font-semibold">
        Failed to load market data.
      </div>
    );
  }

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-red-100 rounded-full px-6 py-2 mb-4">
            <Clock className="h-4 w-4 text-red-600" />
            <span className="text-sm font-medium text-red-700">Today’s Update</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Latest <span className="text-red-600">Market Prices</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Fresh price updates collected from Dhaka’s main markets.
          </p>
        </motion.div>

        {/* Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {todayProducts.slice(0, 6).map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              className="bg-white rounded-lg shadow hover:shadow-2xl transition-all overflow-hidden"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.marketName}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 text-sm rounded">
                  {product.items.length} Items
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white px-2 py-1 rounded-full text-sm shadow">
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  {product.rating || "4.5"}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold flex items-center gap-1 text-gray-800">
                  <MapPin className="h-4 w-4 text-red-600" />
                  {product.marketName}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {product.location || "Dhaka"} • {product.date}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  {product.items.map((item, idx) => (
                    <div key={idx} className="bg-gray-100 p-3 rounded">
                      <div className="flex justify-between items-center mb-1 text-sm">
                        <span>{item.name}</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${item.change?.startsWith("+")
                              ? "bg-red-100 text-red-600"
                              : item.change?.startsWith("-")
                                ? "bg-green-100 text-green-600"
                                : "bg-gray-200 text-gray-600"
                            }`}
                        >
                          {item.change || "0"}
                        </span>
                      </div>
                      <div className="text-red-600 font-bold">
                        ৳{item.price}
                        <span className="text-xs text-gray-500 ml-1">/{item.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center border-t pt-3 text-sm text-gray-600">
                  <span>{product.vendorName}</span>
                  <Link to={`/products/${product._id}`}>
                    <button className="flex items-center text-white bg-red-600 px-3 py-1.5 rounded hover:bg-red-700">
                      View Details <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Browse All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link to="/BrowseAll">
            <button className="text-red-600 border border-red-600 px-6 py-2 rounded hover:bg-red-600 hover:text-white transition">
              Browse All Products <ArrowRight className="ml-2 h-4 w-4 inline" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TodayProducts;
