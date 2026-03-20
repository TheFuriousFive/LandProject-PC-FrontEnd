"use client";

import { useParams, useRouter } from "next/navigation";
import BackButton from "@/_components/BackButton";
import { Calendar, Clock, MessageSquare, ArrowLeft, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function ScheduleAppointmentPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params.propertyId;

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // TODO: Fetch property data from API
  const [property, setProperty] = useState(null);

  useEffect(() => {
    // Replace with actual API call
    // const fetchProperty = async () => {
    //   try {
    //     const response = await fetch(`/api/properties/${propertyId}`);
    //     const data = await response.json();
    //     setProperty(data);
    //   } catch (error) {
    //     console.error('Failed to fetch property:', error);
    //   }
    // };
    // fetchProperty();
  }, [propertyId]);

  if (!property) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 text-center py-20">
          <p className="text-gray-500 text-lg">Property not found.</p>
        </div>
      </main>
    );
  }

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Generate next 30 days for available dates
  const getAvailableDates = () => {
    const dates = [];
    for (let i = 1; i <= 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split("T")[0];
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      const dayDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      dates.push({ value: dateStr, label: `${dayName}, ${dayDate}` });
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.date || !formData.time) {
      alert("Please select both date and time");
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      // Save to localStorage
      const appointments = JSON.parse(
        localStorage.getItem("appointments") || "[]"
      );
      const newAppointment = {
        id: "apt_" + Date.now(),
        propertyId,
        propertyTitle: property.title,
        ownerName: property.owner.name,
        date: formData.date,
        time: formData.time,
        message: formData.message,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      appointments.push(newAppointment);
      localStorage.setItem("appointments", JSON.stringify(appointments));

      // Add to owner's appointment requests
      const ownerAppointments = JSON.parse(
        localStorage.getItem("owner_appointments") || "[]"
      );
      ownerAppointments.push(newAppointment);
      localStorage.setItem("owner_appointments", JSON.stringify(ownerAppointments));

      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
            <div className="mb-4">
              <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
              Appointment Scheduled!
            </h1>
            <p className="text-gray-600 mb-6 text-lg">
              Your appointment request has been sent to the property owner.
            </p>

            <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Property</p>
                  <p className="text-gray-900 font-bold">{property.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Owner</p>
                  <p className="text-gray-900 font-bold">{property.owner.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Date</p>
                  <p className="text-gray-900 font-bold">
                    {new Date(formData.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Time</p>
                  <p className="text-gray-900 font-bold">{formData.time}</p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              The owner will review your request and contact you shortly at your registered phone number or email.
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => router.push(`/property/${propertyId}`)}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back to Property
              </button>
              <button
                onClick={() => router.push("/")}
                className="px-6 py-3 bg-[#9afb21] text-black font-bold rounded-lg hover:bg-[#8aec1b] transition-colors"
              >
                Browse More Properties
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-semibold"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Schedule an Appointment
          </h1>
          <p className="text-gray-600 mb-8">
            Meet with the property owner to discuss your interest in this land
          </p>

          {/* Property & Owner Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold text-gray-600 mb-1 uppercase">
                  Property
                </p>
                <p className="text-gray-900 font-bold text-lg">
                  {property.title}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-600 mb-1 uppercase">
                  Owner
                </p>
                <p className="text-gray-900 font-bold text-lg">
                  {property.owner.name}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-600 mb-1 uppercase">
                  Email
                </p>
                <p className="text-gray-900 font-semibold">
                  {property.owner.email}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-600 mb-1 uppercase">
                  Phone
                </p>
                <p className="text-gray-900 font-semibold">
                  {property.owner.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Appointment Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date Selection */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                <Calendar size={18} className="inline mr-2" />
                Select Date
              </label>
              <select
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors"
              >
                <option value="">Choose a date...</option>
                {availableDates.map((date) => (
                  <option key={date.value} value={date.value}>
                    {date.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                <Clock size={18} className="inline mr-2" />
                Select Time
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                <MessageSquare size={18} className="inline mr-2" />
                Additional Message (Optional)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell the owner about your interest, questions, or special requirements..."
                rows="4"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-[#9afb21] text-black font-bold rounded-lg hover:bg-[#8aec1b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Scheduling..." : "Request Appointment"}
              </button>
            </div>
          </form>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <p className="text-sm text-gray-700 mb-3 font-semibold">
            📋 What happens next?
          </p>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>✓ Your request will be sent to the property owner</li>
            <li>✓ The owner will review and confirm your appointment</li>
            <li>✓ You'll receive a confirmation via email/phone</li>
            <li>✓ Meeting location and details will be provided</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
