import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiousSecure';
import { toast } from 'react-hot-toast';

const AllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Load all products
  const { data: products = [], isLoading, isError, error } = useQuery({
    queryKey: ['allProducts'],
    queryFn: async () => {
      const res = await axiosSecure.get('/product'); // ✅ Changed here
      return res.data;
    },
  });

  // ✅ Approve product
  const approveMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.patch(`/product/${id}/approve`),
    onSuccess: () => {
      toast.success('✅ Product approved');
      queryClient.invalidateQueries(['allProducts']);
    },
    onError: () => toast.error('❌ Approval failed'),
  });

  // ✅ Reject with reason
  const rejectMutation = useMutation({
    mutationFn: async ({ id, reason }) => await axiosSecure.patch(`/product/${id}/reject`, { reason }),
    onSuccess: () => {
      toast.success('🚫 Product rejected');
      queryClient.invalidateQueries(['allProducts']);
    },
    onError: () => toast.error('❌ Rejection failed'),
  });

  // ✅ Delete product
  const deleteMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/product/${id}`),
    onSuccess: () => {
      toast.success('🗑️ Product deleted');
      queryClient.invalidateQueries(['allProducts']);
    },
    onError: () => toast.error('❌ Deletion failed'),
  });

  const handleReject = (id) => {
    const reason = prompt('Enter rejection reason:');
    if (reason) {
      rejectMutation.mutate({ id, reason });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <div key={product._id} className="border rounded-lg p-4 shadow-md space-y-2">
          <h2 className="text-xl font-bold">{product.marketName}</h2>
          <p>Date: {product.date}</p>
          <p>Status: <span className="font-semibold">{product.status}</span></p>
          <p>Vendor: <span className="text-sm text-gray-600">{product.vendorEmail}</span></p>
          {product.rejectionReason && (
            <p className="text-sm text-red-500">Reason: {product.rejectionReason}</p>
          )}

          <div className="flex flex-wrap gap-2 mt-2">
            <button
              onClick={() => approveMutation.mutate(product._id)}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              disabled={product.status === 'approved'}
            >
              Approve
            </button>
            <button
              onClick={() => handleReject(product._id)}
              className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              disabled={product.status === 'rejected'}
            >
              Reject
            </button>
            <button
              onClick={() => deleteMutation.mutate(product._id)}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
