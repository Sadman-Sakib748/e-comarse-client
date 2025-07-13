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
import useAuth from "../../../hooks/useAuth"

// ====== API Functions ======
const fetchProducts = async () => {
  const res = await fetch("http://localhost:5000/product")
  if (!res.ok) throw new Error("Failed to fetch products")
  return res.json()
}

const fetchWatchlist = async () => {
  const res = await fetch("http://localhost:5000/watchlist")
  if (!res.ok) throw new Error("Failed to fetch watchlist")
  return res.json()
}

const fetchOrders = async (email) => {
  const res = await fetch(`http://localhost:5000/orders/${email}`)
  if (!res.ok) throw new Error("Failed to fetch orders")
  return res.json()
}

// ====== Main Component ======
const DashboardHome = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("priceTrends")

  // Fetch product data (for chart)
  const {
    data: productData = [],
    isLoading: loadingProducts,
    isError: errorProducts,
    error: productError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  })

  // Fetch watchlist
  const { data: watchlist = [], isLoading: loadingWatchlist } = useQuery({
    queryKey: ["watchlist"],
    queryFn: fetchWatchlist,
  })

  // Fetch orders
  const { data: orders = [], isLoading: loadingOrders } = useQuery({
    queryKey: ["myOrders", user?.email],
    queryFn: () => fetchOrders(user.email),
    enabled: !!user?.email,
  })

  // Prepare chart data
  const priceData =
    productData.length > 0
      ? productData.map((entry) => {
          const onion = entry.items.find((i) => i.name.toLowerCase() === "onion")
          const potato = entry.items.find((i) => i.name.toLowerCase() === "potato")
          const tomato = entry.items.find((i) => i.name.toLowerCase() === "tomato")

          return {
            date: entry.date,
            onion: onion ? Number(onion.price) : 0,
            potato: potato ? Number(potato.price) : 0,
            tomato: tomato ? Number(tomato.price) : 0,
          }
        })
      : [{ date: "2025-01-01", onion: 0, potato: 0, tomato: 0 }]

  if (loadingProducts)
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading...
      </div>
    )

  if (errorProducts)
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold text-red-600">
        Error: {productError.message}
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
            📊 User Dashboard
          </h1>

          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            {["priceTrends", "watchlist", "myOrders"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded font-semibold ${
                  activeTab === tab
                    ? "bg-red-500 text-white"
                    : "bg-white border border-gray-300"
                }`}
              >
                {tab === "priceTrends"
                  ? "দাম ট্রেন্ড"
                  : tab === "watchlist"
                  ? "ওয়াচলিস্ট"
                  : "আমার অর্ডার"}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
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
                    <Line type="monotone" dataKey="onion" stroke="#dc2626" strokeWidth={3} name="Onion (৳/kg)" />
                    <Line type="monotone" dataKey="potato" stroke="#ea580c" strokeWidth={3} name="Potato (৳/kg)" />
                    <Line type="monotone" dataKey="tomato" stroke="#f97316" strokeWidth={3} name="Tomato (৳/kg)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === "watchlist" && (
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold text-red-700 mb-4">📌 My Watchlist</h2>
              {loadingWatchlist ? (
                <p>Loading watchlist...</p>
              ) : watchlist.length === 0 ? (
                <p className="text-gray-500">Your watchlist is empty.</p>
              ) : (
                <table className="w-full text-left border border-gray-200">
                  <thead>
                    <tr className="bg-red-100">
                      <th className="px-4 py-2 border-b">Product</th>
                      <th className="px-4 py-2 border-b">Price (৳)</th>
                      <th className="px-4 py-2 border-b">Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {watchlist.map((item) => (
                      <tr key={item._id} className="hover:bg-red-50">
                        <td className="px-4 py-2 border-b">{item.product}</td>
                        <td className="px-4 py-2 border-b">{item.price}</td>
                        <td className="px-4 py-2 border-b">{item.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {activeTab === "myOrders" && (
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold text-red-700 mb-4">🛍️ My Orders</h2>
              {loadingOrders ? (
                <p>Loading orders...</p>
              ) : orders.length === 0 ? (
                <p className="text-gray-500">You have not placed any orders yet.</p>
              ) : (
                <table className="w-full text-left border border-gray-200">
                  <thead>
                    <tr className="bg-red-100">
                      <th className="px-4 py-2 border-b">Market</th>
                      <th className="px-4 py-2 border-b">Date</th>
                      <th className="px-4 py-2 border-b">Total Price (৳)</th>
                      <th className="px-4 py-2 border-b">Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-red-50">
                        <td className="px-4 py-2 border-b">{order.marketName}</td>
                        <td className="px-4 py-2 border-b">{order.date}</td>
                        <td className="px-4 py-2 border-b">{order.totalPrice}</td>
                        <td className="px-4 py-2 border-b capitalize">{order.payment_status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardHome
