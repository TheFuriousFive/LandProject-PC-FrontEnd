"use client";

import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import dynamic from "next/dynamic";
import ImageUploader from "./ImageUploader";

// Dynamically import MDEditor to avoid SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function LandForm({
  mode = "create",
  initialData,
  onSubmitSuccess,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    title: "",
    location: {
      city: "",
      state: "",
      address: "",
      latitude: "",
      longitude: "",
    },
    size: {
      value: "",
      unit: "acres",
    },
    price: "",
    zoning: "Agricultural",
    description: "",
    keywords: [],
    images: [],
    documents: [{ file: null, description: "" }],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [keywordInput, setKeywordInput] = useState("");

  // Initialize data if in edit mode
  useEffect(() => {
    if (initialData && mode === "edit") {
      let city = "";
      let state = "";

      // Parse "City, State" from the backend string
      if (initialData.location) {
        const parts = initialData.location.split(",");
        if (parts.length >= 2) {
          city = parts[0].trim();
          state = parts[1].trim();
        } else {
          city = initialData.location; // fallback
        }
      }

      setFormData({
        title: initialData.title || "",
        location: {
          city: city,
          state: state,
          address: "",
          latitude: "",
          longitude: "",
        },
        size: {
          value: initialData.area || "",
          unit: "acres",
        },
        price: initialData.price || "",
        zoning: initialData.land_type || "Agricultural",
        description: initialData.description || "",
        keywords: [], // No keywords array provided in basic DTO, reset to empty
        images: [], // File objects cannot be repopulated securely from URLs, needs re-upload or custom handling backend
        documents: [{ file: null, description: "" }],
      });
    }
  }, [initialData, mode]);

  const predefinedKeywords = [
    "Agricultural",
    "Residential",
    "Commercial",
    "Industrial",
    "Forest",
    "Waterfront",
    "Mountain View",
    "City View",
    "Investment",
    "Development",
  ];

  const addKeyword = (keyword) => {
    if (keyword && !formData.keywords.includes(keyword)) {
      setFormData({ ...formData, keywords: [...formData.keywords, keyword] });
    }
    setKeywordInput("");
  };

  const removeKeyword = (keywordToRemove) => {
    setFormData({
      ...formData,
      keywords: formData.keywords.filter((k) => k !== keywordToRemove),
    });
  };

  const handleKeywordKeyPress = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const keyword = keywordInput.trim();
      if (keyword) addKeyword(keyword);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.location.city.trim() || !formData.location.state.trim()) {
      alert("Please provide both city and state for the location.");
      return;
    }
    if (!formData.size.value || parseFloat(formData.size.value) <= 0) {
      alert("Please provide a valid size greater than 0.");
      return;
    }
    if (!formData.description || formData.description.trim() === "") {
      alert("Please provide a description for the property.");
      return;
    }

    setIsSubmitting(true);

    try {
      let token = "";
      let ownerId = null;
      if (typeof window !== "undefined") {
        const rawToken = localStorage.getItem("token") || "";
        token = rawToken.replace(/^"|"$/g, "").trim();
        let userStr = localStorage.getItem("user");
        if (userStr && userStr.startsWith('"') && userStr.endsWith('"')) {
          userStr = JSON.parse(userStr);
        }
        const loggedInUser = userStr ? JSON.parse(userStr) : null;
        ownerId =
          loggedInUser?.id ||
          loggedInUser?.userId ||
          loggedInUser?.ownerId ||
          loggedInUser?.user?.id ||
          loggedInUser?.user?.Id ||
          null;
      }

      const listingPayload = {
        title: formData.title,
        description: formData.description,
        location: `${formData.location.city}, ${formData.location.state}`,
        landType: formData.zoning,
        land_type: formData.zoning,
        price: parseFloat(formData.price) || 0,
        area: parseFloat(formData.size.value) || 0,
        ownerId: ownerId,
        owner: ownerId,
        owner_id: ownerId,
        land_listing_documents: formData.documents
          .filter((doc) => !!doc.file)
          .map((doc) => ({
            description: doc.description,
            file_name: doc.file.name,
            file_size: doc.file.size,
          })),
        land_listing_images: [],
      };

      const submitFormData = new FormData();
      const payloadBlob = new Blob([JSON.stringify(listingPayload)], {
        type: "application/json",
      });
      submitFormData.append("landData", payloadBlob);

      const deedDoc = formData.documents.find((doc) => !!doc.file);
      if (deedDoc) {
        submitFormData.append("deedDocument", deedDoc.file);
      } else if (mode === "create") {
        // Optionally block if creating, but let's be flexible or assume edit doesn't demand re-uploading doc
      }

      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((file) => {
          submitFormData.append("images", file);
        });
      } else {
        const emptyFile = new File([new Blob([""])], "empty.jpg", {
          type: "image/jpeg",
        });
        submitFormData.append("images", emptyFile);
      }

      const API_BASE =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

      // If editing, point to PUT endpoint, else POST
      const url =
        mode === "edit" && initialData?.id
          ? `${API_BASE}/landapp/owners/listings/${initialData.id}`
          : `${API_BASE}/landapp/owners/listings`;

      const method = mode === "edit" ? "PUT" : "POST";

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      let requestBody;
      
      // The backend PUT endpoint expects application/json, not multipart/form-data
      if (mode === "edit") {
        headers["Content-Type"] = "application/json";
        requestBody = JSON.stringify(listingPayload);
      } else {
        requestBody = submitFormData;
      }

      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: requestBody,
      });

      if (!response.ok) {
        throw new Error((await response.text()) || `Failed to ${mode} listing`);
      }

      const logs = JSON.parse(localStorage.getItem("owner_logs") || "[]");
      logs.unshift({
        id: Date.now(),
        action: mode === "create" ? "Submitted new listing" : "Updated listing",
        target: listingPayload.title,
        date: new Date().toISOString(),
      });
      localStorage.setItem("owner_logs", JSON.stringify(logs));

      if (onSubmitSuccess) onSubmitSuccess();
    } catch (err) {
      console.error(err);
      alert(`Failed to ${mode} listing: ` + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4 md:col-span-2">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Listing Title
            </label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g. Premium Agricultural Land"
              className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:ring-[#9afb21] outline-none"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Location Details
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                required
                type="text"
                value={formData.location.city}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, city: e.target.value },
                  })
                }
                placeholder="City"
                className="w-full bg-white border border-gray-200 text-sm rounded-xl px-4 py-3 focus:ring-[#9afb21] outline-none"
                disabled={isSubmitting}
              />
              <input
                required
                type="text"
                value={formData.location.state}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, state: e.target.value },
                  })
                }
                placeholder="State"
                className="w-full bg-white border border-gray-200 text-sm rounded-xl px-4 py-3 focus:ring-[#9afb21] outline-none"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Size
            </label>
            <div className="flex gap-3">
              <input
                required
                type="number"
                value={formData.size.value}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    size: { ...formData.size, value: e.target.value },
                  })
                }
                placeholder="Area"
                className="w-full bg-white border border-gray-200 text-sm rounded-xl px-4 py-3 focus:ring-[#9afb21] outline-none"
                disabled={isSubmitting}
              />
              <select
                value={formData.size.unit}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    size: { ...formData.size, unit: e.target.value },
                  })
                }
                className="w-32 bg-white border border-gray-200 text-sm rounded-xl px-4 py-3 focus:ring-[#9afb21] outline-none"
                disabled={isSubmitting}
              >
                <option value="acres">Acres</option>
                <option value="hectares">Hectares</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Asking Price
            </label>
            <input
              required
              type="text"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              placeholder="Price"
              className="w-full bg-white border border-gray-200 text-sm rounded-xl px-4 py-3 focus:ring-[#9afb21] outline-none"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Zoning Type
            </label>
            <select
              value={formData.zoning}
              onChange={(e) =>
                setFormData({ ...formData, zoning: e.target.value })
              }
              className="w-full bg-white border border-gray-200 text-sm rounded-xl px-4 py-3 focus:ring-[#9afb21] outline-none"
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
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Description
          </label>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden focus-within:ring-[#9afb21]">
            <MDEditor
              value={formData.description}
              onChange={(val) =>
                setFormData({ ...formData, description: val || "" })
              }
              preview="edit"
              hideToolbar={false}
              height={150}
              data-color-mode="light"
              textareaProps={{ disabled: isSubmitting }}
            />
          </div>
        </div>

        {/* Property Images */}
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Update Images
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Note: To replace images securely, re-upload them here.
          </p>
          <ImageUploader
            images={formData.images}
            setImages={(imgs) => setFormData({ ...formData, images: imgs })}
            disabled={isSubmitting}
          />
        </div>

        {/* Essential Documents */}
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Update Documents
          </label>
          {formData.documents.map((doc, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-4 bg-white"
            >
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={doc.description}
                  onChange={(e) => {
                    const newDocs = [...formData.documents];
                    newDocs[index].description = e.target.value;
                    setFormData({ ...formData, documents: newDocs });
                  }}
                  placeholder="Document description"
                  className="w-full bg-white border border-gray-200 text-sm rounded-lg px-3 py-2 outline-none"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Upload Document
                </label>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const newDocs = [...formData.documents];
                      newDocs[index].file = file;
                      setFormData({ ...formData, documents: newDocs });
                    }
                  }}
                  className="w-full text-sm outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#9afb21] file:text-black"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 rounded-xl mr-3"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-[#0f0f11] text-[#9afb21] px-8 py-2 rounded-xl font-bold hover:bg-black flex items-center justify-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Saving..."
            : mode === "edit"
              ? "Save Changes"
              : "Submit"}
          {!isSubmitting && <CheckCircle size={18} />}
        </button>
      </div>

      <style>{`
        .w-md-editor { border: none !important; box-shadow: none !important; }
        .w-md-editor-text { font-size: 0.875rem !important; padding: 1rem !important; }
      `}</style>
    </form>
  );
}
