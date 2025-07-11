import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    LineChart,
    Line,
    Tooltip,
} from "recharts";


const priceData = [
    { month: "Jan", tomatoes: 45, onions: 30, potatoes: 25 },
    { month: "Feb", tomatoes: 52, onions: 35, potatoes: 28 },
    { month: "Mar", tomatoes: 48, onions: 32, potatoes: 30 },
    { month: "Apr", tomatoes: 55, onions: 38, potatoes: 32 },
    { month: "May", tomatoes: 60, onions: 42, potatoes: 35 },
    { month: "Jun", tomatoes: 58, onions: 40, potatoes: 33 },
];

const DashbordHome = () => {
    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Price Trends</h1>
                <p className="text-gray-600">Track how product prices change over time</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Bar Chart Card */}
                <div className="border rounded-xl shadow-sm bg-white">
                    <div className="p-4 border-b">
                        <h2 className="text-lg font-semibold">Monthly Price Comparison</h2>
                        <p className="text-sm text-gray-500">Bar chart showing price trends</p>
                    </div>
                    <div className="p-4 h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={priceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="tomatoes" fill="#ef4444" />
                                <Bar dataKey="onions" fill="#f59e0b" />
                                <Bar dataKey="potatoes" fill="#10b981" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Line Chart Card */}
                <div className="border rounded-xl shadow-sm bg-white">
                    <div className="p-4 border-b">
                        <h2 className="text-lg font-semibold">Price Trend Lines</h2>
                        <p className="text-sm text-gray-500">Line chart showing price movements</p>
                    </div>
                    <div className="p-4 h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={priceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="tomatoes"
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="onions"
                                    stroke="#f59e0b"
                                    strokeWidth={2}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="potatoes"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashbordHome;
