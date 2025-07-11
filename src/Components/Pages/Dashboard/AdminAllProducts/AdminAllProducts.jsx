import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiousSecure";

const AdminAllProducts = () => {
    const [products, setProducts] = useState([]);
    const [rejectionModal, setRejectionModal] = useState(null); // product ID for modal
    const [rejectionReason, setRejectionReason] = useState("");
    const axioseSecure = useAxiosSecure();

    useEffect(() => {
        axioseSecure
            .get("/product")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleApprove = async (id) => {
        try {
            await axioseSecure.patch(`/product/${id}/approve`);
            toast.success("Approved");
            setProducts(
                products.map((p) => (p._id === id ? { ...p, status: "approved" } : p))
            );
        } catch {
            toast.error("Failed to approve");
        }
    };

    const handleReject = async () => {
        try {
            await axioseSecure.patch(`/products/${rejectionModal}/reject`, {
                reason: rejectionReason,
            });
            toast.success("Rejected");
            setProducts(
                products.map((p) =>
                    p._id === rejectionModal
                        ? { ...p, status: "rejected", rejectionReason }
                        : p
                )
            );
            setRejectionModal(null);
            setRejectionReason("");
        } catch {
            toast.error("Rejection failed");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">🛠️ All Vendor Products</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Vendor</th>
                            <th>Status</th>
                            <th>Rejection Reason</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr key={p._id}>
                                <td>{p.itemName}</td>
                                <td>{p.vendorEmail}</td>
                                <td>{p.status}</td>
                                <td>{p.rejectionReason || "-"}</td>
                                <td>
                                    {p.status === "pending" && (
                                        <>
                                            <button onClick={() => handleApprove(p._id)} className="btn btn-sm btn-success mr-2">
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => setRejectionModal(p._id)}
                                                className="btn btn-sm btn-error"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Rejection Modal */}
            {rejectionModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow w-[400px]">
                        <h3 className="text-lg font-bold mb-2">Rejection Reason</h3>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            rows="3"
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                        />
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                onClick={() => setRejectionModal(null)}
                                className="btn btn-sm btn-outline"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReject}
                                className="btn btn-sm btn-error"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAllProducts;
