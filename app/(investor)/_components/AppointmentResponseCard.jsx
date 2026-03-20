"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function AppointmentResponseCard({ appointment, onReschedule }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showRescheduleForm, setShowRescheduleForm] = useState(false);
  const [rescheduleData, setRescheduleData] = useState({
    newDateTime: "",
    reason: "",
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 border-yellow-200 text-yellow-700";
      case "accepted":
        return "bg-green-50 border-green-200 text-green-700";
      case "rejected":
        return "bg-red-50 border-red-200 text-red-700";
      case "rescheduled":
        return "bg-blue-50 border-blue-200 text-blue-700";
      default:
        return "bg-gray-50 border-gray-200 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "pending":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case "rescheduled":
        return <Calendar className="w-5 h-5 text-blue-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "accepted":
        return "Accepted";
      case "rejected":
        return "Rejected";
      case "pending":
        return "Pending Response";
      case "rescheduled":
        return "Rescheduled";
      default:
        return "Unknown";
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleRescheduleSubmit = async (e) => {
    e.preventDefault();

    if (!rescheduleData.newDateTime) {
      alert("Please select a new date and time");
      return;
    }

    setIsLoading(true);
    try {
      await onReschedule(appointment.id, rescheduleData);
      setShowRescheduleForm(false);
      setRescheduleData({ newDateTime: "", reason: "" });
    } catch (error) {
      console.error("Failed to reschedule appointment:", error);
      alert("Failed to reschedule appointment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`border rounded-lg p-4 ${getStatusColor(appointment.status)}`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {getStatusIcon(appointment.status)}
            <h3 className="font-bold text-lg">{appointment.propertyTitle}</h3>
          </div>
          <p className="text-sm flex items-center gap-1 opacity-75">
            <MapPin size={16} />
            {appointment.propertyLocation}
          </p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-white hover:bg-opacity-50 rounded transition-colors"
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {/* Status Badge and Date */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-current border-opacity-20">
        <span className="inline-block px-3 py-1 bg-white bg-opacity-50 rounded-full text-xs font-semibold">
          {getStatusText(appointment.status)}
        </span>
        <div className="flex items-center gap-1 text-sm font-medium">
          <Calendar size={16} />
          {formatDateTime(appointment.appointmentDateTime)}
        </div>
      </div>

      {/* Request Details - Expandable */}
      {isExpanded && (
        <div className="space-y-4 bg-white bg-opacity-50 p-3 rounded mt-3">
          {/* Owner Information */}
          <div>
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <User size={16} />
              Owner Information
            </h4>
            <div className="space-y-1 text-sm ml-6">
              <p className="font-medium">{appointment.ownerName}</p>
              <p className="flex items-center gap-2 opacity-75">
                <Mail size={14} />
                {appointment.ownerEmail}
              </p>
              {appointment.ownerPhone && (
                <p className="flex items-center gap-2 opacity-75">
                  <Phone size={14} />
                  {appointment.ownerPhone}
                </p>
              )}
            </div>
          </div>

          {/* Your Request Details */}
          <div>
            <h4 className="font-semibold text-sm mb-2">Your Request</h4>
            <div className="space-y-1 text-sm ml-0">
              <p>
                <span className="font-medium">Type:</span>{" "}
                {appointment.appointmentType === "site_visit"
                  ? "Site Visit"
                  : "Discussion"}
              </p>
              {appointment.notes && (
                <p>
                  <span className="font-medium">Your Notes:</span>{" "}
                  {appointment.notes}
                </p>
              )}
            </div>
          </div>

          {/* Owner Response */}
          {appointment.status !== "pending" && (
            <div>
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <MessageSquare size={16} />
                Owner&apos;s Response
              </h4>
              <div className="space-y-1 text-sm ml-0">
                {appointment.responseMessage && (
                  <p className="italic border-l-2 pl-2">
                    &quot;{appointment.responseMessage}&quot;
                  </p>
                )}
                {appointment.rejectionReason && (
                  <p>
                    <span className="font-medium">Reason:</span>{" "}
                    {appointment.rejectionReason}
                  </p>
                )}
                {appointment.rescheduledDateTime && (
                  <p>
                    <span className="font-medium">New Date/Time:</span>{" "}
                    {formatDateTime(appointment.rescheduledDateTime)}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          {appointment.status === "accepted" && (
            <div className="pt-3 border-t border-current border-opacity-20">
              <button
                onClick={() => setShowRescheduleForm(!showRescheduleForm)}
                className="px-4 py-2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded font-medium text-sm transition-all"
              >
                {showRescheduleForm ? "Cancel" : "Reschedule"}
              </button>
            </div>
          )}

          {/* Reschedule Form */}
          {showRescheduleForm && appointment.status === "accepted" && (
            <form
              onSubmit={handleRescheduleSubmit}
              className="pt-3 border-t border-current border-opacity-20 space-y-3 bg-white bg-opacity-40 p-3 rounded"
            >
              <div>
                <label className="block text-sm font-medium mb-1">
                  New Date and Time
                </label>
                <input
                  type="datetime-local"
                  value={rescheduleData.newDateTime}
                  onChange={(e) =>
                    setRescheduleData({
                      ...rescheduleData,
                      newDateTime: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded text-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Reason (Optional)
                </label>
                <textarea
                  value={rescheduleData.reason}
                  onChange={(e) =>
                    setRescheduleData({
                      ...rescheduleData,
                      reason: e.target.value,
                    })
                  }
                  placeholder="Explain why you need to reschedule..."
                  className="w-full px-3 py-2 border rounded text-gray-900 text-sm"
                  rows="3"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 disabled:opacity-50 transition-all"
              >
                {isLoading ? "Updating..." : "Confirm Reschedule"}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
