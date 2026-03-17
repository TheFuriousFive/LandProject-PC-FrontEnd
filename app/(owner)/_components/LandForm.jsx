"use client";

import { useForm } from "react-hook-form";
import { UploadCloud } from "lucide-react";
import { useState } from "react";

export default function LandForm({
  mode = "create",
  initialData,
  onSubmitSuccess,
  onCancel,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialData || {
      title: "",
      location: "",
      area: "",
      price: "",
      landType: "Agricultural",
      description: "",
    },
  });

  const [apiError, setApiError] = useState(null);

  const onSubmit = async (formData) => {
    console.log(formData);
    setApiError(null);
    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price),
        area: parseFloat(formData.area),
      };

      const token = localStorage.getItem("token");

      const url =
        mode === "edit"
          ? `/landapp/owners/listings/${initialData.id}`
          : "/landapp/owners/listings";
      const method = mode === "edit" ? "PUT" : "POST";

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to save listing");
      }

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (err) {
      setApiError(err.message || "An error occurred while saving.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 w-full"
    >
      {apiError && <p className="text-red-500 mb-4">{apiError}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6 md:col-span-2">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Listing Title
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              placeholder="e.g. Premium Agricultural Land in Kansas"
              className={`w-full bg-gray-50 border ${errors.title ? "border-red-500" : "border-gray-200"} text-gray-900 text-sm rounded-xl px-4 py-3 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors`}
              disabled={isSubmitting}
            />
            {errors.title && (
              <span className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Location
            </label>
            <input
              {...register("location", { required: "Location is required" })}
              placeholder="City, State"
              className={`w-full bg-gray-50 border ${errors.location ? "border-red-500" : "border-gray-200"} text-gray-900 text-sm rounded-xl px-4 py-3 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors`}
              disabled={isSubmitting}
            />
            {errors.location && (
              <span className="text-red-500 text-xs mt-1">
                {errors.location.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Size (Acres / Area)
            </label>
            <input
              type="number"
              {...register("area", { required: "Size is required" })}
              placeholder="e.g. 120"
              className={`w-full bg-gray-50 border ${errors.area ? "border-red-500" : "border-gray-200"} text-gray-900 text-sm rounded-xl px-4 py-3 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors`}
              disabled={isSubmitting}
            />
            {errors.area && (
              <span className="text-red-500 text-xs mt-1">
                {errors.area.message}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Asking Price
            </label>
            <input
              {...register("price", { required: "Price is required" })}
              placeholder="e.g. $250,000"
              className={`w-full bg-gray-50 border ${errors.price ? "border-red-500" : "border-gray-200"} text-gray-900 text-sm rounded-xl px-4 py-3 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors`}
              disabled={isSubmitting}
            />
            {errors.price && (
              <span className="text-red-500 text-xs mt-1">
                {errors.price.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Land Type
            </label>
            <select
              {...register("landType")}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors"
              disabled={isSubmitting}
            >
              <option value="Agricultural">Agricultural</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Mixed Use">Mixed Use</option>
            </select>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            rows={4}
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Describe the property's features, soil quality, access to water/roads..."
            className={`w-full bg-gray-50 border ${errors.description ? "border-red-500" : "border-gray-200"} text-gray-900 text-sm rounded-xl px-4 py-3 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors resize-none`}
            disabled={isSubmitting}
          ></textarea>
          {errors.description && (
            <span className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Image Upload */}
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Property Images / Documents
          </label>
          <label className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer block">
            <input
              type="file"
              multiple
              accept=".svg,.png,.jpg,.jpeg,.pdf"
              className="hidden"
              {...register("documents")}
              disabled={isSubmitting}
            />
            <UploadCloud className="mx-auto text-gray-400 mb-3" size={32} />
            <p className="font-semibold text-gray-700">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-500 mt-1">
              SVG, PNG, JPG or PDF (max. 10MB)
            </p>
          </label>
        </div>
      </div>

      <div className="flex gap-4 items-center mt-6">
        <button
          type="submit"
          className="bg-[#0f0f11] text-[#9afb21] px-6 py-3 rounded-xl font-bold hover:bg-black transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Saving..."
            : mode === "edit"
              ? "Save Changes"
              : "Submit Listing"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-600 px-4 py-2 font-semibold hover:text-gray-900 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
