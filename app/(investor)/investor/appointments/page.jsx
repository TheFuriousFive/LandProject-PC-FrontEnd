"use client";
import { useEffect, useState } from "react";
import { Mail, AlertCircle, Zap, Clock, CheckCircle } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function InquiryResponsesPage() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // "all", "PENDING", "CONTACTED"

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = typeof window !== "undefined" ? localStorage.getItem("token")?.replace(/^"|"$/g, "") : "";

        const res = await fetch(`${API_BASE}/landapp/investors/inquiries`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch inquiries");

        const data = await res.json();
        setResponses(data); // Expecting List<InvestorInquiryResponseDTO>
      } catch (err) {
        console.error("Failed to fetch responses:", err);
        setError("Failed to load your inquiries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  const filteredResponses = responses.filter((resp) => {
    if (filter === "all") return true;
    return resp.status === filter;
  });

  const stats = {
    total: responses.length,
    pending: responses.filter((r) => r.status === "PENDING").length,
    contacted: responses.filter((r) => r.status === "CONTACTED").length,
  };

  return (
    <div className="flex h-screen bg-gray-50 flex-col md:flex-row absolute inset-0 md:static">
      {/* Left Sidebar Filters */}
      <div className="w-full md:w-72 lg:w-80 bg-white border-r border-gray-200 flex flex-col h-full shrink-0">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-6">
            Inquiry Responses
          </h1>

          <div className="space-y-3">
            <button
              onClick={() => setFilter("all")}
              className={`w-full p-4 rounded-lg text-left transition-all ${
                filter === "all"
                  ? "bg-[#9afb21] text-gray-900 shadow-md"
                  : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Total Requests</span>
                <span className="text-2xl font-bold">{stats.total}</span>
              </div>
            </button>

            <button
              onClick={() => setFilter("PENDING")}
              className={`w-full p-4 rounded-lg text-left transition-all ${
                filter === "PENDING"
                  ? "bg-yellow-100 border-2 border-yellow-400 text-yellow-900"
                  : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-yellow-600" />
                  <span className="text-sm font-semibold">Pending</span>
                </div>
                <span className="text-lg font-bold">{stats.pending}</span>
              </div>
            </button>

            <button
              onClick={() => setFilter("CONTACTED")}
              className={`w-full p-4 rounded-lg text-left transition-all ${
                filter === "CONTACTED"
                  ? "bg-green-100 border-2 border-green-400 text-green-900"
                  : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-600" />
                  <span className="text-sm font-semibold">Contacted</span>
                </div>
                <span className="text-lg font-bold">{stats.contacted}</span>
              </div>
            </button>
          </div>
        </div>

        <div className="p-6 bg-blue-50 border-t border-blue-100 text-sm">
          <div className="flex gap-2 mb-2">
            <Zap size={16} className="text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900 mb-1">Pro Tips</p>
              <ul className="text-blue-800 space-y-1 text-xs">
                <li>• Keep an eye out for emails/calls from owners</li>
                <li>• Contact the owner directly if wait time is too long</li>
                <li>• Use the provided contact details in the message</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full bg-gray-50 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-white">
          <h2 className="text-xl font-bold text-gray-900">
            {filter === "all" ? "All Inquiries" : `${filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase()} Inquiries`}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Track the status of properties you have inquired about.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9afb21] mx-auto mb-4"></div>
                <p className="text-gray-600">Loading responses...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900">Error Loading Responses</p>
                <p className="text-red-800 text-sm mt-1">{error}</p>
              </div>
            </div>
          ) : filteredResponses.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12 px-4 border-2 border-dashed border-gray-200 rounded-2xl bg-white">
              <Mail className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No {filter !== "all" ? filter.toLowerCase() : ""} inquiries yet
              </h3>
              <p className="text-gray-600 text-center max-w-sm">
                Your inquiries will appear here once you contact property owners.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredResponses.map((response) => (
                <div key={response.inquiryId} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                  <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{response.landTitle}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Owner: <span className="font-medium text-gray-700">{response.ownerFullName}</span>
                      </p>
                    </div>
                    {response.status === "PENDING" ? (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                        <Clock size={14} /> Pending
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                        <CheckCircle size={14} /> Contacted
                      </span>
                    )}
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <p className="text-sm font-semibold text-blue-900 mb-1 flex items-center gap-2">
                      <Zap size={16} /> Platform Update
                    </p>
                    <p className="text-sm text-blue-800 leading-relaxed">
                      {response.platformUpdateMessage}
                    </p>
                  </div>
                  
                  <div className="mt-4 text-xs text-gray-400 text-right">
                    Inquired on: {new Date(response.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


