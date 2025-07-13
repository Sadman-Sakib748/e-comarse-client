import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
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
import { Link } from "react-router"; // Link ঠিক ইমপোর্ট করলাম

const fetchOffers = async () => {
  const res = await axios.get(`http://localhost:5000/offers`);
  return res.data;
};

const Offers = () => {
  const [isFavoritedIds, setIsFavoritedIds] = useState([]);

  const {
    data: offers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["offers"],
    queryFn: fetchOffers,
  });

  const t = {
    offerDetails: "Offer Details",
    validUntil: "Valid Until",
    vendor: "Vendor",
    location: "Location",
    contact: "Contact",
    originalPrice: "Original Price",
    discountedPrice: "Discounted Price",
    youSave: "You Save",
    termsConditions: "Terms & Conditions",
    howToClaim: "How to Claim",
    claimOffer: "Claim Offer",
    addToFavorites: "Add to Favorites",
    shareOffer: "Share Offer",
    backToOffers: "Back to All Offers",
    offerExpired: "Offer Expired",
    offerActive: "Offer Active",
    viewOffer: "View",
  };

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
    alert(`${t.claimOffer}: ${offer.title}`);
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

  return (
    <div className="min-h-screen bg-orange-50 py-8 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-red-700">
        Advertisements
      </h1>
      {offers.length === 0 && (
        <p className="text-center text-gray-700">No offers available</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {offers.map((offer) => (
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
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-white text-sm flex items-center gap-1 ${
                  offer.isActive ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {offer.isActive ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                {offer.isActive ? t.offerActive : t.offerExpired}
              </div>
            </div>

            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold mb-1">{offer.title}</h2>
              <p className="text-gray-700 mb-3 line-clamp-3 flex-grow">{offer.description}</p>

              <div className="mb-3 space-y-1 text-sm">
                <p>
                  <span className="font-semibold text-gray-600">{t.originalPrice}:</span>
                  <span className="line-through ml-2">৳{offer.originalPrice}</span>
                </p>
                <p>
                  <span className="font-semibold text-gray-600">{t.discountedPrice}:</span>
                  <span className="ml-2 text-red-600 font-bold">৳{offer.discountedPrice}</span>
                </p>
                <p>
                  <span className="font-semibold text-green-600">{t.youSave}:</span>
                  <span className="ml-2">৳{offer.originalPrice - offer.discountedPrice}</span>
                </p>
              </div>

              <div className="mb-3 text-xs max-h-20 overflow-y-auto text-gray-700">
                <h3 className="font-semibold text-red-700">{t.termsConditions}</h3>
                <ul className="list-disc pl-5">
                  {(offer.termsConditions || []).map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-4 text-xs max-h-20 overflow-y-auto text-gray-700">
                <h3 className="font-semibold text-red-700">{t.howToClaim}</h3>
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
                    <Gift className="w-4 h-4" /> {t.claimOffer}
                  </button>
                  <button
                    onClick={() => handleToggleFavorite(offer._id)}
                    className={`flex items-center gap-1 border px-2 py-1 rounded transition text-xs ${
                      isFavoritedIds.includes(offer._id)
                        ? "bg-red-100 text-red-700"
                        : "bg-white"
                    }`}
                  >
                    <Heart className="w-4 h-4" /> {t.addToFavorites}
                  </button>
                  <button
                    onClick={() => handleShareOffer(offer)}
                    className="flex items-center gap-1 border px-2 py-1 rounded bg-white hover:bg-gray-100 transition text-xs"
                  >
                    <Share2 className="w-4 h-4" /> {t.shareOffer}
                  </button>
                </div>
                <div>
                  <Link
                    to={`/advertisement/${offer._id}`}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-semibold transition"
                  >
                    {t.viewOffer}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
