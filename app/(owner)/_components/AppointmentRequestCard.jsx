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
} from "lucide-react";

export default function AppointmentRequestCard({
  appointment,
  onAccept,
  onReject,
  onReschedule,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [showRescheduleForm, setShowRescheduleForm] = useState(false);
  const [rescheduleData, setRescheduleData] = useState({
    newDateTime: "",
    reason: "",
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-orange-500 bg-orange-50 border-orange-200";
      case "accepted":
        return "text-green-500 bg-green-50 border-green-200";
      case "rejected":
        return "text-red-500 bg-red-50 border-red-200";
      case "rescheduled":
        return "text-blue-500 bg-blue-50 border-blue-200";
      default:
        return "text-gray-500 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "accepted":
        return <CheckCircle size={16} />;
      case "rejected":
        return <XCircle size={16} />;
      case "pending":
        return <AlertCircle size={16} />;
      default:
        return <AlertCircle size={16} />;
    }
  };

  const handleAccept = async () => {
    setIsLoading(true);
    try {
      await onAccept(appointment.id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    setIsLoading(true);
    try {
      await onReject(appointment.id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRescheduleSubmit = async () => {
    if (!rescheduleData.newDateTime) {
      alert("Please select a new date and time");
      return;
    }
    setIsLoading(true);
    try {
      await onReschedule(appointment.id, rescheduleData);
      setShowRescheduleForm(false);
      setRescheduleData({ newDateTime: "", reason: "" });
    } finally {
      setIsLoading(false);
    }
  };

  const appointmentDateTime = new Date(appointment.appointmentDateTime);
  const formattedDate = appointmentDateTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = appointmentDateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Header with Status */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Appointment Request
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            ID: {appointment.id?.slice(0, 8)}...
          </p>
        </div>
        <div
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(
            appointment.status
          )}`}
        >
          {getStatusIcon(appointment.status)}
          <span className="capitalize">{appointment.status}</span>
        </div>
      </div>

      {/* Investor Information */}
      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <div className="flex items-start space-x-4">
          {appointment.investorAvatar && (
            <Image
              src={appointment.investorAvatar}
              alt={appointment.investorName}
              width={48}
              height={48}
              className="rounded-full w-12 h-12 object-cover"
            />
          )}
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
              <User size={16} />
              <span>{appointment.investorName}</span>
            </h4>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              {appointment.investorEmail && (
                <p className="flex items-center space-x-2">
                  <Mail size={14} />
                  <span>{appointment.investorEmail}</span>
                </p>
              )}
              {appointment.investorPhone && (
                <p className="flex items-center space-x-2">
                  <Phone size={14} />
                  <span>{appointment.investorPhone}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Property and Appointment Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Property Information */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <h5 className="font-semibold text-gray-900 mb-3">Property</h5>
          <p className="font-medium text-gray-900">{appointment.propertyTitle}</p>
          {appointment.propertyLocation && (
            <p className="text-sm text-gray-600 flex items-center space-x-2 mt-2">
              <MapPin size={14} />
              <span>{appointment.propertyLocation}</span>
            </p>
          )}
        </div>

        {/* Appointment Details */}
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
          <h5 className="font-semibold text-gray-900 mb-3">Appointment</h5>
          <div className="space-y-2 text-sm">
            <p className="flex items-center space-x-2 text-gray-700">
              <Calendar size={14} />
              <span>{formattedDate}</span>
            </p>
            <p className="flex items-center space-x-2 text-gray-700">
              <Clock size={14} />
              <span>{formattedTime}</span>
            </p>
            {appointment.appointmentType && (
              <p className="text-gray-600 mt-2">
                <span className="font-medium">Type:</span>{" "}
                {appointment.appointmentType === "site_visit"
                  ? "Site Visit"
                  : "Discussion"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Appointment Notes */}
      {appointment.notes && (
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <h5 className="font-semibold text-gray-900 mb-2">Notes</h5>
          <p className="text-sm text-gray-600">{appointment.notes}</p>
        </div>
      )}

      {/* Reschedule Form */}
      {showRescheduleForm && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <h5 className="font-semibold text-gray-900 mb-3">Reschedule Appointment</h5>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Date & Time
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
                placeholder="Let the investor know why you're rescheduling..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
                rows="2"
              />
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons - Only show for pending appointments */}
      {appointment.status === "pending" && (
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleAccept}
            disabled={isLoading}
            className="flex-1 min-w-[120px] bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Accept"}
          </button>

          <button
            onClick={() => setShowRescheduleForm(!showRescheduleForm)}
            disabled={isLoading}
            className="flex-1 min-w-[120px] bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {showRescheduleForm ? "Cancel Reschedule" : "Reschedule"}
          </button>

          {showRescheduleForm && (
            <button
              onClick={handleRescheduleSubmit}
              disabled={isLoading}
              className="flex-1 min-w-[120px] bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              {isLoading ? "Processing..." : "Confirm"}
            </button>
          )}

          <button
            onClick={handleReject}
            disabled={isLoading}
            className="flex-1 min-w-[120px] bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Reject"}
          </button>
        </div>
      )}

      {/* Status message for non-pending appointments */}
      {appointment.status !== "pending" && (
        <div className="bg-gray-50 rounded-lg p-3 text-center text-sm text-gray-600">
          {appointment.status === "accepted" &&
            "You have accepted this appointment."}
          {appointment.status === "rejected" &&
            "You have rejected this appointment."}
          {appointment.status === "rescheduled" &&
            "This appointment has been rescheduled."}
        </div>
      )}
    </div>
  );
}
