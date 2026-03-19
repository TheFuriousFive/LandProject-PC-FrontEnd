"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, CheckCircle } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import MDEditor to avoid SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function AddNewLand() {
  const router = useRouter();
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
    documents: [
      { file: null, description: "" },
      { file: null, description: "" },
      { file: null, description: "" },
    ],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [keywordInput, setKeywordInput] = useState("");

  // Predefined keywords for land listings
  const predefinedKeywords = [
    "Agricultural", "Residential", "Commercial", "Industrial", "Forest", "Waterfront",
    "Mountain View", "City View", "Highway Access", "Airport Nearby", "School District",
    "Hospital Nearby", "Shopping Center", "Public Transport", "Irrigation", "Fertile Soil",
    "Organic Farm", "Vineyard", "Orchard", "Livestock", "Fishing", "Hiking", "Recreational",
    "Investment", "Development", "Conservation", "Historic", "Modern", "Luxury", "Budget"
  ];

  // Handle adding keywords
  const addKeyword = (keyword) => {
    if (keyword && !formData.keywords.includes(keyword)) {
      setFormData({
        ...formData,
        keywords: [...formData.keywords, keyword]
      });
    }
    setKeywordInput("");
  };

  // Handle removing keywords
  const removeKeyword = (keywordToRemove) => {
    setFormData({
      ...formData,
      keywords: formData.keywords.filter(keyword => keyword !== keywordToRemove)
    });
  };

  // Handle keyword input key press
  const handleKeywordKeyPress = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const keyword = keywordInput.trim();
      if (keyword) {
        addKeyword(keyword);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate location
    if (!formData.location.city.trim() || !formData.location.state.trim()) {
      alert("Please provide both city and state for the location.");
      return;
    }

    // Validate size
    if (!formData.size.value || parseFloat(formData.size.value) <= 0) {
      alert("Please provide a valid size greater than 0.");
      return;
    }

    // Validate description
    if (!formData.description || formData.description.trim() === "") {
      alert("Please provide a description for the property.");
      return;
    }

    // Validate that at least one document is uploaded
    const hasDocument = formData.documents.some(doc => doc.file !== null);
    if (!hasDocument) {
      alert("Please upload at least one essential document for ministry verification.");
      return;
    }

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
        location: formData.location,
        size: formData.size,
        keywords: formData.keywords,
        documents: formData.documents.map(doc => ({
          description: doc.description,
          fileName: doc.file ? doc.file.name : null,
          fileSize: doc.file ? doc.file.size : null,
        })),
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
          Provide details about your property and upload essential documents. All submissions require Ministry
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
                Location Details
              </label>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    required
                    type="text"
                    value={formData.location.city}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: { ...formData.location, city: e.target.value }
                      })
                    }
                    placeholder="City"
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors"
                    disabled={isSubmitting}
                  />
                  <input
                    required
                    type="text"
                    value={formData.location.state}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: { ...formData.location, state: e.target.value }
                      })
                    }
                    placeholder="State/Province"
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors"
                    disabled={isSubmitting}
                  />
                </div>
                <input
                  type="text"
                  value={formData.location.address}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: { ...formData.location, address: e.target.value }
                    })
                  }
                  placeholder="Full Address (optional)"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors"
                  disabled={isSubmitting}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    step="any"
                    value={formData.location.latitude}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: { ...formData.location, latitude: e.target.value }
                      })
                    }
                    placeholder="Latitude (optional)"
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors"
                    disabled={isSubmitting}
                  />
                  <input
                    type="number"
                    step="any"
                    value={formData.location.longitude}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: { ...formData.location, longitude: e.target.value }
                      })
                    }
                    placeholder="Longitude (optional)"
                    className="w-full bg-gray-50 border border-gray-200 text-gray-200 text-sm rounded-xl px-4 py-3 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Size
              </label>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <input
                    required
                    type="number"
                    value={formData.size.value}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        size: { ...formData.size, value: e.target.value }
                      })
                    }
                    placeholder="Enter size"
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors"
                    disabled={isSubmitting}
                  />
                </div>
                <select
                  value={formData.size.unit}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      size: { ...formData.size, unit: e.target.value }
                    })
                  }
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors"
                  disabled={isSubmitting}
                >
                  <option value="acres">Acres</option>
                  <option value="hectares">Hectares</option>
                  <option value="sq_meters">Sq Meters</option>
                  <option value="sq_feet">Sq Feet</option>
                  <option value="sq_yards">Sq Yards</option>
                </select>
              </div>
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
            <div className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl overflow-hidden focus-within:ring-[#9afb21] focus-within:border-[#9afb21] transition-colors">
              <MDEditor
                value={formData.description}
                onChange={(value) => setFormData({ ...formData, description: value || "" })}
                preview="edit"
                hideToolbar={false}
                height={200}
                data-color-mode="light"
                className="custom-md-editor"
                textareaProps={{
                  placeholder: "Describe the property's features, soil quality, access to water/roads...",
                  disabled: isSubmitting
                }}
              />
            </div>
          </div>

          {/* Keywords Section */}
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-4">
              Keywords & Tags
            </label>
            <p className="text-sm text-gray-500 mb-4">
              Add keywords to help investors find your listing. Select from suggestions or add custom tags.
            </p>

            {/* Selected Keywords */}
            {formData.keywords.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Selected Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#9afb21] text-black font-medium"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => removeKeyword(keyword)}
                        className="ml-2 text-black hover:text-gray-700 focus:outline-none"
                        disabled={isSubmitting}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Add Custom Keyword */}
            <div className="mb-4">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyPress={handleKeywordKeyPress}
                placeholder="Type a custom keyword and press Enter or comma"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors"
                disabled={isSubmitting}
              />
            </div>

            {/* Predefined Keywords */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Suggested Keywords:</p>
              <div className="flex flex-wrap gap-2">
                {predefinedKeywords
                  .filter(keyword => !formData.keywords.includes(keyword))
                  .map((keyword, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => addKeyword(keyword)}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-[#9afb21] hover:text-black transition-colors border border-gray-200"
                      disabled={isSubmitting}
                    >
                      + {keyword}
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {/* Property Images */}
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Property Images
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

          {/* Essential Documents for Ministry Verification */}
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-4">
              Essential Documents for Ministry Verification
            </label>
            <div className="space-y-4">
              {formData.documents.map((doc, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                  <div className="mb-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Document {index + 1} Description
                    </label>
                    <input
                      type="text"
                      value={doc.description}
                      onChange={(e) => {
                        const newDocs = [...formData.documents];
                        newDocs[index].description = e.target.value;
                        setFormData({ ...formData, documents: newDocs });
                      }}
                      placeholder={`Describe what Document ${index + 1} contains`}
                      className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-lg px-3 py-2 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Upload Document {index + 1}
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          // Check file size (10MB limit)
                          if (file.size > 10 * 1024 * 1024) {
                            alert(`File size exceeds 10MB limit for Document ${index + 1}`);
                            e.target.value = "";
                            return;
                          }
                          // Check file type
                          const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
                          if (!allowedTypes.includes(file.type)) {
                            alert(`Invalid file type for Document ${index + 1}. Only PDF, PNG, JPG allowed.`);
                            e.target.value = "";
                            return;
                          }
                        }
                        const newDocs = [...formData.documents];
                        newDocs[index].file = file;
                        setFormData({ ...formData, documents: newDocs });
                      }}
                      className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-lg px-3 py-2 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#9afb21] file:text-black hover:file:bg-[#8ae91d]"
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      PDF, PNG, JPG up to 10MB
                    </p>
                  </div>
                </div>
              ))}
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
      <style>{`
        .custom-md-editor .w-md-editor {
          border: none !important;
          box-shadow: none !important;
          background: transparent !important;
        }
        .custom-md-editor .w-md-editor-text {
          font-size: 0.875rem !important;
          color: #111827 !important;
          background: transparent !important;
          border: none !important;
          border-radius: 0 !important;
          padding: 1rem !important;
          min-height: 120px !important;
        }
        .custom-md-editor .w-md-editor-text:focus {
          outline: none !important;
        }
        .custom-md-editor .w-md-editor-bar {
          background: #f9fafb !important;
          border-bottom: 1px solid #e5e7eb !important;
          border-radius: 0.75rem 0.75rem 0 0 !important;
          padding: 0.5rem !important;
        }
        .custom-md-editor .w-md-editor-bar svg {
          color: #374151 !important;
        }
        .custom-md-editor .w-md-editor-bar button:hover svg {
          color: #9afb21 !important;
        }
        .custom-md-editor .w-md-editor-bar button.active svg {
          color: #9afb21 !important;
        }
        .custom-md-editor .w-md-editor-text-pre {
          background: transparent !important;
          color: #6b7280 !important;
          font-style: normal !important;
        }
      `}</style>
    </div>
  );
}
