import React from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

const fetchAdDetails = async (id) => {
  const res = await axios.get(`http://localhost:5000/offers/${id}`);
  return res.data;
};

const AdvertisementDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: ad, isLoading, isError } = useQuery({
    queryKey: ["advertisement", id],
    queryFn: () => fetchAdDetails(id),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="animate-spin w-6 h-6 text-red-600" />
      </div>
    );
  }

  if (isError) {
    toast.error("Failed to load advertisement details.");
    return (
      <p className="text-center text-red-600 py-10">
        Error loading advertisement details.
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-red-600 hover:underline"
      >
        &larr; Back
      </button>
      <img src={ad.image} alt={ad.title} className="w-full h-64 object-cover rounded mb-4" />
      <h1 className="text-3xl font-bold mb-2">{ad.title}</h1>
      <p className="mb-4 text-gray-700">{ad.description}</p>
      <p className="font-semibold">
        Vendor/Location: <span className="text-gray-600">{ad.location || ad.vendor}</span>
      </p>
      <p className="font-semibold">
        Discount: <span className="text-gray-600">{ad.discount || "Special"}</span>
      </p>
      <p className="font-semibold">
        Status: <span className="text-gray-600">{ad.status || "Pending"}</span>
      </p>
    </div>
  );
};

export default AdvertisementDetails;
