import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router';
import { toast } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiousSecure';

const Products = () => {
  const product = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const { user, role } = useAuth();

  const [watchlist, setWatchlist] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });

  const canAddWatchlist = role !== 'admin' && role !== 'vendor';

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/watchlist?email=${user.email}`)
        .then((res) => setWatchlist(res.data || []))
        .catch(() => toast.error('Failed to load watchlist'));
    }
  }, [user, axiosSecure]);

  useEffect(() => {
    axiosSecure
      .get(`/reviews?marketId=${product._id}`)
      .then((res) => setReviews(res.data || []))
      .catch(() => toast.error('Failed to load reviews'));
  }, [product._id, axiosSecure]);

  const handleAddToWatchlist = async () => {
    if (!user) {
      toast.error('Please login to add to watchlist.');
      return;
    }
    try {
      const res = await axiosSecure.post('/watchlist', {
        userEmail: user.email,
        marketId: product._id,
        marketName: product.marketName,
      });
      if (res.data.success) {
        toast.success('Added to watchlist!');
        setWatchlist((prev) => [...prev, product._id]);
      } else {
        toast.error(res.data.message || 'Already in watchlist.');
      }
    } catch (error) {
      toast.error('Failed to add to watchlist.');
      console.error(error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to submit review.');
      return;
    }
    if (newReview.rating === 0 || newReview.comment.trim() === '') {
      toast.error('Please provide rating and comment.');
      return;
    }
    try {
      const res = await axiosSecure.post('/reviews', {
        marketId: product._id,
        userName: user.name,
        userEmail: user.email,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString(),
      });
      if (res.data.success) {
        toast.success('Review submitted!');
        setReviews((prev) => [res.data.review, ...prev]);
        setNewReview({ rating: 0, comment: '' });
      } else {
        toast.error('Failed to submit review.');
      }
    } catch (error) {
      toast.error('Server error while submitting review.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-8 space-y-8">
      {/* Market Info */}
      <section>
        <h1 className="text-3xl font-bold mb-4">{product.marketName}</h1>
        <p>
          <strong>Location:</strong> {product.location}
        </p>
        <p>
          <strong>Date:</strong> {product.date}
        </p>
        <p>
          <strong>Vendor:</strong> {product.vendor}
        </p>
        <img
          src={product.image}
          alt={product.marketName}
          className="w-full max-h-64 object-cover rounded my-4"
        />
      </section>

      {/* Items Table */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Items and Prices</h2>
        <table className="w-full border-collapse border border-gray-300 mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Item</th>
              <th className="border border-gray-300 p-2 text-left">Price (৳)</th>
              <th className="border border-gray-300 p-2 text-left">Unit</th>
              <th className="border border-gray-300 p-2 text-left">Price Change</th>
            </tr>
          </thead>
          <tbody>
            {product.items.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{item.name}</td>
                <td className="border border-gray-300 p-2">{item.price}</td>
                <td className="border border-gray-300 p-2">{item.unit}</td>
                <td
                  className={`border border-gray-300 p-2 ${
                    item.change?.startsWith('+')
                      ? 'text-green-600'
                      : item.change === '0'
                      ? 'text-gray-600'
                      : 'text-red-600'
                  }`}
                >
                  {item.change}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Watchlist Button */}
      <section className="flex gap-4">
        <button
          disabled={!canAddWatchlist}
          onClick={handleAddToWatchlist}
          className={`px-4 py-2 rounded text-white ${
            canAddWatchlist ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-400 cursor-not-allowed'
          }`}
          title={canAddWatchlist ? 'Add to Watchlist' : 'Admins and Vendors cannot add to watchlist'}
        >
          ⭐ Add to Watchlist
        </button>
      </section>

      {/* Reviews Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">User Reviews</h2>

        {user ? (
          <form onSubmit={handleReviewSubmit} className="mb-6 space-y-3">
            <div>
              <label className="block font-medium">Star Rating</label>
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                className="border border-gray-300 rounded p-2"
                required
              >
                <option value={0}>Select rating</option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} ⭐
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium">Comment</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                rows={3}
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Share your thoughts about the prices..."
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit Review
            </button>
          </form>
        ) : (
          <p className="text-gray-600">Login to add your review.</p>
        )}

        <div className="space-y-4 max-h-64 overflow-y-auto">
          {reviews.length === 0 ? (
            <p className="text-gray-600">No reviews yet.</p>
          ) : (
            reviews.map((rev) => (
              <div key={rev._id} className="border rounded p-3 bg-gray-50">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold">{rev.userName}</span>
                  <span className="text-sm text-gray-500">{new Date(rev.date).toLocaleDateString()}</span>
                </div>
                <div>⭐ {rev.rating}</div>
                <p>{rev.comment}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
