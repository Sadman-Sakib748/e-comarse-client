import React from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiousSecure';
import Spinner from '../../Spinner/Spinner';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  const handleRoleUpdate = async (email, newRole) => {
    try {
      const res = await axiosSecure.patch(`/users/role/${email}`, { role: newRole });
      if (res.data.modifiedCount > 0 || res.data.acknowledged) {
        toast.success(`✅ Role updated to ${newRole}`);
        refetch();
      }
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to update role');
    }
  };

  const handleDelete = async (email) => {
    const confirm = window.confirm(`Are you sure you want to delete ${email}?`);
    if (!confirm) return;

    try {
      const res = await axiosSecure.delete(`/users/${email}`);
      if (res.data.deletedCount > 0) {
        toast.success('🗑️ User deleted');
        refetch();
      }
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to delete user');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-purple-700">
        👥 Manage All Users
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-600"><Spinner /></p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
          <table className="table-auto w-full text-sm">
            <thead className="bg-gradient-to-r from-purple-500 to-purple-700 text-white">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Current Role</th>
                <th className="px-4 py-3 text-left">Change Role</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="border-t hover:bg-purple-50 transition-all">
                  <td className="px-4 py-2 font-medium text-gray-700">{index + 1}</td>
                  <td className="px-4 py-2">{user.name || '-'}</td>
                  <td className="px-4 py-2 text-gray-600">{user.email}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${user.role === 'admin'
                          ? 'bg-green-100 text-green-700'
                          : user.role === 'vendor'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleUpdate(user.email, e.target.value)}
                      className="select select-sm border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-300"
                    >
                      <option value="user">User</option>
                      <option value="vendor">Vendor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(user.email)}
                      className="btn btn-xs bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete
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

export default AllUsers;
