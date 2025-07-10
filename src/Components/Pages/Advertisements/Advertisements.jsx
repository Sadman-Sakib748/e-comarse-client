// components/Advertisements.jsx

import React from "react";
import { motion } from "framer-motion";

const advertisements = [
    {
        id: 1,
        title: "Fresh Veggie Mega Sale!",
        description: "Enjoy 20% off on all fresh vegetables this week only!",
        image: "/placeholder.svg?height=200&width=500",
        vendor: "Karwan Bazar",
        discount: "20% OFF",
    },
    {
        id: 2,
        title: "Premium Rice Offer",
        description: "Buy 5kg rice and get 1kg free! Limited time deal.",
        image: "/placeholder.svg?height=200&width=500",
        vendor: "Gulshan Market",
        discount: "1+1 FREE",
    },
    {
        id: 3,
        title: "Eid Special Meat",
        description: "Fresh beef and mutton available at special prices.",
        image: "/placeholder.svg?height=200&width=500",
        vendor: "New Market",
        discount: "Special Price",
    },
];

const Advertisements = () => {
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
                    {advertisements.map((ad, index) => (
                        <motion.div
                            key={ad.id}
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
                                    {ad.discount}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-gray-800">{ad.title}</h3>
                                <p className="text-gray-600 mb-4">{ad.description}</p>
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span>{ad.vendor}</span>
                                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm">
                                        View
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Advertisements;
