import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router';
import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiousSecure';
import useAuth from '../../hooks/useAuth';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';

const Products = () => {
  const product = useLoaderData();
  console.log('my data ', product)
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Delete modal state
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (product?._id) {
      axiosSecure.get(`/reviews/${product._id}`)
        .then(res => setReviews(res.data))
        .catch(err => console.error('Failed to load reviews:', err));
    }
  }, [product?._id, axiosSecure]);

  if (!product || !product.items) {
    return <div className="text-center p-6 text-gray-600">Loading or No Data Found</div>;
  }

  const totalPrice = product.items.reduce((sum, item) => sum + Number(item.price), 0);

  const handleSubmit = async () => {
    try {
      const res = await axiosSecure.post('/productAdd', {
        email: user?.email,
        marketName: product.marketName,
        location: product.location,
        date: product.date,
        vendor: product.vendor,
        items: product.items,
        totalPrice,
        payment_status: 'unpaid',
      });

      res.data.success
        ? toast.success('Price data submitted successfully!')
        : toast.error('Submission failed!');
    } catch (err) {
      toast.error('Error submitting data!');
      console.error(err);
    }
  };

  const handleAddToWatchlist = async () => {
    try {
      const res = await axiosSecure.post('/watchlist', {
        userEmail: user?.email,
        productId: product._id,
        marketName: product.marketName,
        vendor: product.vendorName,
        date: product.date,
        totalPrice,
      });

      res.data.success
        ? toast.success('Added to Watchlist!')
        : toast.error('Already in watchlist or failed!');
    } catch (err) {
      toast.error('Failed to add to watchlist.');
      console.error(err);
    }
  };

  const handleReviewSubmit = async () => {
    try {
      if (editingId) {
        const res = await axiosSecure.patch(`/reviews/${editingId}`, {
          review: reviewText,
          rating,
        });
        if (res.data.modifiedCount > 0) {
          toast.success('Review updated!');
          setEditingId(null);
        }
      } else {
        const res = await axiosSecure.post('/reviews', {
          userEmail: user?.email,
          productId: product._id,
          marketName: product.marketName,
          vendor: product.vendor,
          review: reviewText,
          rating,
          date: new Date().toISOString(),
        });

        if (res.data.success) {
          toast.success('Review submitted!');
        } else {
          toast.error('Review submission failed!');
        }
      }

      setReviewText('');
      setRating(5);
      const updated = await axiosSecure.get(`/reviews/${product._id}`);
      setReviews(updated.data);
    } catch (err) {
      toast.error('Error posting review!');
      console.error(err);
    }
  };

  const handleEdit = (review) => {
    setEditingId(review._id);
    setReviewText(review.review);
    setRating(review.rating);
  };

  // Open modal for delete confirmation
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  // Confirm and perform delete
  const confirmDelete = async () => {
    try {
      const res = await axiosSecure.delete(`/reviews/${deleteId}`);
      if (res.data.deletedCount > 0) {
        toast.success('Review deleted!');
        setReviews(prevReviews => prevReviews.filter(r => r._id !== deleteId));
      }
    } catch (err) {
      toast.error('Delete failed!');
      console.error(err);
    } finally {
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    }
  };


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-3xl font-bold mb-4">{product.marketName}</h1>
      <p className="text-gray-600 mb-2"><strong>Location:</strong> {product.location}</p>
      <p className="text-gray-600 mb-2"><strong>Date:</strong> {product.date}</p>
      <p className="text-gray-600 mb-2"><strong>Vendor:</strong> {product.vendorName}</p>
      <p className="text-gray-600 mb-2"><strong>Vendor-Email:</strong> {product.vendorEmail}</p>
      <p className="text-gray-600 mb-2"><strong>Rating:</strong> {product.rating} ⭐</p>
      <p className="text-gray-600 mb-4"><strong>Description</strong> {product.marketDescription}</p>

      <img src={product.image} alt={product.marketName} className="w-full max-h-64 object-cover rounded mb-6" />

      <h2 className="text-2xl font-semibold mb-3">Items and Prices</h2>
      <table className="w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Item</th>
            <th className="border p-2 text-left">Price (per unit)</th>
            <th className="border p-2 text-left">Unit</th>
            <th className="border p-2 text-left">Price Change</th>
          </tr>
        </thead>
        <tbody>
          {product.items.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.price} ৳</td>
              <td className="border p-2">{item.unit}</td>
              <td className={`border p-2 ${item.change.startsWith('+') ? 'text-green-600' : item.change === '0' ? 'text-gray-600' : 'text-red-600'}`}>
                {item.change}
              </td>
            </tr>
          ))}
          <tr className="bg-gray-200 font-semibold">
            <td className="border p-2 text-right" colSpan={1}>Total Price:</td>
            <td className="border p-2">{totalPrice} ৳</td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
          </tr>
        </tbody>
      </table>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Submit Price Data
        </button>
        <button onClick={handleAddToWatchlist} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
          Add to Watchlist
        </button>
      </div>

      {/* Review Form */}
      <div className="bg-gray-50 p-4 rounded shadow-sm mb-6">
        <h3 className="text-xl font-semibold mb-2">{editingId ? "Edit Review" : "Leave a Review"}</h3>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={3}
          placeholder="Write your thoughts..."
          className="w-full border border-gray-300 rounded p-2 mb-2"
        />
        <div className="flex items-center gap-3 mb-2">
          <label htmlFor="rating" className="font-medium text-gray-700">Rating:</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>{r} Star</option>
            ))}
          </select>
        </div>
        <button onClick={handleReviewSubmit} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
          {editingId ? "Update Review" : "Submit Review"}
        </button>
      </div>

      {/* All Reviews */}
      <div className="bg-gray-100 p-4 rounded">
        <h3 className="text-lg font-semibold mb-3">All Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          reviews.map((rev) => (
            <div key={rev._id} className="border-b border-gray-300 py-2">
              <p className="text-gray-800 font-medium">{rev.userEmail}</p>
              <p className="text-gray-600 mb-1">⭐ {rev.rating} - {rev.review}</p>
              {rev.userEmail === user?.email && (
                <div className="flex gap-2 text-sm">
                  <button onClick={() => handleEdit(rev)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => handleDeleteClick(rev._id)} className="text-red-600 hover:underline">Delete</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Products;
