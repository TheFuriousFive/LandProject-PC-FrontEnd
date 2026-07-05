"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function ContactInquiryCard({ ownerName, listingId }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState("");

  const handleSendInquiry = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus("submitting");

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token")?.replace(/^"|"$/g, "") : "";
      
      if (!token) {
        alert("Please log in as an Investor to contact the owner.");
        router.push("/login");
        return;
      }

      const response = await fetch(`${API_BASE}/landapp/investors/listings/${listingId}/inquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: message }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || "Failed to send inquiry");
      }

      setStatus("success");
      setMessage(""); // Clear the box
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(
        error.message.includes("already sent") 
          ? "You have already sent an inquiry for this property." 
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 sticky top-6 shadow-sm">
      <h3 className="text-xl font-extrabold text-gray-900 mb-2">
        Interested in this land?
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        Send a direct inquiry to {ownerName || "the owner"}. They will get back to you via email or phone.
      </p>

      {status === "success" ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
          <p className="font-bold text-green-900 mb-1">Inquiry Sent!</p>
          <p className="text-sm text-green-700">
            Check your <a href="/investor/responses" className="underline font-bold">Responses Dashboard</a> for updates.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSendInquiry} className="space-y-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hi, I would like to know more about..."
            rows="4"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors resize-none"
            required
          />

          {status === "error" && (
            <div className="flex items-start gap-2 text-red-600 text-xs font-medium bg-red-50 p-3 rounded-lg border border-red-100">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <p>{errorMessage}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "submitting" || !message.trim()}
            className="w-full flex items-center justify-center gap-2 bg-[#0f0f11] text-[#9afb21] py-3.5 rounded-xl font-bold hover:bg-black transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? (
              "Sending..."
            ) : (
              <>
                <Send size={16} /> Send Inquiry
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}