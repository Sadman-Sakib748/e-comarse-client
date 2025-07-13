import React from 'react';

const Markets = () => {
    const markets = [
        'Gulshan Market',
        'New Market',
        'Karwan Bazar',
        'Mirpur 1',
        'Uttara Sector 7',
        'Banani Super Market',
        'Shantinagar Bazar',
        'Mohakhali Kitchen Market',
    ];

    return (
        <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-red-700 mb-4">Available Markets</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
                {markets.map((market, index) => (
                    <li
                        key={index}
                        className="bg-orange-100 border-l-4 border-red-600 p-3 rounded shadow-sm hover:bg-orange-200 transition"
                    >
                        {market}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Markets;
