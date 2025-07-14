import { useState } from "react";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiousSecure";

const ProductCreate = ({ onProductAdded }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [vendorName] = useState(user?.displayName || "");

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const handleAddNewItem = () => {
    setItems([...items, { name: "", price: "", unit: "kg", change: "" }]);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const marketName = form.marketName.value;
    const marketDescription = form.marketDescription.value;
    const image = form.image.value;
    const itemDescription = form.itemDescription.value;
    const location = form.location.value;

    const validItems = items.filter((item) => item.name && item.price);
    const pricePerUnit = parseFloat(validItems[0]?.price || 0);

    const product = {
      vendorEmail: user.email,
      vendorName,
      marketName,
      date: selectedDate.toISOString().split("T")[0],
      marketDescription,
      location,
      image,
      itemDescription,
      status: "pending",
      items: validItems.map((item) => ({
        ...item,
        price: parseFloat(item.price),
        change: item.change || "0",
      })),
      prices: [
        {
          date: selectedDate.toISOString().split("T")[0],
          price: pricePerUnit,
        },
      ],
    };

    try {
      await axiosSecure.post("/product", product);
      toast.success("✅ Product submitted successfully!");
      form.reset();
      setItems([]);
      if (onProductAdded) onProductAdded();
    } catch (err) {
      toast.error("❌ Failed to submit product.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8 rounded-2xl shadow-2xl border border-purple-300">
      <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-8">
        🛒 Add Market Prices
      </h2>

      <form onSubmit={handleAddProduct} className="grid grid-cols-1 gap-6 text-gray-800">
        {/* 📧 Vendor Email */}
        <div>
          <label className="block font-semibold text-purple-700 mb-2">📧 Vendor Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full p-3 rounded-lg border border-purple-300 bg-gray-100"
          />
        </div>

        {/* 🧑‍🌾 Vendor Name */}
        <div>
          <label className="block font-semibold text-purple-700 mb-2">🧑‍🌾 Vendor Name</label>
          <input
            type="text"
            value={vendorName}
            readOnly
            className="w-full p-3 rounded-lg border border-purple-300 bg-gray-100"
          />
        </div>

        {/* Market Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold text-purple-700 mb-2">Market Name</label>
            <input
              type="text"
              name="marketName"
              required
              className="w-full p-3 rounded-lg border border-purple-300"
              placeholder="e.g., Karwan Bazar"
            />
          </div>

          <div>
            <label className="block font-semibold text-purple-700 mb-2">Market Image (URL)</label>
            <input
              type="text"
              name="image"
              required
              className="w-full p-3 rounded-lg border border-purple-300"
              placeholder="Paste image URL"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-purple-700 mb-2">Market Description</label>
          <textarea
            name="marketDescription"
            required
            rows="3"
            className="w-full p-3 rounded-lg border border-purple-300"
            placeholder="Describe the market..."
          />
        </div>

        <div>
          <label className="block font-semibold text-purple-700 mb-2">Location</label>
          <textarea
            name="location"
            required
            rows="3"
            className="w-full p-3 rounded-lg border border-purple-300"
            placeholder="Location of the market..."
          />
        </div>

        <div>
          <label className="block font-semibold text-purple-700 mb-2">
            Item Description (optional)
          </label>
          <textarea
            name="itemDescription"
            rows="2"
            className="w-full p-3 rounded-lg border border-purple-300"
            placeholder="Details..."
          />
        </div>

        <div>
          <label className="block font-semibold text-purple-700 mb-2">Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="w-full p-3 rounded-lg border border-purple-300"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        {/* Product Items */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-purple-800">🧺 Product Items</h3>
            <button
              type="button"
              onClick={handleAddNewItem}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              ➕ Add Item
            </button>
          </div>

          {items.length === 0 && (
            <p className="text-gray-500 text-sm italic">No items added yet.</p>
          )}

          {items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow"
            >
              <div>
                <label className="block text-sm font-semibold mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={item.name}
                  onChange={(e) => handleItemChange(index, "name", e.target.value)}
                  className="w-full p-2 rounded border"
                  placeholder="e.g., Onion"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Price (৳)</label>
                <input
                  type="number"
                  required
                  value={item.price}
                  onChange={(e) => handleItemChange(index, "price", e.target.value)}
                  className="w-full p-2 rounded border"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Unit</label>
                <input
                  type="text"
                  value={item.unit}
                  onChange={(e) => handleItemChange(index, "unit", e.target.value)}
                  className="w-full p-2 rounded border"
                  placeholder="e.g., kg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Change</label>
                <input
                  type="text"
                  value={item.change}
                  onChange={(e) => handleItemChange(index, "change", e.target.value)}
                  className="w-full p-2 rounded border"
                  placeholder="+3 or -2"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div>
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl hover:shadow-xl transition duration-300 mt-4"
          >
            {loading ? "⏳ Submitting..." : "✅ Submit Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductCreate;
