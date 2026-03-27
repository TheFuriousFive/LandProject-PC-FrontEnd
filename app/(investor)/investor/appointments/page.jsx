"use client";
import { useEffect, useState } from "react";
import AppointmentResponseCard from "../../_components/AppointmentResponseCard";
import {
  Mail,
  AlertCircle,
  Zap,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

export default function AppointmentResponsesPage() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all, pending, accepted, rejected

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        setLoading(true);
        setError(null);
        let token = "";
        if (typeof window !== "undefined") {
          token = localStorage.getItem("token") || "";
        }

        const apiBase =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
        const res = await fetch(`${apiBase}/appointments/investor/responses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const response = await res.json();
        const rawResponses = response.data || response || [];
        const normalized = rawResponses.map((item) => ({
          ...item,
          ownerName: item.ownerName || item.owner_name || "Property Owner",
          ownerEmail: item.ownerEmail || item.owner_email || "N/A",
          ownerPhone: item.ownerPhone || item.owner_phone || "N/A",
          ownerContactMethod:
            item.ownerContactMethod ||
            item.contactMethod ||
            item.contactedVia ||
            null,
          ownerContactedAt:
            item.ownerContactedAt || item.contactConfirmedAt || item.contactedAt || null,
          investorReadConfirmedAt:
            item.investorReadConfirmedAt || item.readConfirmedAt || null,
        }));
        setResponses(normalized);
      } catch (err) {
        console.error("Failed to fetch appointment responses:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load appointment responses. Please try again later.",
        );
        // For demo purposes, show sample data if API fails
        setResponses(getSampleResponses());
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  const getSampleResponses = () => [
    {
      id: "apt-req-001",
      propertyTitle: "Riverside Land Plot, 2.5 Acres",
      propertyLocation: "Downtown New York, NY",
      appointmentDateTime: new Date(
        Date.now() + 5 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      appointmentType: "site_visit",
      notes:
        "Very interested in this property. Would like to schedule a site visit at your earliest convenience.",
      status: "accepted",
      ownerName: "John Smith",
      ownerEmail: "john.smith@example.com",
      ownerPhone: "+1-555-0101",
      ownerContactMethod: "email",
      ownerContactedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      responseMessage:
        "Great! I can accommodate your visit on the proposed date.",
      requestDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "apt-req-002",
      propertyTitle: "Mountain View Estate, 5 Acres",
      propertyLocation: "Boulder, CO",
      appointmentDateTime: new Date(
        Date.now() + 10 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      appointmentType: "discussion",
      notes:
        "Interested in discussing development potential and zoning regulations.",
      status: "pending",
      ownerName: "Sarah Johnson",
      ownerEmail: "sarah.johnson@example.com",
      ownerPhone: "+1-555-0102",
      requestDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "apt-req-003",
      propertyTitle: "Lakeside Property, 3 Acres",
      propertyLocation: "Seattle, WA",
      appointmentDateTime: new Date(
        Date.now() - 5 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      appointmentType: "site_visit",
      notes: "Love the waterfront aspect. Would like to visit.",
      status: "rejected",
      ownerName: "Michael Chen",
      ownerEmail: "michael.chen@example.com",
      ownerPhone: "+1-555-0103",
      rejectionReason: "Property is already under contract with another buyer.",
      responseMessage: "Unfortunately, this property is no longer available.",
      requestDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "apt-req-004",
      propertyTitle: "Farm Land with Barn, 10 Acres",
      propertyLocation: "Madison, WI",
      appointmentDateTime: new Date(
        Date.now() + 3 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      appointmentType: "discussion",
      notes: "Curious about irrigation systems and soil quality documentation.",
      status: "rescheduled",
      ownerName: "Emily Rodriguez",
      ownerEmail: "emily.rodriguez@example.com",
      ownerPhone: "+1-555-0104",
      ownerContactMethod: "phone",
      ownerContactedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      responseMessage: "I can reschedule to a time that works better for me.",
      rescheduledDateTime: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      requestDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const filteredResponses = responses.filter((resp) => {
    if (filter === "all") return true;
    return resp.status === filter;
  });

  const stats = {
    total: responses.length,
    pending: responses.filter((r) => r.status === "pending").length,
    accepted: responses.filter((r) => r.status === "accepted").length,
    rejected: responses.filter((r) => r.status === "rejected").length,
  };

  const handleReschedule = async (appointmentId, rescheduleData) => {
    try {
      let token =
        typeof window !== "undefined"
          ? localStorage.getItem("token") || ""
          : "";
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/appointments/${appointmentId}/reschedule`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ rescheduleData }),
        },
      );
      if (!res.ok) throw new Error("Failed");
      setResponses(
        responses.map((resp) =>
          resp.id === appointmentId
            ? {
                ...resp,
                status: "rescheduled",
                rescheduledDateTime: rescheduleData.newDateTime,
                responseMessage:
                  rescheduleData.reason || "Reschedule requested",
              }
            : resp,
        ),
      );
    } catch (err) {
      console.error("Failed to reschedule appointment:", err);
      throw err;
    }
  };

  const handleAcknowledgeRead = async (appointmentId) => {
    const acknowledgedAt = new Date().toISOString();
    try {
      const apiBase =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
      let token = "";
      if (typeof window !== "undefined") {
        token = localStorage.getItem("token") || "";
      }

      await fetch(`${apiBase}/appointments/${appointmentId}/read-confirmation`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ acknowledgedAt }),
      });
    } catch (err) {
      console.warn("Could not sync read confirmation, keeping local state", err);
    } finally {
      setResponses((prev) =>
        prev.map((resp) =>
          resp.id === appointmentId
            ? { ...resp, investorReadConfirmedAt: acknowledgedAt }
            : resp,
        ),
      );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 flex-col md:flex-row absolute inset-0 md:static">
      {/* Sidebar / Filter Section */}
      <div className="w-full md:w-72 lg:w-80 bg-white border-r border-gray-200 flex flex-col h-full shrink-0">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-6">
            Appointment Responses
          </h1>

          {/* Statistics Cards */}
          <div className="space-y-3">
            {/* Total */}
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

            {/* Pending */}
            <button
              onClick={() => setFilter("pending")}
              className={`w-full p-4 rounded-lg text-left transition-all ${
                filter === "pending"
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

            {/* Accepted */}
            <button
              onClick={() => setFilter("accepted")}
              className={`w-full p-4 rounded-lg text-left transition-all ${
                filter === "accepted"
                  ? "bg-green-100 border-2 border-green-400 text-green-900"
                  : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-600" />
                  <span className="text-sm font-semibold">Accepted</span>
                </div>
                <span className="text-lg font-bold">{stats.accepted}</span>
              </div>
            </button>

            {/* Rejected */}
            <button
              onClick={() => setFilter("rejected")}
              className={`w-full p-4 rounded-lg text-left transition-all ${
                filter === "rejected"
                  ? "bg-red-100 border-2 border-red-400 text-red-900"
                  : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <XCircle size={18} className="text-red-600" />
                  <span className="text-sm font-semibold">Rejected</span>
                </div>
                <span className="text-lg font-bold">{stats.rejected}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Tips Section */}
        <div className="p-6 bg-blue-50 border-t border-blue-100 text-sm">
          <div className="flex gap-2 mb-2">
            <Zap size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900 mb-1">Pro Tips</p>
              <ul className="text-blue-800 space-y-1 text-xs">
                <li>• Check responses regularly</li>
                <li>• Respond quickly to offers</li>
                <li>• Request reschedules if needed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full bg-gray-50 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-white">
          <h2 className="text-xl font-bold text-gray-900">
            {filter === "all"
              ? "All Appointment Requests"
              : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Requests`}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Track and manage your appointment requests with property owners
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Zap className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">Loading responses...</p>
              </div>
            </div>
          ) : error ? (
            <div className="p-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-900">
                    Error Loading Responses
                  </p>
                  <p className="text-red-800 text-sm mt-1">{error}</p>
                </div>
              </div>
            </div>
          ) : filteredResponses.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12 px-4">
              <Mail className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No {filter !== "all" ? filter : ""} responses yet
              </h3>
              <p className="text-gray-600 text-center max-w-sm">
                Your appointment requests will appear here once property owners
                respond. Keep a close eye on this section for updates!
              </p>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {filteredResponses.map((response) => (
                <AppointmentResponseCard
                  key={response.id}
                  appointment={response}
                  onReschedule={handleReschedule}
                  onAcknowledgeRead={handleAcknowledgeRead}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
