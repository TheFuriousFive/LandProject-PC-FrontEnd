"use client";

import { useParams } from "next/navigation";
import { Share2, Heart, Star } from "lucide-react";
import Link from "next/link";
import LocationMap from "@/_modules/geospatial/LocationMap";
import TrustScoreDisplay from "@/_modules/trustScore/TrustScoreDisplay";
import ReviewSection from "@/_shared/ReviewSection";
import QASection from "@/_shared/QASection";
import PropertyPageHeader from "@/_modules/property/PropertyPageHeader";
import { useAuth } from "@/lib/hooks";
import MDEditor from "@uiw/react-md-editor";
import ContactInquiryCard from "@/_shared/ContactInquiryCard";

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
    keywords: ["Agricultural", "Water Access", "Investment", "Road Access"],
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800",
      "https://images.unsplash.com/photo-1574082168995-b2b5e1cbf59f?q=80&w=800",
    ],

    // Owner info
    owner: {
      id: "owner-123",
      name: "Rebekah O'Neil",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
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

    // Questions & Answers
    questions: [
      {
        id: "q-1",
        investorName: "Alice Smith",
        date: "2024-03-10",
        content: "Is there an existing irrigation system in place?",
        answer:
          "Yes, there is a drip irrigation system installed covering 30% of the land.",
        answerDate: "2024-03-11",
      },
      {
        id: "q-2",
        investorName: "Bob Jones",
        date: "2024-03-15",
        content: "What crops were previously grown here?",
        answer: null,
        answerDate: null,
      },
    ],
  };

  const avgOwnerRating = property.reviews?.length
    ? (
        property.reviews.reduce((sum, review) => sum + review.rating, 0) /
        property.reviews.length
      ).toFixed(1)
    : "0.0";

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <PropertyPageHeader role={user?.role} property={property} />

        <div className="bg-white border border-gray-200 rounded-2xl px-4 py-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <Link
              href={`/owners/${property.owner.id}`}
              className="group flex items-center gap-3 rounded-xl hover:bg-gray-50 p-2 -m-2 transition-colors w-fit"
            >
              <img
                src={property.owner.avatar}
                alt={property.owner.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-200"
              />
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  Listing Owner
                </p>
                <p className="text-lg font-bold text-gray-900 group-hover:underline">
                  {property.owner.name}
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-2 w-fit">
              <Star size={16} className="text-amber-500 fill-amber-500" />
              <span className="text-sm font-bold text-amber-700">
                {avgOwnerRating} / 5.0 owner rating
              </span>
              <span className="text-xs font-semibold text-amber-600">
                ({property.reviews.length} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Header with Images */}
        <div className="mb-8">
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Listing Details, Keywords and Description */}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                <div className="bg-gray-50 rounded-lg border border-gray-100 p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">
                    Land Type
                  </p>
                  <p className="font-semibold text-gray-900">{property.landType}</p>
                </div>
                <div className="bg-gray-50 rounded-lg border border-gray-100 p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">
                    Price
                  </p>
                  <p className="font-semibold text-gray-900">
                    ${property.price.toLocaleString()} {property.currency}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg border border-gray-100 p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">
                    Area
                  </p>
                  <p className="font-semibold text-gray-900">{property.area} Acres</p>
                </div>
                <div className="bg-gray-50 rounded-lg border border-gray-100 p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">
                    Location
                  </p>
                  <p className="font-semibold text-gray-900">{property.location}</p>
                </div>
              </div>

              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
                  Keywords
                </p>
                <div className="flex flex-wrap gap-2">
                  {(property.keywords || []).map((keyword) => (
                    <span
                      key={keyword}
                      className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
                  Description
                </p>
                <div className="prose prose-sm max-w-none">
                  <MDEditor.Markdown source={property.description || "No description provided."} />
                </div>
              </div>
            </div>

            {/* Location Map & Info */}
            <LocationMap
              latitude={property.latitude}
              longitude={property.longitude}
              title={property.title}
            />

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

            {/* Q&A Section */}
            <QASection
              questions={property.questions}
              listingId={property.id}
              ownerId={property.owner.id}
            />

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

            <ContactInquiryCard ownerName={property.owner.name} />
          </div>
        </div>
      </div>
    </main>
  );
}
