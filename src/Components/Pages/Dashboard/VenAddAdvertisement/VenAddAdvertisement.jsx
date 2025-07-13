import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiousSecure';


const VenAddAdvertisement = () => {
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    location: '',
    marketsLocation: '',
    discount: '',
    validUntil: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      status: 'pending',
    };

    try {
      const res = await axiosSecure.post('/offers', payload);
      if (res.data.success) {
        toast.success(res.data.message || 'Ad added successfully!');
        setFormData({
          title: '',
          description: '',
          image: '',
          location: '',
          marketsLocation: '',
          discount: '',
          validUntil: '',
        });
      } else {
        toast.error(res.data.message || 'Failed to add ad.');
      }
    } catch (error) {
      toast.error('Server error');
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold text-red-700 mb-8 text-center">
        Add New Advertisement
      </h2>
      <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
        Create new advertisements and promote your products to reach more customers.
      </p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-2 font-semibold text-gray-700">
            Ad Title <span className="text-red-600">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Fresh Vegetables Mega Sale!"
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <small className="text-gray-400 mt-1">Enter a catchy title for your ad</small>
        </div>

        {/* Discount */}
        <div className="flex flex-col">
          <label htmlFor="discount" className="mb-2 font-semibold text-gray-700">
            Discount <span className="text-red-600">*</span>
          </label>
          <input
            id="discount"
            type="text"
            value={formData.discount}
            onChange={handleChange}
            placeholder="20%, Buy 1 Get 1"
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <small className="text-gray-400 mt-1">Specify discount details or offer terms</small>
        </div>

        {/* Description */}
        <div className="flex flex-col md:col-span-2">
          <label htmlFor="description" className="mb-2 font-semibold text-gray-700">
            Short Description <span className="text-red-600">*</span>
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            placeholder="20% off on all fresh vegetables!"
            className="border border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <small className="text-gray-400 mt-1">Briefly describe the offer</small>
        </div>

        {/* Image URL */}
        <div className="flex flex-col">
          <label htmlFor="image" className="mb-2 font-semibold text-gray-700">
            Image URL <span className="text-red-600">*</span>
          </label>
          <input
            id="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/banner.jpg"
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <small className="text-gray-400 mt-1">Link to the promotional image</small>
        </div>

        {/* Valid Until */}
        <div className="flex flex-col">
          <label htmlFor="validUntil" className="mb-2 font-semibold text-gray-700">
            Valid Until <span className="text-red-600">*</span>
          </label>
          <input
            id="validUntil"
            type="date"
            value={formData.validUntil}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <small className="text-gray-400 mt-1">Set the expiry date of the offer</small>
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label htmlFor="location" className="mb-2 font-semibold text-gray-700">
            Location <span className="text-red-600">*</span>
          </label>
          <input
            id="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Dhaka, Chittagong"
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <small className="text-gray-400 mt-1">City or region where the offer applies</small>
        </div>

        {/* Markets Location */}
        <div className="flex flex-col">
          <label htmlFor="marketsLocation" className="mb-2 font-semibold text-gray-700">
            Markets Location <span className="text-red-600">*</span>
          </label>
          <input
            id="marketsLocation"
            type="text"
            value={formData.marketsLocation}
            onChange={handleChange}
            placeholder="e.g. Gulshan Market, New Market"
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <small className="text-gray-400 mt-1">Specific markets related to this offer</small>
        </div>

        {/* Submit Button - spans 2 cols */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-4 rounded-md hover:bg-red-700 transition"
          >
            Submit Advertisement
          </button>
        </div>
      </form>
    </div>
  );
};

export default VenAddAdvertisement;
