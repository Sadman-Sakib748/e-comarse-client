import React from 'react';

const DashbordHome = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>

            {/* Cart Summary Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Card 1 */}
                <div className="bg-white shadow rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2">1,200</p>
                </div>

                {/* Card 2 */}
                <div className="bg-white shadow rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">3,500</p>
                </div>

                {/* Card 3 */}
                <div className="bg-white shadow rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
                    <p className="text-3xl font-bold text-purple-600 mt-2">$45,000</p>
                </div>

                {/* Card 4 */}
                <div className="bg-white shadow rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-700">Pending Approvals</h3>
                    <p className="text-3xl font-bold text-red-600 mt-2">17</p>
                </div>
            </div>
        </div>
    );
};

export default DashbordHome;
