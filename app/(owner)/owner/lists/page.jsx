"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Eye, BadgeCheck } from "lucide-react";
import ConfirmModal from "../../_components/ConfirmModal";
import EditModal from "../../_components/EditModal";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
const SOLD_LISTING_STORAGE_KEY = "owner_sold_listing_ids";

export default function MyAds() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sellingId, setSellingId] = useState(null);
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [listingToEdit, setListingToEdit] = useState(null);

  // ---------------- FETCH ----------------
  const getSoldListingIds = () => {
    try {
      return JSON.parse(localStorage.getItem(SOLD_LISTING_STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  };

  const getMockListings = () => {
    const soldIds = getSoldListingIds();
    const sample = [
      {
        id: "mock-001",
        title: "Green Valley Farm Plot",
        area: 4.2,
        location: "Nakuru County",
        price: "$120,000",
        status: "approved",
      },
      {
        id: "mock-002",
        title: "Lakeside Investment Land",
        area: 7.5,
        location: "Kisumu County",
        price: "$275,000",
        status: "pending",
      },
      {
        id: "mock-003",
        title: "Town Edge Commercial Parcel",
        area: 2.1,
        location: "Kiambu County",
        price: "$185,000",
        status: "rejected",
      },
    ];

    return sample.map((listing) =>
      soldIds.includes(listing.id) ? { ...listing, status: "sold" } : listing,
    );
  };

  const fetchListings = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE}/landapp/owners/listings`, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) throw new Error("Failed to fetch listings");

      const data = await response.json();
      const soldIds = getSoldListingIds();
      const normalized = (Array.isArray(data) ? data : []).map((listing) => {
        if (soldIds.includes(listing.id)) {
          return { ...listing, status: "sold" };
        }
        return listing;
      });

      if (normalized.length === 0) {
        setListings(getMockListings());
        setIsUsingMockData(true);
      } else {
        setListings(normalized);
        setIsUsingMockData(false);
      }
      console.log(data);
    } catch (err) {
      console.error(err);
      setListings(getMockListings());
      setIsUsingMockData(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

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
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        },
      );

      if (!response.ok) throw new Error("Delete failed");

      // remove from UI
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

  const markAsSold = (id) => {
    if (!id) return;

    setSellingId(id);
    try {
      const existingIds = getSoldListingIds();
      if (!existingIds.includes(id)) {
        localStorage.setItem(
          SOLD_LISTING_STORAGE_KEY,
          JSON.stringify([...existingIds, id]),
        );
      }

      setListings((prev) =>
        prev.map((listing) =>
          listing.id === id ? { ...listing, status: "sold" } : listing,
        ),
      );
    } finally {
      setSellingId(null);
    }
  };

  // ---------------- STATUS UI ----------------
  const getStatusBadge = (status) => {
    const normalizedStatus = String(status || "").toLowerCase();

    switch (normalizedStatus) {
      case "sold":
        return (
          <span className="px-3 py-1 bg-slate-800 text-white rounded-full text-xs font-bold uppercase">
            Sold
          </span>
        );
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
      default:
        return (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold uppercase">
            Pending
          </span>
        );
    }
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
          {isUsingMockData && (
            <div className="px-6 py-3 text-sm bg-blue-50 text-blue-800 border-b border-blue-100">
              Showing demo listings because no live data was found. You can test the Mark Sold button here.
            </div>
          )}

          {listings.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No listings found
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

                    <td className="px-6 py-4">{land.location}</td>

                    <td className="px-6 py-4 font-semibold">{land.price}</td>

                    <td className="px-6 py-4">{getStatusBadge(land.status)}</td>

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

                        <button
                          onClick={() => markAsSold(land.id)}
                          disabled={String(land.status || "").toLowerCase() === "sold" || sellingId === land.id}
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-md border ${
                            String(land.status || "").toLowerCase() === "sold"
                              ? "bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed"
                              : "bg-slate-900 text-white border-slate-900 hover:bg-slate-700"
                          }`}
                        >
                          <BadgeCheck size={14} />
                          {sellingId === land.id
                            ? "Saving..."
                            : String(land.status || "").toLowerCase() === "sold"
                              ? "Sold"
                              : "Mark Sold"}
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
