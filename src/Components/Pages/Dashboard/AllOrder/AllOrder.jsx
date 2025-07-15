import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiousSecure';

const AllOrder = () => {
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState('all'); // filter state: all, paid, unpaid

  const { data: products = [], isLoading, isError, error } = useQuery({
    queryKey: ['allProducts'],
    queryFn: async () => {
      const res = await axiosSecure.get('/productAdd'); // ✅ Make sure this endpoint is correct
      return res.data;
    }
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center mt-10 text-red-500">Error: {error.message}</p>;
  }

  // Filter products based on payment_status
  const filteredProducts = products.filter(item => {
    if (filter === 'paid') return item.payment_status === 'paid';
    if (filter === 'unpaid') return item.payment_status !== 'paid';
    return true; // all
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        🛒 My Product List ({filteredProducts.length})
      </h1>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        {['all', 'paid', 'unpaid'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-md font-semibold transition ${
              filter === status
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {status === 'all' ? 'All' : status === 'paid' ? 'Paid' : 'Unpaid'}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full table-auto">
            <thead className="bg-gradient-to-r from-indigo-100 to-purple-100 text-gray-800">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">#</th>
                <th className="px-6 py-3 text-left font-semibold">Email</th>
                <th className="px-6 py-3 text-left font-semibold">Market</th>
                <th className="px-6 py-3 text-left font-semibold">Vendor</th>
                <th className="px-6 py-3 text-left font-semibold">Date</th>
                <th className="px-6 py-3 text-left font-semibold">Total</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.marketName}</td>
                  <td className="px-6 py-4">{item.vendor}</td>
                  <td className="px-6 py-4">{item.date}</td>
                  <td className="px-6 py-4 font-semibold text-blue-700">৳ {item.totalPrice}</td>
                  <td className="px-6 py-4">
                    {item.payment_status === 'paid' ? (
                      <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 font-medium">
                        Paid
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-700 font-medium">
                        Unpaid
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllOrder;
