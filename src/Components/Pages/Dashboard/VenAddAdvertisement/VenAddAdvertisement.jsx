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
        <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-red-700 mb-4">Add Advertisement</h2>
            <p className="text-gray-600 mb-6">
                Create new advertisements and promote your products
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="title" className="block font-medium text-gray-700 mb-1">
                        Ad Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Fresh Vegetables Mega Sale!"
                        className="w-full border border-gray-300 rounded p-2"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block font-medium text-gray-700 mb-1">
                        Short Description
                    </label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="20% off on all fresh vegetables!"
                        className="w-full border border-gray-300 rounded p-2"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="image" className="block font-medium text-gray-700 mb-1">
                        Image URL
                    </label>
                    <input
                        id="image"
                        type="url"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/banner.jpg"
                        className="w-full border border-gray-300 rounded p-2"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="location" className="block font-medium text-gray-700 mb-1">
                        Location
                    </label>
                    <input
                        id="location"
                        type="text"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Dhaka, Chittagong"
                        className="w-full border border-gray-300 rounded p-2"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="marketsLocation" className="block font-medium text-gray-700 mb-1">
                        Markets Location
                    </label>
                    <input
                        id="marketsLocation"
                        type="text"
                        value={formData.marketsLocation}
                        onChange={handleChange}
                        placeholder="e.g. Gulshan Market, New Market"
                        className="w-full border border-gray-300 rounded p-2"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="discount" className="block font-medium text-gray-700 mb-1">
                        Discount
                    </label>
                    <input
                        id="discount"
                        type="text"
                        value={formData.discount}
                        onChange={handleChange}
                        placeholder="e.g. 20%, Buy 1 Get 1"
                        className="w-full border border-gray-300 rounded p-2"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="validUntil" className="block font-medium text-gray-700 mb-1">
                        Valid Until
                    </label>
                    <input
                        id="validUntil"
                        type="date"
                        value={formData.validUntil}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default VenAddAdvertisement;
