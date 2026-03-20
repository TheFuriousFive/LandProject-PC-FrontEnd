"use client";

import { X } from "lucide-react";
import LandForm from "./LandForm";

export default function EditModal({ isOpen, initialData, onClose, onSuccess }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl relative my-8 animate-in fade-in slide-in-from-bottom-4 duration-200">
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Edit Land Listing
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Update your property details.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 md:p-8 bg-gray-50">
          <LandForm
            mode="edit"
            initialData={initialData}
            onSubmitSuccess={onSuccess}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}
