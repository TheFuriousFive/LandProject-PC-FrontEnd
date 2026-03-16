"use client";
import React, { useState } from "react";
import {
  Upload,
  MapPin,
  DollarSign,
  Ruler,
  FileText,
  Send,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useListings } from "../../_components/useListings";

export default function AddLand() {
  const router = useRouter();
  const { addListing } = useListings();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    propertyTitle: "",
    location: "",
    price: "",
    acres: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API delay
    setTimeout(() => {
      addListing({
        ...formData,
        acres: Number(formData.acres) || 0,
      });
      setIsSubmitting(false);
      router.push("/owner/lists");
    }, 800);
  };

  return (
    <main className="p-8 md:p-12 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">
          Add New Land Listing
        </h1>
        <p className="text-gray-500 font-medium text-lg">
          Provide detailed information about your property. All submissions
          require Ministry approval.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white p-8 border border-gray-200 rounded-3xl shadow-sm"
      >
        {/* Basic Info */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            Basic Details
          </h2>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Property Title *
            </label>
            <input
              type="text"
              name="propertyTitle"
              required
              value={formData.propertyTitle}
              onChange={handleChange}
              placeholder="e.g. Prime Agricultural Land in Texas"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9afb21] focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location *
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Austin, TX"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9afb21] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Total Area (Acres) *
              </label>
              <div className="relative">
                <Ruler
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="number"
                  name="acres"
                  required
                  min="0"
                  step="0.01"
                  value={formData.acres}
                  onChange={handleChange}
                  placeholder="e.g. 50"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9afb21] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Asking Price *
            </label>
            <div className="relative">
              <DollarSign
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. $250,000"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9afb21] focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            Description
          </h2>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Property Description *
            </label>
            <textarea
              name="description"
              required
              rows="5"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the prominent features, soil quality, water access, and zoning of the land..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9afb21] focus:border-transparent outline-none transition-all resize-none"
            ></textarea>
          </div>
        </div>

        {/* Media & Docs Upload */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            Media & Documents
          </h2>
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer flex flex-col items-center justify-center">
            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
              <Upload className="text-blue-500" size={24} />
            </div>
            <p className="font-semibold text-gray-900 mb-1">
              Click to upload images and documents
            </p>
            <p className="text-sm text-gray-500 mb-4">
              or drag and drop them here
            </p>
            <div className="flex gap-2 text-xs text-gray-400">
              <span className="bg-gray-200 px-2 py-1 rounded">JPG, PNG</span>
              <span className="bg-gray-200 px-2 py-1 rounded">
                PDF (Deeds, Surveys)
              </span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-6 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-[#0f0f11] text-[#9afb21] px-8 py-4 rounded-xl font-bold text-lg hover:bg-black transition-all disabled:opacity-70"
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <Send size={20} />
                Submit for Verification
              </>
            )}
          </button>
        </div>
      </form>
    </main>
  );
}
