import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Loader2, Trash2, CheckCircle2, XCircle } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiousSecure"; // keep user path
import Spinner from "../../Spinner/Spinner";

const AdminOffersPage = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [rejectReason, setRejectReason] = useState({}); // {offerId: string}
    const [showRejectBoxId, setShowRejectBoxId] = useState(null);

    // --- Query: all offers ---
    const {
        data: offers = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["adminOffers"],
        queryFn: async () => {
            const res = await axiosSecure.get("/offers");
            return res.data || [];
        },
    });

    // --- Mutations ---
    const approveOffer = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/offers/approve/${id}`);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Offer approved!");
            queryClient.invalidateQueries({ queryKey: ["adminOffers"] });
        },
        onError: (err) => {
            console.error(err);
            toast.error("Failed to approve offer");
        },
    });

    const rejectOffer = useMutation({
        mutationFn: async ({ id, reason }) => {
            const res = await axiosSecure.patch(`/offers/reject/${id}`, { reason });
            return res.data;
        },
        onSuccess: (_data, variables) => {
            toast.success("Offer rejected!");
            setShowRejectBoxId(null);
            // clear typed reason for this offer
            setRejectReason((prev) => {
                const copy = { ...prev };
                delete copy[variables.id];
                return copy;
            });
            queryClient.invalidateQueries({ queryKey: ["adminOffers"] });
        },
        onError: (err) => {
            console.error(err);
            toast.error("Failed to reject offer");
        },
    });

    const deleteOffer = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/offers/${id}`);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Offer deleted!");
            queryClient.invalidateQueries({ queryKey: ["adminOffers"] });
        },
        onError: (err) => {
            console.error(err);
            toast.error("Failed to delete offer");
        },
    });

    // convenience booleans (react-query v4 vs v5 compatibility)
    const approvingId = approveOffer.variables ?? approveOffer.variablesRef; // best-effort
    const rejectingId = rejectOffer.variables?.id ?? rejectOffer.variablesRef?.id;
    const deletingId = deleteOffer.variables ?? deleteOffer.variablesRef;
    const isApproving = approveOffer.isPending || approveOffer.isLoading;
    const isRejecting = rejectOffer.isPending || rejectOffer.isLoading;
    const isDeleting = deleteOffer.isPending || deleteOffer.isLoading;

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return (
            <div className="max-w-6xl mx-auto py-8 px-4 text-center text-red-600">
                Failed to load offers: {error?.message || "Unknown error"}
            </div>
        );
    }

    const handleDelete = (id, title) => {
        const ok = window.confirm(`Delete offer\n\n${title || id}?`);
        if (!ok) return;
        deleteOffer.mutate(id);
    };

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <h2 className="text-3xl font-bold mb-6 text-red-700">Manage Offers</h2>

            {offers.length === 0 && (
                <p className="text-gray-600 text-center">No offers found.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.map((offer) => {
                    const status = offer?.status || "pending";
                    const img = offer?.image || "https://via.placeholder.com/400x160?text=No+Image";
                    const title = offer?.title || "Untitled Offer";
                    const isThisApproving = isApproving && approvingId === offer._id;
                    const isThisRejecting = isRejecting && rejectingId === offer._id;
                    const isThisDeleting = isDeleting && deletingId === offer._id;

                    return (
                        <div
                            key={offer._id}
                            className="border p-4 rounded shadow bg-white flex flex-col justify-between"
                        >
                            <div>
                                <img
                                    src={img}
                                    alt={title}
                                    className="w-full h-40 object-cover rounded"
                                />
                                <h3 className="text-lg font-semibold mt-2">{title}</h3>
                                <p className="text-sm text-gray-700 mb-1">
                                    Status:{" "}
                                    <span
                                        className={`font-semibold ${status === "approved"
                                                ? "text-green-600"
                                                : status === "rejected"
                                                    ? "text-red-600"
                                                    : "text-yellow-600"
                                            }`}
                                    >
                                        {status}
                                    </span>
                                </p>
                                {offer.rejectionReason && (
                                    <p className="text-xs text-red-500 italic">
                                        Reason: {offer.rejectionReason}
                                    </p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="mt-4 flex flex-wrap gap-2">
                                {status !== "approved" && (
                                    <button
                                        type="button"
                                        aria-label="Approve offer"
                                        disabled={isThisApproving || isThisDeleting}
                                        onClick={() => approveOffer.mutate(offer._id)}
                                        className="flex items-center gap-1 px-3 py-1 bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded text-xs hover:bg-green-700"
                                    >
                                        {isThisApproving ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <CheckCircle2 className="w-4 h-4" />
                                        )}
                                        Approve
                                    </button>
                                )}

                                {status !== "rejected" && (
                                    <>
                                        <button
                                            type="button"
                                            aria-label="Reject offer"
                                            disabled={isThisRejecting || isThisDeleting}
                                            onClick={() =>
                                                setShowRejectBoxId((cur) => (cur === offer._id ? null : offer._id))
                                            }
                                            className="flex items-center gap-1 px-3 py-1 bg-yellow-500 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded text-xs hover:bg-yellow-600"
                                        >
                                            {isThisRejecting ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <XCircle className="w-4 h-4" />
                                            )}
                                            Reject
                                        </button>
                                        {showRejectBoxId === offer._id && (
                                            <div className="w-full mt-2">
                                                <textarea
                                                    placeholder="Enter rejection reason"
                                                    value={rejectReason[offer._id] || ""}
                                                    onChange={(e) =>
                                                        setRejectReason((prev) => ({
                                                            ...prev,
                                                            [offer._id]: e.target.value,
                                                        }))
                                                    }
                                                    className="w-full text-xs p-1 border rounded"
                                                />
                                                <button
                                                    type="button"
                                                    disabled={isThisRejecting || !rejectReason[offer._id]?.trim()}
                                                    onClick={() =>
                                                        rejectOffer.mutate({
                                                            id: offer._id,
                                                            reason: rejectReason[offer._id]?.trim() || "No reason provided",
                                                        })
                                                    }
                                                    className="mt-1 px-3 py-1 bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded text-xs hover:bg-red-700"
                                                >
                                                    Confirm Reject
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}

                                <button
                                    type="button"
                                    aria-label="Delete offer"
                                    disabled={isThisDeleting}
                                    onClick={() => handleDelete(offer._id, title)}
                                    className="flex items-center gap-1 px-3 py-1 bg-gray-600 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded text-xs hover:bg-gray-700"
                                >
                                    {isThisDeleting ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="w-4 h-4" />
                                    )}
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AdminOffersPage;
