"use client";

import { UploadCloud, X } from "lucide-react";
import { useRef } from "react";

export default function ImageUploader({
  images,
  setImages,
  maxPhotos = 5,
  disabled,
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Filter to ensure we only get proper image types and they don't exceed size limit (e.g. 10MB)
    const validFiles = files.filter((file) => {
      const isValidType = ["image/png", "image/jpeg", "image/jpg"].includes(
        file.type,
      );
      const isValidSize = file.size <= 10 * 1024 * 1024;
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      alert(
        "Some files were skipped. Only PNG, JPG, JPEG under 10MB are allowed.",
      );
    }

    const totalImages = images.length + validFiles.length;
    if (totalImages > maxPhotos) {
      alert(`You can only upload a maximum of ${maxPhotos} photos.`);
      // Only take up to the limit
      const allowedFiles = validFiles.slice(0, maxPhotos - images.length);
      setImages([...images, ...allowedFiles]);
    } else {
      setImages([...images, ...validFiles]);
    }

    // Reset input so the same files can be selected again if removed and re-added
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="w-full">
      <input
        type="file"
        multiple
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={disabled}
      />

      <div
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors cursor-pointer ${
          disabled
            ? "bg-gray-100 border-gray-200 cursor-not-allowed"
            : "border-gray-300 bg-gray-50 hover:bg-gray-100"
        }`}
      >
        <UploadCloud className="mx-auto text-gray-400 mb-3" size={32} />
        <p className="font-semibold text-gray-700">Click to browse photos</p>
        <p className="text-sm text-gray-500 mt-1">
          PNG, JPG up to 10MB (max {maxPhotos} photos)
        </p>
      </div>

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {images.map((file, index) => (
            <div
              key={index}
              className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-square"
            >
              {/* Note: URL.createObjectURL creates a temporary URL for previewing local files */}
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                disabled={disabled}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
