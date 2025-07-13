"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { useQuery } from "@tanstack/react-query"

const fetchProducts = async () => {
  const res = await fetch("http://localhost:5000/productAdd")
  if (!res.ok) throw new Error("Failed to fetch products")
  return res.json()
}

// Dummy watchlist and orders data (তুমি API থেকে আনতে পারো)
const watchlistData = [
  { id: 1, product: "Onion", price: 30, unit: "kg" },
  { id: 2, product: "Tomato", price: 45, unit: "kg" },
]

const ordersData = [
  {
    id: 1,
    marketName: "New Market",
    date: "2025-01-08",
    totalPrice: 215,
    payment_status: "paid",
  },
  {
    id: 2,
    marketName: "Old Market",
    date: "2025-01-10",
    totalPrice: 180,
    payment_status: "processing",
  },
]

const DashboardHome = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  })

  const [activeTab, setActiveTab] = useState("priceTrends")

  // Prepare price trend data for chart
  const priceData =
    data && data.length > 0
      ? data.map((entry) => {
          const onionObj = entry.items.find((i) => i.name.toLowerCase() === "onion")
          const potatoObj = entry.items.find((i) => i.name.toLowerCase() === "potato")
          const tomatoObj = entry.items.find((i) => i.name.toLowerCase() === "tomato")

          return {
            date: entry.date,
            onion: onionObj ? Number(onionObj.price) : 0,
            potato: potatoObj ? Number(potatoObj.price) : 0,
            tomato: tomatoObj ? Number(tomatoObj.price) : 0,
          }
        })
      : [{ date: "2025-01-01", onion: 0, potato: 0, tomato: 0 }]

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading...
      </div>
    )

  if (isError)
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold text-red-600">
        Error: {error.message}
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            User Dashboard
          </h1>

          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("priceTrends")}
              className={`px-4 py-2 rounded font-semibold ${
                activeTab === "priceTrends"
                  ? "bg-red-500 text-white"
                  : "bg-white border border-gray-300"
              }`}
            >
              দাম ট্রেন্ড
            </button>
            <button
              onClick={() => setActiveTab("watchlist")}
              className={`px-4 py-2 rounded font-semibold ${
                activeTab === "watchlist"
                  ? "bg-red-500 text-white"
                  : "bg-white border border-gray-300"
              }`}
            >
              ওয়াচলিস্ট
            </button>
            <button
              onClick={() => setActiveTab("myOrders")}
              className={`px-4 py-2 rounded font-semibold ${
                activeTab === "myOrders"
                  ? "bg-red-500 text-white"
                  : "bg-white border border-gray-300"
              }`}
            >
              আমার অর্ডার
            </button>
          </div>

          {/* Tab content */}
          {activeTab === "priceTrends" && (
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold text-red-700 mb-2">Price History - Last 7 Days</h2>
              <p className="text-gray-600 mb-4">
                Track how prices have changed over time for your favorite items
              </p>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#fecaca" />
                    <XAxis dataKey="date" stroke="#dc2626" />
                    <YAxis stroke="#dc2626" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #fecaca",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="onion"
                      stroke="#dc2626"
                      strokeWidth={3}
                      name="Onion (৳/kg)"
                    />
                    <Line
                      type="monotone"
                      dataKey="potato"
                      stroke="#ea580c"
                      strokeWidth={3}
                      name="Potato (৳/kg)"
                    />
                    <Line
                      type="monotone"
                      dataKey="tomato"
                      stroke="#f97316"
                      strokeWidth={3}
                      name="Tomato (৳/kg)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === "watchlist" && (
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold text-red-700 mb-4">My Watchlist</h2>
              <table className="w-full text-left border border-gray-200">
                <thead>
                  <tr className="bg-red-100">
                    <th className="px-4 py-2 border-b">Product</th>
                    <th className="px-4 py-2 border-b">Price (৳)</th>
                    <th className="px-4 py-2 border-b">Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {watchlistData.map((item) => (
                    <tr key={item.id} className="hover:bg-red-50">
                      <td className="px-4 py-2 border-b">{item.product}</td>
                      <td className="px-4 py-2 border-b">{item.price}</td>
                      <td className="px-4 py-2 border-b">{item.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "myOrders" && (
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold text-red-700 mb-4">My Orders</h2>
              <table className="w-full text-left border border-gray-200">
                <thead>
                  <tr className="bg-red-100">
                    <th className="px-4 py-2 border-b">Market</th>
                    <th className="px-4 py-2 border-b">Date</th>
                    <th className="px-4 py-2 border-b">Total Price (৳)</th>
                    <th className="px-4 py-2 border-b">Payment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersData.map((order) => (
                    <tr key={order.id} className="hover:bg-red-50">
                      <td className="px-4 py-2 border-b">{order.marketName}</td>
                      <td className="px-4 py-2 border-b">{order.date}</td>
                      <td className="px-4 py-2 border-b">{order.totalPrice}</td>
                      <td className="px-4 py-2 border-b capitalize">{order.payment_status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardHome
