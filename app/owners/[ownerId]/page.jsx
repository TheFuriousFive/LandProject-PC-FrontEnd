"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  MapPin,
  Mail,
  Phone,
  BadgeCheck,
  Home,
  Building2,
  TrendingUp,
} from "lucide-react";
import ReviewSection from "@/_shared/ReviewSection";
import ContactInquiryCard from "@/_shared/ContactInquiryCard";

export default function PublicOwnerProfilePage() {
  const params = useParams();

  // Mock owner profile data. Replace with API call for real owner profile.
  const owner = {
    id: params.ownerId,
    name: "Rebekah O'Neil",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    verified: true,
    email: "rebekah.oneil@example.com",
    phone: "+94 71 234 5678",
    location: "Kandy, Sri Lanka",
    bio: "I help investors find high-potential land with verified legal documents and practical guidance from inquiry to closing. My focus is transparent communication, clear paperwork, and listings with strong long-term value.",
    mission:
      "Specializing in agricultural rezoning for 15 years, I work to make every transaction transparent, fast, and legally safe for buyers.",
    yearsExperience: 15,
    availableProperties: [
      {
        id: "land-001",
        title: "Green Valley Farmland",
        location: "Kandy, Sri Lanka",
        area: 12,
        price: "$420,000",
      },
      {
        id: "land-002",
        title: "Hillside Development Plot",
        location: "Matale, Sri Lanka",
        area: 8,
        price: "$315,000",
      },
    ],
    soldProperties: [
      {
        id: "land-003",
        title: "Lakefront Agriculture Parcel",
        location: "Nuwara Eliya, Sri Lanka",
        area: 15,
        soldPrice: "$500,000",
      },
      {
        id: "land-004",
        title: "Urban Edge Mixed-Use Land",
        location: "Colombo Suburbs",
        area: 5,
        soldPrice: "$610,000",
      },
    ],
    reviews: [
      {
        id: "owner-review-1",
        author: "Investor A",
        rating: 5,
        honestyRating: 5,
        speedRating: 5,
        date: "2025-11-10",
        comment:
          "Very professional and responsive. The documents were complete and the process was smooth.",
        aspects: ["Honesty: 5/5", "Speed: 5/5", "Clear documents", "Reliable"],
        ownerReply: {
          author: "Rebekah O'Neil",
          date: "2025-11-12",
          comment:
            "Thank you for your trust. I always aim for quick and transparent communication.",
        },
      },
      {
        id: "owner-review-2",
        author: "Investor B",
        rating: 4,
        honestyRating: 4,
        speedRating: 4,
        date: "2025-09-02",
        comment:
          "Good communication and transparent pricing. Would work with this seller again.",
        aspects: ["Honesty: 4/5", "Speed: 4/5", "Transparent pricing", "Helpful"],
        ownerReply: {
          author: "Rebekah O'Neil",
          date: "2025-09-03",
          comment:
            "Appreciate the feedback. I am glad the process felt transparent and efficient.",
        },
      },
    ],
  };

  const totalClosedDeals = owner.soldProperties.length;
  const totalPortfolioSize =
    owner.availableProperties.length + owner.soldProperties.length;

  const avgRating = owner.reviews.length
    ? owner.reviews.reduce((sum, review) => sum + review.rating, 0) /
      owner.reviews.length
    : 0;

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <img
                  src={owner.avatar}
                  alt={owner.name}
                  className="w-20 h-20 rounded-full object-cover border border-gray-200"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h1 className="text-2xl font-extrabold text-gray-900">{owner.name}</h1>
                    {owner.verified && (
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 border border-green-200 px-2.5 py-1 rounded-full text-xs font-bold uppercase">
                        <BadgeCheck size={14} /> Verified Seller
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                    <p className="flex items-center gap-2">
                      <Mail size={16} className="text-gray-500" /> {owner.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone size={16} className="text-gray-500" /> {owner.phone}
                    </p>
                    <p className="flex items-center gap-2 sm:col-span-2">
                      <MapPin size={16} className="text-gray-500" /> {owner.location}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={18} className="text-gray-700" />
                <h2 className="text-lg font-bold text-gray-900">Portfolio Summary</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">
                    Total Listings Managed
                  </p>
                  <p className="text-2xl font-extrabold text-gray-900">{totalPortfolioSize}</p>
                </div>
                <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-green-700 mb-1">
                    Successfully Sold
                  </p>
                  <p className="text-2xl font-extrabold text-green-800">{totalClosedDeals}</p>
                </div>
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-1">
                    Currently Available
                  </p>
                  <p className="text-2xl font-extrabold text-blue-800">
                    {owner.availableProperties.length}
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Bio & Mission</h2>
              <p className="text-gray-700 leading-relaxed mb-3">{owner.bio}</p>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">
                  Mission Statement
                </p>
                <p className="text-gray-800 font-medium">{owner.mission}</p>
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Home size={18} className="text-gray-700" />
                <h2 className="text-lg font-bold text-gray-900">Available Properties</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {owner.availableProperties.map((property) => (
                  <Link
                    key={property.id}
                    href={`/property/${property.id}`}
                    className="block rounded-xl border border-gray-200 p-4 hover:shadow-sm transition-shadow"
                  >
                    <p className="font-bold text-gray-900 mb-1">{property.title}</p>
                    <p className="text-sm text-gray-600 mb-2">{property.location}</p>
                    <p className="text-sm text-gray-700">{property.area} Acres</p>
                    <p className="font-bold text-gray-900 mt-2">{property.price}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Building2 size={18} className="text-gray-700" />
                <h2 className="text-lg font-bold text-gray-900">Sold Properties</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {owner.soldProperties.map((property) => (
                  <div
                    key={property.id}
                    className="rounded-xl border border-gray-200 p-4 bg-gray-50"
                  >
                    <p className="font-bold text-gray-900 mb-1">{property.title}</p>
                    <p className="text-sm text-gray-600 mb-2">{property.location}</p>
                    <p className="text-sm text-gray-700">{property.area} Acres</p>
                    <p className="font-bold text-gray-900 mt-2">Sold: {property.soldPrice}</p>
                  </div>
                ))}
              </div>
            </section>

            <ReviewSection
              reviews={owner.reviews}
              avgRating={avgRating}
              totalReviews={owner.reviews.length}
            />
          </div>

          <div className="space-y-6">
            <ContactInquiryCard ownerName={owner.name} />
          </div>
        </div>
      </div>
    </main>
  );
}
