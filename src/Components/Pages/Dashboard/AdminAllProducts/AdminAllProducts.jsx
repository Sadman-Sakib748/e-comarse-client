import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiousSecure';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

const AdminProducts = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editMode, setEditMode] = useState(null);
  const [editPrice, setEditPrice] = useState('');

  const { data: products = [], isLoading, isError, error } = useQuery({
    queryKey: ['adminAllProducts'],
    queryFn: async () => {
      const res = await axiosSecure.get('/product/all');
      return res.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (id) => axiosSecure.patch(`/product/${id}/approve`),
    onSuccess: () => {
      toast.success('✅ Product approved');
      queryClient.invalidateQueries(['adminAllProducts']);
    },
    onError: () => toast.error('❌ Approval failed'),
  });

  const rejectMutation = useMutation({
    mutationFn: async ({ id, reason }) =>
      axiosSecure.patch(`/product/${id}/reject`, { reason }),
    onSuccess: () => {
      toast.success('🚫 Product rejected');
      queryClient.invalidateQueries(['adminAllProducts']);
    },
    onError: () => toast.error('❌ Rejection failed'),
  });

  const handleReject = (id) => {
    const reason = prompt('Enter rejection reason:');
    if (reason) {
      rejectMutation.mutate({ id, reason });
    }
  };

  const deleteMutation = useMutation({
    mutationFn: async (id) => axiosSecure.delete(`/product/${id}`),
    onSuccess: () => {
      toast.success('🗑️ Product deleted');
      queryClient.invalidateQueries(['adminAllProducts']);
    },
    onError: () => toast.error('❌ Deletion failed'),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, newPrice }) =>
      axiosSecure.patch(`/product/${id}/updatePrice`, {
        itemIndex: 0,
        newPrice: parseFloat(newPrice),
      }),
    onSuccess: () => {
      toast.success('✏️ Product updated');
      setEditMode(null);
      queryClient.invalidateQueries(['adminAllProducts']);
    },
    onError: () => toast.error('❌ Update failed'),
  });

  const handleEditSubmit = (id) => {
    if (!editPrice) return toast.error("Price can't be empty");
    updateMutation.mutate({ id, newPrice: editPrice });
  };

  if (isLoading) return <p className="text-center py-10">⏳ Loading products...</p>;
  if (isError) return <p className="text-center text-red-600 py-10">❌ {error.message}</p>;

  return (
    <div className="p-4 overflow-x-auto">
      <table className="min-w-full table-auto border border-gray-300">
        <thead className="bg-purple-100 text-left">
          <tr>
            <th className="px-3 py-2 border">Market</th>
            <th className="px-3 py-2 border">Date</th>
            <th className="px-3 py-2 border">Vendor</th>
            <th className="px-3 py-2 border">Item</th>
            <th className="px-3 py-2 border">Price</th>
            <th className="px-3 py-2 border">Status</th>
            <th className="px-3 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-6 text-gray-500">
                😥 No products found.
              </td>
            </tr>
          ) : (
            products.map((product) => {
              const item = product.items?.[0] || {};
              return (
                <tr key={product._id} className="border-t text-sm">
                  <td className="px-3 py-2 border font-semibold text-purple-700">
                    {product.marketName}
                  </td>
                  <td className="px-3 py-2 border">{product.date}</td>
                  <td className="px-3 py-2 border">{product.vendorEmail}</td>
                  <td className="px-3 py-2 border">{item.name}</td>
                  <td className="px-3 py-2 border">
                    {editMode === product._id ? (
                      <div className="flex gap-1 items-center">
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="border p-1 rounded w-20"
                        />
                        <button
                          onClick={() => handleEditSubmit(product._id)}
                          className="bg-blue-600 text-white px-2 py-1 rounded"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <>
                        ৳{item.price} / {item.unit}
                        <button
                          onClick={() => {
                            setEditMode(product._id);
                            setEditPrice(item.price);
                          }}
                          className="ml-2 text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </td>
                  <td className="px-3 py-2 border">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium 
                        ${product.status === 'approved' ? 'bg-green-100 text-green-700' :
                          product.status === 'rejected' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'}`}
                    >
                      {product.status}
                    </span>
                    {product.rejectionReason && (
                      <p className="text-xs text-red-500 mt-1">{product.rejectionReason}</p>
                    )}
                  </td>
                  <td className="px-3 py-2 border space-x-1">
                    <button
                      disabled={product.status === 'approved'}
                      onClick={() => approveMutation.mutate(product._id)}
                      className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      disabled={product.status === 'rejected'}
                      onClick={() => handleReject(product._id)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 disabled:opacity-50"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => deleteMutation.mutate(product._id)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
