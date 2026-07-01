"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Eye, BadgeCheck } from "lucide-react";
import ConfirmModal from "../../_components/ConfirmModal";
import EditModal from "../../_components/EditModal";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function MyAds() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sellingId, setSellingId] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [listingToEdit, setListingToEdit] = useState(null);

  const fetchListings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You're not signed in. Please log in again.");
        setListings([]);
        return;
      }

      const response = await fetch(`${API_BASE}/landapp/owners/listings`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch listings (status ${response.status})`);
      }

      const data = await response.json();
      setListings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load your listings");
      setListings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  // ---------------- DELETE ----------------
  const initiateDelete = (id) => {
    setListingToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!listingToDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE}/landapp/owners/listings/${listingToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) throw new Error("Delete failed");

      setListings((prev) => prev.filter((l) => l.id !== listingToDelete));
      setDeleteModalOpen(false);
      setListingToDelete(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete listing");
    }
  };

  // ---------------- EDIT ----------------
  const initiateEdit = (land) => {
    setListingToEdit(land);
    setEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    setEditModalOpen(false);
    setListingToEdit(null);
    fetchListings();
  };

  // ---------------- STATUS UI ----------------
  const getStatusBadge = (status) => {
    const normalizedStatus = String(status || "").toLowerCase();

    switch (normalizedStatus) {
      case "approved":
        return (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase">
            Rejected
          </span>
        );
      case "pending_verification":
        return (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold uppercase">
            Pending Verification
          </span>
        );
      case "pending_payment":
        return (
          <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase">
            Pending Payment
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold uppercase">
            {status || "Unknown"}
          </span>
        );
    }
  };

  const getListingStatus = (listing) =>
    String(
      listing?.verificationStatus ||
        listing?.verification_status ||
        listing?.status ||
        "",
    ).toLowerCase();

  const getLocationLabel = (land) => {
    if (land.location && typeof land.location === "object") {
      return (
        land.location.address ||
        [land.location.city, land.location.state].filter(Boolean).join(", ") ||
        "N/A"
      );
    }
    return land.location || "N/A";
  };

  const getPriceLabel = (land) => {
    if (typeof land.price === "number") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(land.price);
    }
    return land.price || "N/A";
  };

  // ---------------- UI ----------------
  if (loading) {
    return <p className="p-10 text-center">Loading...</p>;
  }

  return (
    <>
      <div className="p-8 md:p-12 max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              My Ads
            </h1>
            <p className="text-gray-500">Manage your land listings.</p>
          </div>

          <Link
            href="/owner/add-land"
            className="bg-black text-lime-400 px-5 py-2.5 rounded-xl flex items-center gap-2"
          >
            <Plus size={20} />
            Add New Land
          </Link>
        </div>

        <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
          {error && (
            <div className="px-6 py-3 text-sm bg-red-50 text-red-800 border-b border-red-100">
              {error}
            </div>
          )}

          {listings.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No listings found. Click "Add New Land" to create your first
              listing.
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4">Listing</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {listings.map((land) => (
                  <tr key={land.id}>
                    <td className="px-6 py-4">
                      <p className="font-bold">{land.title}</p>
                      <p className="text-sm text-gray-500">{land.area} Acres</p>
                    </td>

                    <td className="px-6 py-4">{getLocationLabel(land)}</td>

                    <td className="px-6 py-4 font-semibold">
                      {getPriceLabel(land)}
                    </td>

                    <td className="px-6 py-4">
                      {getStatusBadge(getListingStatus(land))}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <Link href={`/property/${land.id}`}>
                          <Eye size={18} />
                        </Link>

                        <button onClick={() => initiateEdit(land)}>
                          <Edit2 size={18} />
                        </button>

                        <button onClick={() => initiateDelete(land.id)}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Listing"
        message="Are you sure?"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />

      <EditModal
        isOpen={editModalOpen}
        initialData={listingToEdit}
        onClose={() => setEditModalOpen(false)}
        onSuccess={handleEditSuccess}
      />
    </>
  );
}
