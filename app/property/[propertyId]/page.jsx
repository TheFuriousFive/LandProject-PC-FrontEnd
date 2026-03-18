"use client";

import { useParams } from "next/navigation";
import {
  MapPin,
  Ruler,
  DollarSign,
  User,
  Phone,
  Mail,
  Share2,
  Heart,
} from "lucide-react";
import LocationMap from "@/_modules/geospatial/LocationMap";
import HazardOverlay from "@/_modules/hazardData/HazardOverlay";
import TrustScoreDisplay from "@/_modules/trustScore/TrustScoreDisplay";
import ReviewSection from "@/_shared/ReviewSection";
import GeoUtils from "@/_modules/geospatial/mapUtils";
import PropertyPageHeader from "@/_modules/property/PropertyPageHeader";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/hooks";

export default function PropertyDetailsPage() {
  const params = useParams();
  const { user } = useAuth();
  console.log(user, "userrrrrrrrrrrrrrrrr");
  // Mock property data - replace with API call
  const property = {
    id: params.propertyId || "1",
    title: "Premium Agricultural Land in Kandy District",
    location: "Kandy, Sri Lanka",
    latitude: 7.2906,
    longitude: 80.6337,
    area: 50,
    price: 1200000,
    currency: "USD",
    landType: "Agricultural",
    surveyNumber: "SL-2024-12345",
    status: "approved",
    description:
      "Spacious agricultural land ideal for crop cultivation with excellent soil quality and water access. Located near Kandy with good connectivity to markets.",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800",
      "https://images.unsplash.com/photo-1574082168995-b2b5e1cbf59f?q=80&w=800",
    ],

    // Owner info
    owner: {
      id: "owner-123",
      name: "Mr. J. P. Jayasekara",
      joinDate: "2023-01-15",
      verified: true,
      phone: "+94 71 234 5678",
      email: "jayasekara@email.com",
      previousListings: 3,
      idVerified: true,
      contactVerified: true,
      kycCompleted: true,
      accountAgeMonths: 24,
    },

    // Documents
    documents: [
      { type: "deed", name: "Land Deed.pdf", uploadedAt: "2024-02-01" },
      { type: "surveyMap", name: "Survey Map.pdf", uploadedAt: "2024-02-02" },
      {
        type: "taxCertificate",
        name: "Tax Certificate.pdf",
        uploadedAt: "2024-02-03",
      },
      {
        type: "pollutionClearance",
        name: "Pollution Clearance.pdf",
        uploadedAt: "2024-02-04",
      },
      {
        type: "boundaryMarked",
        name: "Boundary Survey.pdf",
        uploadedAt: "2024-02-05",
      },
    ],

    // Connectivity & Accessibility
    connectivity: {
      nearbySchools: 3,
      nearbyHospitals: 2,
      publicTransportDistance: 2.5,
      roadQuality: "good",
      nearbyMarkets: 4,
      waterAccess: true,
      electricityAccess: true,
    },

    // Hazard Data
    hazards: {
      floodingHistory: "low",
      seismicZone: "low",
      soilQuality: "excellent",
      pollutionLevel: "low",
      nearestIndustryDistance: 15,
      deforestationRisk: "low",
    },

    // Reviews
    reviews: [
      {
        id: "review-1",
        author: "Anonymous Investor",
        rating: 5,
        date: "2024-03-01",
        comment:
          "Excellent property with clear title and complete documentation. Owner was very cooperative during the inspection process.",
        aspects: ["Good location", "Easy to understand", "Responsive owner"],
        ownerReply: {
          author: "Mr. J. P. Jayasekara",
          date: "2024-03-02",
          comment:
            "Thank you for the positive feedback. We appreciate your interest in our property.",
        },
      },
      {
        id: "review-2",
        author: "Developer",
        rating: 4,
        date: "2024-02-28",
        comment:
          "Good investment opportunity. Soil quality is excellent for agriculture. Some minor access issues during rainy season.",
        aspects: ["Soil quality", "Accessible location"],
      },
    ],
  };

  // Calculate metrics
  const locationInsights = GeoUtils.getLocationInsights(property);

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <PropertyPageHeader role={user.role} property={property} />

        {/* Header with Images */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Image */}
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden mb-4 h-96 bg-gray-200">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="bg-white rounded-full p-3 hover:bg-gray-100 shadow-lg">
                  <Share2 size={20} className="text-gray-700" />
                </button>
                <button className="bg-white rounded-full p-3 hover:bg-gray-100 shadow-lg">
                  <Heart size={20} className="text-gray-700" />
                </button>
              </div>
            </div>

            {/* Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {property.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Property ${idx}`}
                  className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-75 transition"
                />
              ))}
            </div>
          </div>

          {/* Quick Info Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 h-fit">
            <div className="mb-6">
              <p className="text-gray-500 text-sm mb-1">Price</p>
              <p className="text-3xl font-extrabold text-gray-900">
                ${(property.price / 1000000).toFixed(2)}M
              </p>
            </div>

            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Ruler size={20} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Area</p>
                  <p className="font-bold">{property.area} Acres</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="font-bold">{property.location}</p>
                </div>
              </div>
            </div>

            <button className="w-full bg-[#9afb21] text-black hover:bg-[#8aec1b] font-bold py-3 rounded-lg mb-3 transition-colors">
              Contact Owner
            </button>
            <button className="w-full border border-[#9afb21] text-[#9afb21] hover:bg-[#9afb21]/5 font-bold py-3 rounded-lg transition-colors">
              Make Offer
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Description */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                  ✓{" "}
                  {property.status.charAt(0).toUpperCase() +
                    property.status.slice(1)}
                </span>
                <span className="text-gray-500 text-sm">
                  Survey: {property.surveyNumber}
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Location Map & Info */}
            <LocationMap
              latitude={property.latitude}
              longitude={property.longitude}
              title={property.title}
            />

            {/* Location Accessibility */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Location & Accessibility
              </h3>

              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-700">
                    Accessibility Score
                  </span>
                  <span className="text-2xl font-extrabold text-blue-600">
                    {locationInsights.accessibility}
                  </span>
                </div>
                <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${locationInsights.accessibility}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {locationInsights.accessibilityLevel} accessibility
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-xs font-bold text-gray-600 mb-1">
                    Nearby Schools
                  </p>
                  <p className="text-2xl font-extrabold text-blue-600">
                    {locationInsights.nearbySchools}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-xs font-bold text-gray-600 mb-1">
                    Hospitals
                  </p>
                  <p className="text-2xl font-extrabold text-blue-600">
                    {locationInsights.nearbyHospitals}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-xs font-bold text-gray-600 mb-1">
                    Public Transport
                  </p>
                  <p className="text-lg font-extrabold text-blue-600">
                    {locationInsights.publicTransportDistance} km
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-xs font-bold text-gray-600 mb-1">
                    Road Quality
                  </p>
                  <p className="text-lg font-extrabold text-blue-600 capitalize">
                    {locationInsights.roadQuality}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={locationInsights.waterAccess}
                    disabled
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    Water Access
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={locationInsights.electricityAccess}
                    disabled
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    Electricity Access
                  </span>
                </div>
              </div>
            </div>

            {/* Documents Section */}
            {/* <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Documentation
              </h3>
              <div className="space-y-2">
                {property.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-500">
                        Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button className="text-[#9afb21] hover:font-bold transition">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Reviews */}
            <ReviewSection
              reviews={property.reviews}
              avgRating={
                property.reviews.reduce((sum, r) => sum + r.rating, 0) /
                property.reviews.length
              }
              totalReviews={property.reviews.length}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Trust Score */}
            <TrustScoreDisplay listingData={property} />

            {/* Hazard Assessment */}
            <HazardOverlay hazardData={property.hazards} />

            {/* Owner Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Property Owner
              </h3>

              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#9afb21] to-green-500 rounded-full flex items-center justify-center mb-3">
                  <User size={32} className="text-black" />
                </div>
                <p className="font-bold text-gray-900">{property.owner.name}</p>
                <p className="text-sm text-gray-500">
                  Member since {new Date(property.owner.joinDate).getFullYear()}
                </p>
              </div>

              <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                <a
                  href={`tel:${property.owner.phone}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <Phone size={16} />
                  <span className="text-sm">{property.owner.phone}</span>
                </a>
                <a
                  href={`mailto:${property.owner.email}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <Mail size={16} />
                  <span className="text-sm">{property.owner.email}</span>
                </a>
              </div>

              <div className="space-y-2 text-sm pt-4">
                {property.owner.verified && (
                  <div className="flex items-center gap-2 text-green-600">
                    <span className="w-2 h-2 bg-green-600 rounded-full" />
                    Verified Owner
                  </div>
                )}
                {property.owner.idVerified && (
                  <div className="flex items-center gap-2 text-green-600">
                    <span className="w-2 h-2 bg-green-600 rounded-full" />
                    ID Verified
                  </div>
                )}
                {property.owner.kycCompleted && (
                  <div className="flex items-center gap-2 text-green-600">
                    <span className="w-2 h-2 bg-green-600 rounded-full" />
                    KYC Completed
                  </div>
                )}
              </div>

              <button className="w-full mt-4 bg-[#9afb21] text-black hover:bg-[#8aec1b] font-bold py-2 rounded-lg transition-colors text-sm">
                Message Owner
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

