"use client";
import { useEffect, useState } from "react";
import { Mail, AlertCircle, User, Phone, MapPin, FileText } from "lucide-react";

export default function InboxPage() {
  const [inboxItems, setInboxItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contactConfirmations, setContactConfirmations] = useState({});

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        setLoading(true);
        setError(null);
        let token = "";
        if (typeof window !== "undefined") {
          token = localStorage.getItem("token") || "";
        }
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/appointments/owner/inbox`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        const rawItems = data.data || data || [];
        const normalized = rawItems.map((item) => ({
          id: item.id,
          investorName: item.investorName || item.investor_name || "Unknown Investor",
          investorEmail: item.investorEmail || item.investor_email || "N/A",
          investorPhone: item.investorPhone || item.investor_phone || "N/A",
          adTitle:
            item.propertyTitle || item.adTitle || item.listingTitle || "Untitled Ad",
          adLocation:
            item.propertyLocation || item.adLocation || item.listingLocation || "N/A",
          adPrice: item.price || item.adPrice || item.listingPrice || null,
          message: item.notes || item.message || "",
        }));
        setInboxItems(normalized);
      } catch (err) {
        console.error("Failed to fetch inbox:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load inbox. Please try again later.",
        );
        // Fallback data for local demo mode.
        setInboxItems(getSampleInboxItems());
      } finally {
        setLoading(false);
      }
    };

    fetchInbox();
  }, []);

  const getSampleInboxItems = () => [
    {
      id: "msg-001",
      investorName: "John Smith",
      investorEmail: "john@example.com",
      investorPhone: "+1-555-0101",
      adTitle: "Riverside Land Plot, 2.5 Acres",
      adLocation: "Downtown New York, NY",
      adPrice: 125000,
      message: "Interested in this ad. Please share ownership and survey details.",
    },
    {
      id: "msg-002",
      investorName: "Sarah Johnson",
      investorEmail: "sarah@example.com",
      investorPhone: "+1-555-0102",
      adTitle: "Mountain View Estate, 5 Acres",
      adLocation: "Boulder, CO",
      adPrice: 295000,
      message: "Can you confirm zoning status and nearest road access?",
    },
    {
      id: "msg-003",
      investorName: "Michael Chen",
      investorEmail: "michael@example.com",
      investorPhone: "+1-555-0103",
      adTitle: "Lakeside Property, 3 Acres",
      adLocation: "Seattle, WA",
      adPrice: 210000,
      message: "I want to know if the title deed is available for review.",
    },
  ];

  const totalMessages = inboxItems.length;

  const formatPrice = (price) => {
    if (typeof price === "number") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
    }
    return price || "Price not provided";
  };

  const markContactConfirmation = (messageId, method) => {
    setContactConfirmations((prev) => ({
      ...prev,
      [messageId]: {
        method,
        timestamp: new Date().toLocaleString(),
      },
    }));
  };

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-3">
          <Mail size={28} className="text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Inbox</h1>
        </div>
        <p className="text-gray-600">
          View investor details and the relevant ad they are interested in.
        </p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">Total Messages</p>
            <p className="text-2xl font-bold text-gray-900">{totalMessages}</p>
          </div>
          <Mail size={24} className="text-blue-600 opacity-60" />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700">
          <div className="flex items-center space-x-3">
            <AlertCircle size={20} />
            <div>
              <p className="font-semibold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
          <p className="text-gray-600 mt-4">Loading inbox...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && inboxItems.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Mail size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600 font-medium">No inbox messages yet</p>
          <p className="text-sm text-gray-500 mt-1">
            Investor messages will appear here when they show interest in your ads.
          </p>
        </div>
      )}

      {/* Inbox List */}
      {!loading && inboxItems.length > 0 && (
        <div className="space-y-4">
          {inboxItems.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <section className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">
                    Investor Details
                  </h2>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p className="flex items-center gap-2 font-semibold text-gray-900">
                      <User size={14} /> {item.investorName}
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail size={14} /> {item.investorEmail}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone size={14} /> {item.investorPhone}
                    </p>
                  </div>
                </section>

                <section className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <h2 className="text-sm font-bold text-blue-900 uppercase tracking-wide mb-3">
                    Relevant Ad
                  </h2>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p className="flex items-center gap-2 font-semibold text-gray-900">
                      <FileText size={14} /> {item.adTitle}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin size={14} />
                      {typeof item.adLocation === "object" && item.adLocation !== null
                        ? `${item.adLocation.city || ""}, ${item.adLocation.state || ""}`
                        : item.adLocation}
                    </p>
                    <p className="font-semibold text-gray-900">
                      {formatPrice(item.adPrice)}
                    </p>
                  </div>
                </section>
              </div>

              {item.message && (
                <div className="mt-4 p-4 bg-white border border-gray-200 rounded-xl">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
                    Message
                  </p>
                  <p className="text-sm text-gray-700">{item.message}</p>
                </div>
              )}

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href={
                    item.investorEmail && item.investorEmail !== "N/A"
                      ? `mailto:${item.investorEmail}?subject=${encodeURIComponent("Regarding your land inquiry")}`
                      : "#"
                  }
                  onClick={(e) => {
                    if (!item.investorEmail || item.investorEmail === "N/A") {
                      e.preventDefault();
                      return;
                    }
                    markContactConfirmation(item.id, "email");
                  }}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    item.investorEmail && item.investorEmail !== "N/A"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <Mail size={16} />
                  Contact via Email
                </a>

                <a
                  href={
                    item.investorPhone && item.investorPhone !== "N/A"
                      ? `tel:${item.investorPhone}`
                      : "#"
                  }
                  onClick={(e) => {
                    if (!item.investorPhone || item.investorPhone === "N/A") {
                      e.preventDefault();
                      return;
                    }
                    markContactConfirmation(item.id, "phone");
                  }}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    item.investorPhone && item.investorPhone !== "N/A"
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <Phone size={16} />
                  Contact via Call
                </a>
              </div>

              {contactConfirmations[item.id] && (
                <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-3">
                  <p className="text-sm font-medium text-green-800">
                    Confirmation sent via {contactConfirmations[item.id].method === "email" ? "Email" : "Phone Call"}.
                  </p>
                  <p className="text-xs text-green-700 mt-1">
                    Updated: {contactConfirmations[item.id].timestamp}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
