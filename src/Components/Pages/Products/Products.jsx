import React from 'react';
import { useLoaderData } from 'react-router';  // react-router-dom থেকে নিতে হবে
import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiousSecure';
import useAuth from '../../hooks/useAuth';

const Products = () => {
  const product = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

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
        payment_status: 'unpaid',
        totalPrice,
      });

      if (res.data.success) {
        toast.success('Price data submitted successfully!');
      } else {
        toast.error('Submission failed!');
      }
    } catch (err) {
      toast.error('Error submitting data!');
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-3xl font-bold mb-4">{product.marketName}</h1>
      <p className="text-gray-600 mb-2"><strong>Location:</strong> {product.location}</p>
      <p className="text-gray-600 mb-2"><strong>Date:</strong> {product.date}</p>
      <p className="text-gray-600 mb-2"><strong>Vendor:</strong> {product.vendor}</p>
      <p className="text-gray-600 mb-2"><strong>Rating:</strong> {product.rating} ⭐</p>
      <p className="text-gray-600 mb-4"><strong>Total Vendors:</strong> {product.totalVendors}</p>

      <img
        src={product.image}
        alt={product.marketName}
        className="w-full max-h-64 object-cover rounded mb-6"
      />

      <h2 className="text-2xl font-semibold mb-3">Items and Prices</h2>

      <table className="w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Item</th>
            <th className="border border-gray-300 p-2 text-left">Price (per unit)</th>
            <th className="border border-gray-300 p-2 text-left">Unit</th>
            <th className="border border-gray-300 p-2 text-left">Price Change</th>
          </tr>
        </thead>
        <tbody>
          {product.items.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{item.name}</td>
              <td className="border border-gray-300 p-2">{item.price} ৳</td>
              <td className="border border-gray-300 p-2">{item.unit}</td>
              <td
                className={`border border-gray-300 p-2 ${
                  item.change.startsWith('+')
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

          <tr className="bg-gray-200 font-semibold">
            <td className="border border-gray-300 p-2 text-right" colSpan={1}>Total Price:</td>
            <td className="border border-gray-300 p-2">{totalPrice} ৳</td>
            <td className="border border-gray-300 p-2"></td>
            <td className="border border-gray-300 p-2"></td>
          </tr>
        </tbody>
      </table>

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Submit Price Data
      </button>
    </div>
  );
};

export default Products;
