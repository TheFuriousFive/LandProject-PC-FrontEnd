"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, CheckCircle } from "lucide-react";

export default function AddNewLand() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    acres: "",
    price: "",
    zoning: "Agricultural",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Mock Saving to DB via LocalStorage
      const existingListings = JSON.parse(
        localStorage.getItem("land_listings") || "[]",
      );

      const newListing = {
        ...formData,
        id: "land_" + Date.now(),
        status: "pending",
        ownerId: "owner1",
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(
        "land_listings",
        JSON.stringify([newListing, ...existingListings]),
      );

      // Add to logs
      const logs = JSON.parse(localStorage.getItem("owner_logs") || "[]");
      logs.unshift({
        id: Date.now(),
        action: "Submitted new listing",
        target: newListing.title,
        date: new Date().toISOString(),
      });
      localStorage.setItem("owner_logs", JSON.stringify(logs));

      router.push("/owner/lists");
    }, 1000);
  };

  return (
    <div className="p-8 md:p-12 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Add New Land Listing
        </h1>
        <p className="text-gray-500 font-medium">
          Provide details about your property. All submissions require Ministry
          approval.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* General Details */}
          <div className="space-y-6 md:col-span-2">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Listing Title
              </label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g. Premium Agricultural Land in Kansas"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Location
              </label>
              <input
                required
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="City, State"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Size (Acres)
              </label>
              <input
                required
                type="number"
                value={formData.acres}
                onChange={(e) =>
                  setFormData({ ...formData, acres: e.target.value })
                }
                placeholder="e.g. 120"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Asking Price
              </label>
              <input
                required
                type="text"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="e.g. $250,000"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Zoning Type
              </label>
              <select
                value={formData.zoning}
                onChange={(e) =>
                  setFormData({ ...formData, zoning: e.target.value })
                }
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors"
                disabled={isSubmitting}
              >
                <option>Agricultural</option>
                <option>Residential</option>
                <option>Commercial</option>
                <option>Mixed Use</option>
              </select>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe the property's features, soil quality, access to water/roads..."
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors resize-none"
              disabled={isSubmitting}
            ></textarea>
          </div>

          {/* Image Upload Mock */}
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Property Images / Documents
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
              <UploadCloud className="mx-auto text-gray-400 mb-3" size={32} />
              <p className="font-semibold text-gray-700">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-gray-500 mt-1">
                SVG, PNG, JPG or PDF (max. 10MB)
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 text-gray-700 font-bold hover:bg-gray-50 rounded-xl transition-colors mr-4"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#0f0f11] text-[#9afb21] px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors min-w-[200px]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                Submit for Approval <CheckCircle size={18} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
