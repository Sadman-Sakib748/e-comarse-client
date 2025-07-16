import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiousSecure";
import toast from "react-hot-toast";

const SummaryCard = ({ title, count }) => (
  <div className="bg-white border shadow p-4 rounded text-center">
    <h4 className="text-gray-600 text-sm mb-1">{title}</h4>
    <p className="text-2xl font-bold text-red-500">{count}</p>
  </div>
);

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("priceTrends");

  const { data: summary = {}, isLoading: loadingSummary } = useQuery({
    queryKey: ["summary", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/estimateCount?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: payments = [], isLoading: loadingPayments } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const {
    data: watchlist = [],
    isLoading: loadingWatchlist,
    refetch: refetchWatchlist,
  } = useQuery({
    queryKey: ["watchlist", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/watchlist?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleRemove = async (id) => {
    try {
      const res = await axiosSecure.delete(`/watchlist/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Removed from watchlist");
        refetchWatchlist(); 
      }
    } catch (error) {
      toast.error("Failed to remove",error);
    }
  };

  const totalAmount = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

  const priceData = (() => {
    if (!payments || payments.length === 0) return [];

    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setHours(0, 0, 0, 0);
    sevenDaysAgo.setDate(today.getDate() - 6);

    const datePriceMap = {};

    payments.forEach((p) => {
      const dateObj = new Date(p.payment_date);
      if (isNaN(dateObj)) return;

      const dateStr = dateObj.toISOString().split("T")[0];
      if (dateObj >= sevenDaysAgo) {
        datePriceMap[dateStr] =
          (datePriceMap[dateStr] || 0) + Number(p.amount / 100 || 0);
      }
    });

    const chartData = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(sevenDaysAgo);
      d.setDate(sevenDaysAgo.getDate() + i);
      const dateStr = d.toISOString().split("T")[0];

      chartData.push({
        date: format(d, "MMM d"),
        price: datePriceMap[dateStr] || 0,
      });
    }

    return chartData;
  })();

  if (loadingSummary || loadingPayments || loadingWatchlist) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            📊 Amount Tracker
          </h1>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <SummaryCard title="Watchlist Items" count={watchlist.length || 0} />
            <SummaryCard title="Total Orders" count={payments.length || 0} />
            <SummaryCard
              title="Total Payments"
              count={`৳${(totalAmount / 100).toFixed(2)}`}
            />
          </div>

          {/* Tab Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("priceTrends")}
              className={`px-4 py-2 rounded font-semibold ${activeTab === "priceTrends"
                  ? "bg-red-500 text-white"
                  : "bg-white border border-gray-300"
                }`}
            >
              Payment Trends
            </button>
            <button
              onClick={() => setActiveTab("watchlist")}
              className={`px-4 py-2 rounded font-semibold ${activeTab === "watchlist"
                  ? "bg-red-500 text-white"
                  : "bg-white border border-gray-300"
                }`}
            >
              Watchlist
            </button>
          </div>

          {/* Chart - Payment Price History */}
          {activeTab === "priceTrends" && priceData.length > 0 && (
            <div className="bg-white p-6 rounded shadow mb-8">
              <h2 className="text-xl font-bold text-red-700 mb-2">
                Payment Price History - Last 7 Days
              </h2>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#fecaca" />
                    <XAxis dataKey="date" stroke="#dc2626" />
                    <YAxis stroke="#dc2626" tickFormatter={(v) => `৳${v}`} />
                    <Tooltip
                      formatter={(value) => `৳${value.toFixed(2)}`}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#dc2626"
                      strokeWidth={3}
                      name="Total Payment (৳)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Watchlist Table */}
          {activeTab === "watchlist" && (
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold text-red-700 mb-4">
                📌 Watchlist Items
              </h2>
              {watchlist.length === 0 ? (
                <p className="text-gray-500">No items in your watchlist.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full border text-sm text-left text-gray-700">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 border">#</th>
                        <th className="px-4 py-2 border">Market</th>
                        <th className="px-4 py-2 border">Vendor</th>
                        <th className="px-4 py-2 border">Date</th>
                        <th className="px-4 py-2 border">Total</th>
                        <th className="px-4 py-2 border">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {watchlist.map((item, index) => (
                        <tr key={item._id || index} className="hover:bg-gray-50">
                          <td className="px-4 py-2 border">{index + 1}</td>
                          <td className="px-4 py-2 border">
                            {item.marketName || "N/A"}
                          </td>
                          <td className="px-4 py-2 border">{item.vendor || "N/A"}</td>
                          <td className="px-4 py-2 border">
                            {item.date ? format(new Date(item.date), "PPP") : "N/A"}
                          </td>
                          <td className="px-4 py-2 border">
                            ৳{item.totalPrice || "0"}
                          </td>
                          <td className="px-4 py-2 border text-red-600 font-medium">
                            <button
                              onClick={() => handleRemove(item._id)}
                              className="hover:underline"
                            >
                              ❌ Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHome;
