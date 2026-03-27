"use client";

import { useState } from "react";

export default function ContactInquiryCard({ ownerName = "Owner" }) {
  const firstName = ownerName.split(" ")[0] || ownerName;

  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert(`Inquiry sent to ${ownerName}.`);
    setContactForm({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-gray-100">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xl font-extrabold text-gray-900">Meet {ownerName}</h3>
          <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 border border-green-200 px-3 py-1 text-xs font-bold uppercase tracking-wide">
            Verified Seller
          </span>
        </div>
      </div>

      <div className="px-6 pt-4">
        <div className="flex border-b border-gray-200">
          <button
            type="button"
            className="px-4 py-3 text-sm font-bold text-slate-900 border-b-2 border-slate-900"
          >
            Contact {ownerName}
          </button>
        </div>
      </div>

      <form onSubmit={handleContactSubmit} className="px-6 py-5 space-y-4">
        <div>
          <label
            htmlFor={`contact-name-${firstName}`}
            className="block text-sm font-semibold text-gray-700 mb-1.5"
          >
            Name
          </label>
          <input
            id={`contact-name-${firstName}`}
            type="text"
            value={contactForm.name}
            onChange={(e) =>
              setContactForm((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Enter your full name"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400"
          />
        </div>

        <div>
          <label
            htmlFor={`contact-phone-${firstName}`}
            className="block text-sm font-semibold text-gray-700 mb-1.5"
          >
            Phone
          </label>
          <input
            id={`contact-phone-${firstName}`}
            type="tel"
            value={contactForm.phone}
            onChange={(e) =>
              setContactForm((prev) => ({ ...prev, phone: e.target.value }))
            }
            placeholder="Enter your phone number"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400"
          />
        </div>

        <div>
          <label
            htmlFor={`contact-email-${firstName}`}
            className="block text-sm font-semibold text-gray-700 mb-1.5"
          >
            Email
          </label>
          <input
            id={`contact-email-${firstName}`}
            type="email"
            value={contactForm.email}
            onChange={(e) =>
              setContactForm((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="Enter your email address"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400"
          />
        </div>

        <div>
          <label
            htmlFor={`contact-message-${firstName}`}
            className="block text-sm font-semibold text-gray-700 mb-1.5"
          >
            Message (Optional)
          </label>
          <textarea
            id={`contact-message-${firstName}`}
            value={contactForm.message}
            onChange={(e) =>
              setContactForm((prev) => ({ ...prev, message: e.target.value }))
            }
            placeholder="Write any specific questions or requests"
            rows={5}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 transition-colors"
        >
          Contact {firstName}
        </button>
      </form>
    </section>
  );
}
