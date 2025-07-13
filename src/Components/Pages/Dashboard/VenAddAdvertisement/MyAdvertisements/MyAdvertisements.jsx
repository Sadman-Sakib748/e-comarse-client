import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import EditAdModal from '../EditAdModal/EditAdModal';
import useAxiosSecure from '../../../../hooks/useAxiousSecure';

const MyAdvertisements = () => {
  const axiosSecure = useAxiosSecure();

  const [editingAd, setEditingAd] = useState(null);
  const [deletingAd, setDeletingAd] = useState(null); // for delete modal

  // fetch function using axiosSecure
  const fetchAds = async () => {
    const res = await axiosSecure.get('/offers');
    return res.data;
  };

  // actual delete function called after confirmation
  const deleteAd = async (id) => {
    try {
      const res = await axiosSecure.delete(`/offers/${id}`);
      if (res.data.success) {
        toast.success("Ad deleted successfully");
      } else {
        toast.error(res.data.message || "Failed to delete ad");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while deleting ad");
    }
  };

  const {
    data: ads = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['vendor-ads'],
    queryFn: fetchAds,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="animate-spin w-6 h-6 text-red-500" />
      </div>
    );
  }

  if (isError) {
    toast.error('Failed to fetch advertisements.');
    return <p className="text-center text-red-600 py-6">Error loading advertisements.</p>;
  }

  // Confirm Delete modal UI
  const DeleteConfirmModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow p-6 max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
        <p className="mb-6">Are you sure you want to delete this advertisement?</p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            onClick={() => setDeletingAd(null)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            onClick={async () => {
              await deleteAd(deletingAd._id);
              setDeletingAd(null);
              refetch();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
      <h2 className="text-xl font-semibold text-red-700 mb-2">My Advertisements</h2>
      <p className="text-gray-600 mb-6">View and manage all your submitted advertisements</p>

      <table className="w-full border text-left text-sm">
        <thead>
          <tr className="bg-red-50 text-red-700">
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Ad Title</th>
            <th className="p-2 border">Short Description</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ads.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">
                No advertisements found.
              </td>
            </tr>
          ) : (
            ads.map((ad) => (
              <tr key={ad._id} className="hover:bg-red-50">
                <td className="p-2 border">
                  {ad.image ? (
                    <img
                      src={ad.image}
                      alt={ad.title}
                      className="w-20 h-14 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No image</span>
                  )}
                </td>
                <td className="p-2 border font-medium">{ad.title}</td>
                <td className="p-2 border">{ad.description}</td>
                <td className="p-2 border">
                  <span className="inline-block px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                    {ad.status}
                  </span>
                </td>
                <td className="p-2 border">
                  <div className="flex gap-2">
                    <button
                      className="text-blue-600 hover:underline text-sm"
                      onClick={() => setEditingAd(ad)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline text-sm"
                      onClick={() => setDeletingAd(ad)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editingAd && (
        <EditAdModal
          ad={editingAd}
          onClose={() => setEditingAd(null)}
          onUpdated={() => {
            refetch();
            setEditingAd(null);
          }}
          axiosSecure={axiosSecure}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingAd && <DeleteConfirmModal />}
    </div>
  );
};

export default MyAdvertisements;
