import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  Loader2,
  Gift,
  Percent,
  Heart,
  Share2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiousSecure";

const Offers = () => {
  const axiosSecure = useAxiosSecure();
  const [isFavoritedIds, setIsFavoritedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchOffers = async () => {
    const res = await axiosSecure.get("/offers");
    return res.data;
  };

  const {
    data: offers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["offers"],
    queryFn: fetchOffers,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-red-600" />
      </div>
    );
  }

  if (isError) {
    toast.error("Failed to load offers.");
    return (
      <p className="text-center text-red-600 py-10">Failed to load offers.</p>
    );
  }

  const handleClaimOffer = (offer) => {
    alert(`Claim Offer: ${offer.title}`);
  };

  const handleToggleFavorite = (id) => {
    setIsFavoritedIds((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const handleShareOffer = (offer) => {
    if (navigator.share) {
      navigator.share({
        title: offer.title,
        text: offer.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(offers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOffers = offers.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="min-h-screen bg-orange-50 py-8 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-red-700">
        Advertisements
      </h1>

      {offers.length === 0 && (
        <p className="text-center text-gray-700">No offers available</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {paginatedOffers.map((offer) => (
          <motion.div
            key={offer._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          >
            <div className="relative">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-40 object-cover"
              />

              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <Percent className="inline w-4 h-4" /> {offer.discount || "Special"}
              </div>

              <div
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-white text-sm flex items-center gap-1 ${offer.isActive ? "bg-green-600" : "bg-red-600"
                  }`}
              >
                {offer.isActive ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                {offer.isActive ? "Offer Active" : "Offer Expired"}
              </div>
            </div>

            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold mb-1">{offer.title}</h2>
              <p className="text-gray-700 mb-3 line-clamp-3 flex-grow">
                {offer.description}
              </p>

              <div className="mb-3 space-y-1 text-sm">
                <p>
                  <span className="font-semibold text-gray-600">Original Price:</span>{" "}
                  {offer.originalPrice !== undefined && offer.originalPrice !== null ? (
                    <span className="line-through ml-2">৳{offer.originalPrice}</span>
                  ) : (
                    <span className="text-gray-400 italic ml-2">N/A</span>
                  )}
                </p>
                <p>
                  <span className="font-semibold text-gray-600">Discounted Price:</span>{" "}
                  {offer.discountedPrice !== undefined && offer.discountedPrice !== null ? (
                    <span className="ml-2 text-red-600 font-bold">৳{offer.discountedPrice}</span>
                  ) : (
                    <span className="text-gray-400 italic ml-2">N/A</span>
                  )}
                </p>
                <p>
                  <span className="font-semibold text-green-600">You Save:</span>{" "}
                  {offer.originalPrice !== undefined &&
                    offer.discountedPrice !== undefined &&
                    offer.originalPrice > offer.discountedPrice ? (
                    <span className="ml-2">৳{offer.originalPrice - offer.discountedPrice}</span>
                  ) : (
                    <span className="text-gray-400 italic ml-2">N/A</span>
                  )}
                </p>
              </div>

              <div className="mb-3 text-xs max-h-20 overflow-y-auto text-gray-700">
                <h3 className="font-semibold text-red-700">Terms & Conditions</h3>
                <ul className="list-disc pl-5">
                  {(offer.termsConditions || []).map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-4 text-xs max-h-20 overflow-y-auto text-gray-700">
                <h3 className="font-semibold text-red-700">How to Claim</h3>
                <ol className="list-decimal pl-5">
                  {(offer.howToClaim || []).map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="flex flex-wrap gap-2 items-center justify-between mt-auto">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleClaimOffer(offer)}
                    className="flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded shadow hover:bg-red-700 transition text-xs"
                  >
                    <Gift className="w-4 h-4" /> Claim Offer
                  </button>
                  <button
                    onClick={() => handleToggleFavorite(offer._id)}
                    className={`flex items-center gap-1 border px-2 py-1 rounded transition text-xs ${isFavoritedIds.includes(offer._id)
                        ? "bg-red-100 text-red-700"
                        : "bg-white"
                      }`}
                  >
                    <Heart className="w-4 h-4" /> Add to Favorites
                  </button>
                  <button
                    onClick={() => handleShareOffer(offer)}
                    className="flex items-center gap-1 border px-2 py-1 rounded bg-white hover:bg-gray-100 transition text-xs"
                  >
                    <Share2 className="w-4 h-4" /> Share Offer
                  </button>
                </div>
                <div>
                  <Link
                    to={`/advertisement/${offer._id}`}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-semibold transition"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm font-medium text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Offers;
