"use client";
import { useEffect, useState } from "react";
import AppointmentRequestCard from "../../_components/AppointmentRequestCard";
import { Mail, AlertCircle, Zap } from "lucide-react";

export default function InboxPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all, pending, accepted, rejected

  useEffect(() => {
    const fetchAppointments = async () => {
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
        setAppointments(data.data || data || []);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load appointments. Please try again later.",
        );
        // For demo purposes, show sample data if API fails
        setAppointments(getSampleAppointments());
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const getSampleAppointments = () => [
    {
      id: "apt-001",
      investorName: "John Smith",
      investorEmail: "john@example.com",
      investorPhone: "+1-555-0101",
      investorAvatar: null,
      propertyTitle: "Riverside Land Plot, 2.5 Acres",
      propertyLocation: "Downtown New York, NY",
      appointmentDateTime: new Date(
        Date.now() + 2 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      appointmentType: "site_visit",
      notes:
        "I am very interested in this property and would like to see it in person. Please let me know your availability.",
      status: "pending",
    },
    {
      id: "apt-002",
      investorName: "Sarah Johnson",
      investorEmail: "sarah@example.com",
      investorPhone: "+1-555-0102",
      investorAvatar: null,
      propertyTitle: "Mountain View Estate, 5 Acres",
      propertyLocation: "Boulder, CO",
      appointmentDateTime: new Date(
        Date.now() + 5 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      appointmentType: "discussion",
      notes: "Would like to discuss the development potential of this land.",
      status: "pending",
    },
    {
      id: "apt-003",
      investorName: "Michael Chen",
      investorEmail: "michael@example.com",
      investorPhone: "+1-555-0103",
      investorAvatar: null,
      propertyTitle: "lakeside Property, 3 Acres",
      propertyLocation: "Seattle, WA",
      appointmentDateTime: new Date(
        Date.now() - 3 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      appointmentType: "site_visit",
      notes: null,
      status: "accepted",
    },
  ];

  const handleAcceptAppointment = async (appointmentId) => {
    try {
      let token =
        typeof window !== "undefined"
          ? localStorage.getItem("token") || ""
          : "";
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/appointments/${appointmentId}/accept`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) throw new Error("Failed");

      setAppointments(
        appointments.map((apt) =>
          apt.id === appointmentId ? { ...apt, status: "accepted" } : apt,
        ),
      );
    } catch (err) {
      console.error("Failed to accept appointment:", err);
      setError("Failed to accept appointment. Please try again.");
    }
  };

  const handleRejectAppointment = async (appointmentId) => {
    try {
      let token =
        typeof window !== "undefined"
          ? localStorage.getItem("token") || ""
          : "";
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/appointments/${appointmentId}/reject`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) throw new Error("Failed");

      setAppointments(
        appointments.map((apt) =>
          apt.id === appointmentId ? { ...apt, status: "rejected" } : apt,
        ),
      );
    } catch (err) {
      console.error("Failed to reject appointment:", err);
      setError("Failed to reject appointment. Please try again.");
    }
  };

  const handleRescheduleAppointment = async (appointmentId, rescheduleData) => {
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
          body: JSON.stringify({
            newDateTime: rescheduleData.newDateTime,
            reason: rescheduleData.reason,
          }),
        },
      );
      if (!res.ok) throw new Error("Failed");

      setAppointments(
        appointments.map((apt) =>
          apt.id === appointmentId
            ? {
                ...apt,
                status: "rescheduled",
                appointmentDateTime: rescheduleData.newDateTime,
              }
            : apt,
        ),
      );
    } catch (err) {
      console.error("Failed to reschedule appointment:", err);
      setError("Failed to reschedule appointment. Please try again.");
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === "all") return true;
    return apt.status === filter;
  });

  const stats = {
    total: appointments.length,
    pending: appointments.filter((apt) => apt.status === "pending").length,
    accepted: appointments.filter((apt) => apt.status === "accepted").length,
    rejected: appointments.filter((apt) => apt.status === "rejected").length,
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
          Manage appointment requests from investors interested in your
          properties
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">
                Total Requests
              </p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Zap size={24} className="text-blue-600 opacity-50" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Pending</p>
              <p className="text-2xl font-bold text-orange-600">
                {stats.pending}
              </p>
            </div>
            <AlertCircle size={24} className="text-orange-600 opacity-50" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Accepted</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.accepted}
              </p>
            </div>
            <Zap size={24} className="text-green-600 opacity-50" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Rejected</p>
              <p className="text-2xl font-bold text-red-600">
                {stats.rejected}
              </p>
            </div>
            <AlertCircle size={24} className="text-red-600 opacity-50" />
          </div>
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

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { label: "All", value: "all" },
          { label: "Pending", value: "pending" },
          { label: "Accepted", value: "accepted" },
          { label: "Rejected", value: "rejected" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
              filter === tab.value
                ? "bg-[#0f0f11] text-[#9afb21]"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
          <p className="text-gray-600 mt-4">Loading appointments...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredAppointments.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Mail size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600 font-medium">
            {filter === "all"
              ? "No appointment requests yet"
              : `No ${filter} appointments`}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Investors will send requests when they&apos;e interested in your
            properties
          </p>
        </div>
      )}

      {/* Appointments List */}
      {!loading && filteredAppointments.length > 0 && (
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <AppointmentRequestCard
              key={appointment.id}
              appointment={appointment}
              onAccept={handleAcceptAppointment}
              onReject={handleRejectAppointment}
              onReschedule={handleRescheduleAppointment}
            />
          ))}
        </div>
      )}
    </div>
  );
}
