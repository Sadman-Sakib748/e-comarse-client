/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiousSecure";
import useAuth from "../../../hooks/useAuth";

const MyProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    itemName: '',
    marketName: '',
    date: '',
  });

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    axiosSecure
      .get(`/product/vendor/${user.email}`)
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load products.");
      })
      .finally(() => setLoading(false));
  }, [user?.email]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      await axiosSecure.delete(`/product/${id}`);
      toast.success("✅ Product deleted");
      setProducts((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to delete product.");
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      itemName: product.itemName,
      marketName: product.marketName,
      date: product.date,
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosSecure.patch(`/product/${editingProduct._id}`, formData);
      if (res.data.modifiedCount > 0) {
        toast.success("✅ Product updated successfully");
        setProducts((prev) =>
          prev.map((p) =>
            p._id === editingProduct._id ? { ...p, ...formData } : p
          )
        );
        setEditingProduct(null); // Close modal
      } else {
        toast.error("⚠️ No changes made.");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update product.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">📦 My Products</h2>

      {loading ? (
        <p className="text-center text-lg font-semibold text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-lg font-medium text-gray-500">No products found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="table w-full text-sm">
            <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Item</th>
                <th className="py-3 px-4 text-left">Market</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Rejection Reason</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-purple-50 border-b">
                  <td className="py-2 px-4">{p.itemName}</td>
                  <td className="py-2 px-4">{p.marketName}</td>
                  <td className="py-2 px-4">{p.date}</td>
                  <td className="py-2 px-4 capitalize font-semibold text-purple-700">{p.status}</td>
                  <td className="py-2 px-4 text-red-500">{p.rejectionReason || "-"}</td>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      onClick={() => openEditModal(p)}
                      className="btn btn-xs bg-yellow-400 hover:bg-yellow-500 text-white"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="btn btn-xs bg-red-500 hover:bg-red-600 text-white"
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

      {/* Update Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
          <form
            onSubmit={handleUpdateSubmit}
            className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
          >
            <h3 className="text-xl font-bold text-purple-700 mb-4">📝 Update Product</h3>

            <label className="block mb-3">
              <span className="block text-sm text-gray-700">Item Name:</span>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </label>

            <label className="block mb-3">
              <span className="block text-sm text-gray-700">Market Name:</span>
              <input
                type="text"
                name="marketName"
                value={formData.marketName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </label>

            <label className="block mb-4">
              <span className="block text-sm text-gray-700">Date:</span>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </label>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
