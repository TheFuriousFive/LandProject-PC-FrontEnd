"use client";

import { useParams, useRouter } from "next/navigation";
import { MessageSquare, ArrowLeft, CheckCircle, Home } from "lucide-react";
import { useState, useEffect } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function InquirePropertyPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params.propertyId;

  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch basic property details just to show the title/owner on this page
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/listings/details/${propertyId}`);
        if (response.ok) {
          const data = await response.json();
          setProperty(data);
        }
      } catch (error) {
        console.error("Failed to fetch property:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [propertyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token")?.replace(/^"|"$/g, "") : "";
      
      if (!token) {
        alert("You must be logged in as an Investor to send an inquiry.");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(`${API_BASE}/landapp/investors/listings/${propertyId}/inquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: message }), // Matches your InquiryRequest record!
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || "Failed to send inquiry");
      }

      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert(error.message.includes("already sent") 
        ? "You have already sent an inquiry for this property!" 
        : "Failed to send inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!property) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 text-center py-20">
          <p className="text-gray-500 text-lg">Property not found.</p>
          <button onClick={() => router.back()} className="mt-4 text-blue-600 font-bold">Go Back</button>
        </div>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
            <div className="mb-4">
              <CheckCircle className="w-16 h-16 mx-auto text-[#9afb21] mb-4" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
              Inquiry Sent Successfully!
            </h1>
            <p className="text-gray-600 mb-6 text-lg">
              Your message has been delivered to <strong>{property.ownerName || "the owner"}</strong>. 
              They will review your request and contact you shortly.
            </p>

            <div className="flex gap-3 justify-center mt-8">
              <button
                onClick={() => router.push(`/property/${propertyId}`)}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back to Property
              </button>
              <button
                onClick={() => router.push("/investor/responses")}
                className="px-6 py-3 bg-[#0f0f11] text-[#9afb21] font-bold rounded-lg hover:bg-black transition-colors"
              >
                Track My Inquiries
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
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-semibold"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Inquire About Property
          </h1>
          <p className="text-gray-600 mb-8">
            Send a direct message to the owner to express your interest or ask for more details.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 flex items-center gap-4">
            <Home className="text-blue-500 w-10 h-10" />
            <div>
              <p className="text-gray-900 font-bold text-lg">{property.title}</p>
              <p className="text-sm text-gray-600">Owned by {property.ownerName || "Property Owner"}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                <MessageSquare size={18} className="inline mr-2" />
                Your Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="E.g., I am very interested in this plot. Are the soil reports available for review?"
                rows="5"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors"
              />
            </div>

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
                disabled={isSubmitting || !message.trim()}
                className="flex-1 px-6 py-3 bg-[#9afb21] text-black font-bold rounded-lg hover:bg-[#8aec1b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Inquiry"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}