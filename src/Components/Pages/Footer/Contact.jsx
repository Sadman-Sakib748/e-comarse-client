import React, { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Thank you, ${formData.name}! Your message has been received.`);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="min-h-screen p-8 bg-gray-50 max-w-lg mx-auto">
            <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium" htmlFor="name">
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium" htmlFor="message">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default Contact;
