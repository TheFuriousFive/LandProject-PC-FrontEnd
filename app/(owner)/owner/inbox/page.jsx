"use client";
import { useEffect, useState } from "react";
import { Mail, AlertCircle, User, Phone, FileText, CheckCircle } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function InboxPage() {
  const [inboxItems, setInboxItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInbox = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = typeof window !== "undefined" ? localStorage.getItem("token")?.replace(/^"|"$/g, "") : "";

      const response = await fetch(`${API_BASE}/landapp/owners/inquiries`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!response.ok) throw new Error("Failed to fetch inquiries");
      
      const data = await response.json();
      setInboxItems(data); // Expecting List<OwnerInboxResponseDTO>
    } catch (err) {
      console.error("Failed to fetch inbox:", err);
      setError("Failed to load inbox. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInbox();
  }, []);

  const handleReply = async (inquiryId, method, contactValue) => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token")?.replace(/^"|"$/g, "") : "";

      // 1. Tell the backend we are contacting them
      const response = await fetch(`${API_BASE}/landapp/owners/inquiries/${inquiryId}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ method: method }), // "EMAIL" or "PHONE"
      });

      if (!response.ok) throw new Error("Failed to update inquiry status");

      // 2. Update local state so the UI shows it as "CONTACTED" instantly
      setInboxItems((prev) =>
        prev.map((item) =>
          item.inquiryId === inquiryId ? { ...item, status: "CONTACTED" } : item
        )
      );

      // 3. Actually open the email client or phone dialer
      if (method === "EMAIL") {
        window.location.href = `mailto:${contactValue}?subject=${encodeURIComponent("Regarding your land inquiry")}`;
      } else {
        window.location.href = `tel:${contactValue}`;
      }
    } catch (err) {
      console.error("Reply failed:", err);
      alert("Failed to register reply. Please try again.");
    }
  };

  const totalMessages = inboxItems.length;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-3">
          <Mail size={28} className="text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Inbox</h1>
        </div>
        <p className="text-gray-600">
          View investor details and the relevant property they are interested in.
        </p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">Total Inquiries</p>
            <p className="text-2xl font-bold text-gray-900">{totalMessages}</p>
          </div>
          <Mail size={24} className="text-blue-600 opacity-60" />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700 flex gap-3">
          <AlertCircle size={20} className="mt-0.5" />
          <div>
            <p className="font-semibold">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading inbox...</p>
        </div>
      ) : inboxItems.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <Mail size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600 font-medium">No inbox messages yet</p>
          <p className="text-sm text-gray-500 mt-1">
            Investor inquiries will appear here when they show interest in your ads.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {inboxItems.map((item) => (
            <article key={item.inquiryId} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <section className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">
                    Investor Details
                  </h2>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p className="flex items-center gap-2 font-semibold text-gray-900">
                      <User size={14} /> {item.investorFullName}
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail size={14} /> {item.investorEmail}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone size={14} /> {item.investorContactNumber}
                    </p>
                  </div>
                </section>

                <section className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-sm font-bold text-blue-900 uppercase tracking-wide">
                      Relevant Ad
                    </h2>
                    {item.status === "CONTACTED" && (
                      <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                        <CheckCircle size={12} /> Contacted
                      </span>
                    )}
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p className="flex items-center gap-2 font-semibold text-gray-900">
                      <FileText size={14} /> {item.landTitle}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Received: {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </section>
              </div>

              {item.customMessage && (
                <div className="mt-4 p-4 bg-white border border-gray-200 rounded-xl">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
                    Message from Investor
                  </p>
                  <p className="text-sm text-gray-700">{item.customMessage}</p>
                </div>
              )}

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleReply(item.inquiryId, "EMAIL", item.investorEmail)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Mail size={16} /> Contact via Email
                </button>

                <button
                  onClick={() => handleReply(item.inquiryId, "PHONE", item.investorContactNumber)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Phone size={16} /> Contact via Call
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}