import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../../../hooks/useAxiousSecure';

const EditAdModal = ({ ad, onClose, onUpdated }) => {
    const axiosSecure = useAxiosSecure();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        status: '',
    });

    useEffect(() => {
        if (ad) {
            setFormData({
                title: ad.title || '',
                description: ad.description || '',
                image: ad.image || '',
                status: ad.status || 'Pending',
            });
        }
    }, [ad]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosSecure.put(`/offers/${ad._id}`, formData);
            if (res.data.success) {
                toast.success(res.data.message);
                onUpdated(); // callback to refresh list
                onClose();
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to update advertisement');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow">
                <h2 className="text-xl font-bold mb-4 text-red-600">Edit Advertisement</h2>
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block font-medium">Ad Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Short Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            rows={3}
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Image URL</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        >
                            <option>Pending</option>
                            <option>Approved</option>
                            <option>Rejected</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-4 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAdModal;
