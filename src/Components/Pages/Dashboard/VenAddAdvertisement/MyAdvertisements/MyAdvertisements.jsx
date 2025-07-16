

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import EditAdModal from '../EditAdModal/EditAdModal';
import useAxiosSecure from '../../../../hooks/useAxiousSecure';

const statusColorMap = {
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  pending: 'bg-yellow-100 text-yellow-700',
};

function getStatusClasses(status) {
  if (!status) return statusColorMap.pending;
  return statusColorMap[status] || statusColorMap.pending;
}

const MyAdvertisements = () => {
  const axiosSecure = useAxiosSecure();

  const [editingAd, setEditingAd] = useState(null);
  const [deletingAd, setDeletingAd] = useState(null);

  const fetchAds = async () => {
    const res = await axiosSecure.get('/offers');
    return res.data;
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

  const deleteAd = async (id) => {
    try {
      const res = await axiosSecure.delete(`/offers/${id}`);
      // Backend: please respond {success:true} when delete acknowledged
      if (res.data?.success || res.data?.deletedCount > 0) {
        toast.success('Ad deleted successfully');
        refetch();
      } else {
        toast.error(res.data?.message || 'Failed to delete ad');
      }
    } catch (err) {
      console.error(err);
      toast.error('Server error while deleting ad');
    }
  };

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
            ads.map((ad) => {
              const status = ad.status || 'pending';
              const statusClasses = getStatusClasses(status);
              return (
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
                  <td className="p-2 border font-medium">{ad.title || 'Untitled'}</td>
                  <td className="p-2 border max-w-[240px]">
                    <div className="line-clamp-3 break-words">{ad.description || '—'}</div>
                  </td>
                  <td className="p-2 border align-top">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${statusClasses}`}
                    >
                      {status}
                    </span>
                    {/* Rejection comment */}
                    {status === 'rejected' && ad.rejectionReason && (
                      <div
                        className="mt-1 text-xs italic text-red-600 max-w-[200px] break-words"
                        title={ad.rejectionReason}
                      >
                        {ad.rejectionReason}
                      </div>
                    )}
                  </td>
                  <td className="p-2 border">
                    <div className="flex gap-2">
                      <button
                        aria-label="Edit advertisement"
                        className="text-blue-600 hover:underline text-sm"
                        onClick={() => setEditingAd(ad)}
                      >
                        Edit
                      </button>
                      <button
                        aria-label="Delete advertisement"
                        className="text-red-600 hover:underline text-sm"
                        onClick={() => setDeletingAd(ad)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

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

      {deletingAd && <DeleteConfirmModal />}
    </div>
  );
};

export default MyAdvertisements;
