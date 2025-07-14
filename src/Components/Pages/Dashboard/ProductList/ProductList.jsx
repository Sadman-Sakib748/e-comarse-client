import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiousSecure';

const ProductList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const encodedEmail = encodeURIComponent(user?.email || '');

  const { data: products = [], isLoading, isError } = useQuery({
    enabled: !!user?.email,
    queryKey: ['products', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/productAdd/email/${encodedEmail}`);
      return res.data;
    },
  });

  const handlePayment = (item) => {
    navigate(`/dashboard/payment/${item._id}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        🛒 My Product List ({products.length})
      </h1>

      {isLoading ? (
        <p className="text-center font-semibold text-gray-600">Loading...</p>
      ) : isError ? (
        <p className="text-center text-red-500">❌ Failed to load products.</p>
      ) : products.length === 0 ? (
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
                <th className="px-6 py-3 text-center font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((item, index) => (
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
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handlePayment(item)}
                      disabled={item.payment_status === 'paid'}
                      className={`px-4 py-2 rounded-md shadow-sm transition duration-200 ${
                        item.payment_status === 'paid'
                          ? 'bg-gray-400 cursor-not-allowed text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {item.payment_status === 'paid' ? 'Paid' : 'Pay Now'}
                    </button>
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

export default ProductList;
