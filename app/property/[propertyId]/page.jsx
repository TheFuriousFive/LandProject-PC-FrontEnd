"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Share2, Heart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import LocationMap from "@/_modules/geospatial/LocationMap";
import TrustScoreDisplay from "@/_modules/trustScore/TrustScoreDisplay";
import ReviewSection from "@/_shared/ReviewSection";
import QASection from "@/_shared/QASection";
import PropertyPageHeader from "@/_modules/property/PropertyPageHeader";
import { useAuth } from "@/lib/hooks";
import MDEditor from "@uiw/react-md-editor";
import ContactInquiryCard from "@/_shared/ContactInquiryCard";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const normalizeStatus = (listing) =>
  String(
    listing?.status ||
      listing?.verificationStatus ||
      listing?.verification_status ||
      "",
  ).toLowerCase();

const isApprovedListing = (listing) => normalizeStatus(listing) === "approved";

const getFallbackProperties = () => [
  {
    id: 1,
    title: "Premium Agricultural Land",
    description: "Fertile soil, great for crops and farming.",
    price: 1200000,
    area: 320,
    location: "Iowa, IA",
    landType: "Agricultural",
    verificationStatus: "VERIFIED",
    status: "approved",
    osmLandUse: "Farmland",
    imageUrls: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    id: 2,
    title: "Development Ready Plot",
    description: "Prime location for residential development.",
    price: 850000,
    area: 85,
    location: "Texas, TX",
    landType: "Mixed Use",
    verificationStatus: "VERIFIED",
    status: "approved",
    osmLandUse: "Meadow",
    imageUrls: [
      "https://images.unsplash.com/photo-1492617519907-e0f71f7c76fc?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    id: 3,
    title: "Pine Forest Retreat",
    description: "Beautiful timber property with road access.",
    price: 450000,
    area: 120,
    location: "Oregon, OR",
    landType: "Residential",
    verificationStatus: "UNVERIFIED",
    status: "approved",
    osmLandUse: "Forest",
    imageUrls: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop",
    ],
  },
];

export default function PropertyDetailsPage() {
  const params = useParams();
  const { user } = useAuth();
  console.log(user, "userrrrrrrrrrrrrrrrr");

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property?.title || "Property Details",
          text: property?.description || "Check out this property!",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevList) =>
      prevList === 0 ? property.images.length - 1 : prevList - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevList) =>
      prevList === property.images.length - 1 ? 0 : prevList + 1,
    );
  };

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        let token = "";
        if (typeof window !== "undefined") {
          const rawToken = localStorage.getItem("token") || "";
          token = rawToken.replace(/^"|"$/g, "").trim();
        }

        const headers = {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        };

        // Fetch base property details (using search since it's the specified endpoint for investors to see listings)
        const propertyRes = await fetch(
          `${API_BASE}/landapp/investors/search`,
          { headers },
        );
        if (!propertyRes.ok) {
          console.error(
            "Fetch property details error status:",
            propertyRes.status,
            propertyRes.statusText,
          );
          throw new Error("Failed to fetch property details");
        }
        const allProperties = await propertyRes.json();

        let propertyData = Array.isArray(allProperties)
          ? allProperties.find(
              (p) => String(p.id) === String(params.propertyId),
            )
          : allProperties;

        if (!propertyData) {
          throw new Error("Property not found in search results");
        }

        const normalizedStatus = normalizeStatus(propertyData);

        if (normalizedStatus !== "approved") {
          throw new Error("Property not found in search results");
        }

        // Ensure default structure so UI won't crash while mapping
        propertyData = {
          id: propertyData.id || params.propertyId,
          title: propertyData.title || "Unknown Title",
          location:
            propertyData.location || propertyData.address || "Unknown Location",
          latitude: propertyData.latitude || 7.2906,
          longitude: propertyData.longitude || 80.6337,
          area: propertyData.area || 0,
          price: propertyData.price || 0,
          currency: propertyData.currency || "USD",
          landType:
            propertyData.landType || propertyData.land_type || "Unknown",
          surveyNumber: propertyData.surveyNumber || "N/A",
          status:
            propertyData.status || propertyData.verificationStatus || "unknown",
          description: propertyData.description || "No description provided.",
          images:
            propertyData.imageUrls && propertyData.imageUrls.length > 0
              ? propertyData.imageUrls
              : [
                  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800",
                  "https://images.unsplash.com/photo-1574082168995-b2b5e1cbf59f?q=80&w=800",
                ],
          owner: propertyData.owner || {
            id: "owner-123",
            name: "Unknown Owner",
            avatar:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
            joinDate: "2023-01-15",
            verified: false,
            phone: "N/A",
            email: "N/A",
            previousListings: 0,
            idVerified: false,
            contactVerified: false,
            kycCompleted: false,
            accountAgeMonths: 0,
          },
          keywords: propertyData.keywords || [],
          documents: propertyData.documents || [],
          connectivity: propertyData.connectivity || {
            nearbySchools: 0,
            nearbyHospitals: 0,
            publicTransportDistance: 0,
            roadQuality: "unknown",
            nearbyMarkets: 0,
            waterAccess: false,
            electricityAccess: false,
          },
          hazards: propertyData.hazards || {
            floodingHistory: "low",
            seismicZone: "low",
            soilQuality: "moderate",
            pollutionLevel: "low",
            nearestIndustryDistance: 10,
            deforestationRisk: "low",
          },
          reviews: propertyData.reviews || [],
          questions: propertyData.questions || [],
        };

        // Fetch questions
        try {
          const qRes = await fetch(
            `${API_BASE}/api/listings/${params.propertyId}/questions`,
            { headers },
          );
          if (qRes.ok) {
            const qData = await qRes.json();
            if (Array.isArray(qData)) {
              propertyData.questions = qData;
            }
          }
        } catch (e) {
          console.error("Failed to fetch questions:", e);
        }

        // Fetch reviews
        try {
          const rRes = await fetch(
            `${API_BASE}/api/listings/${params.propertyId}/reviews`,
            { headers },
          );
          if (rRes.ok) {
            const rData = await rRes.json();
            if (Array.isArray(rData)) {
              propertyData.reviews = rData;
            }
          }
        } catch (e) {
          console.error("Failed to fetch reviews:", e);
        }

        setProperty(propertyData);
      } catch (error) {
        console.error("Error fetching property:", error);

        const fallbackProperties = getFallbackProperties();
        const localListings = JSON.parse(
          localStorage.getItem("land_listings") || "[]",
        );
        const combinedListings = [...localListings, ...fallbackProperties];
        const approvedListing = combinedListings.find(
          (listing) =>
            String(listing.id) === String(params.propertyId) &&
            isApprovedListing(listing),
        );

        if (approvedListing) {
          setProperty({
            id: approvedListing.id,
            title: approvedListing.title || "Unknown Title",
            location:
              approvedListing.location ||
              approvedListing.address ||
              "Unknown Location",
            latitude: approvedListing.latitude || 7.2906,
            longitude: approvedListing.longitude || 80.6337,
            area: approvedListing.area || approvedListing.acres || 0,
            price: approvedListing.price || 0,
            currency: approvedListing.currency || "USD",
            landType:
              approvedListing.landType ||
              approvedListing.land_type ||
              "Unknown",
            surveyNumber: approvedListing.surveyNumber || "N/A",
            status:
              approvedListing.status ||
              approvedListing.verificationStatus ||
              "approved",
            description:
              approvedListing.description || "No description provided.",
            images:
              approvedListing.imageUrls && approvedListing.imageUrls.length > 0
                ? approvedListing.imageUrls
                : [
                    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800",
                  ],
            owner: approvedListing.owner || {
              id: approvedListing.ownerId || "owner-123",
              name: "Unknown Owner",
              avatar:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
              joinDate: "2023-01-15",
              verified: false,
              phone: "N/A",
              email: "N/A",
              previousListings: 0,
              idVerified: false,
              contactVerified: false,
              kycCompleted: false,
              accountAgeMonths: 0,
            },
            keywords: approvedListing.keywords || [],
            documents:
              approvedListing.documents ||
              approvedListing.land_listing_documents ||
              [],
            connectivity: approvedListing.connectivity || {
              nearbySchools: 0,
              nearbyHospitals: 0,
              publicTransportDistance: 0,
              roadQuality: "unknown",
              nearbyMarkets: 0,
              waterAccess: false,
              electricityAccess: false,
            },
            hazards: approvedListing.hazards || {
              floodingHistory: "low",
              seismicZone: "low",
              soilQuality: "moderate",
              pollutionLevel: "low",
              nearestIndustryDistance: 10,
              deforestationRisk: "low",
            },
            reviews: approvedListing.reviews || [],
            questions: approvedListing.questions || [],
          });
        }
      } finally {
        setLoading(false);
      }
    };

    if (params.propertyId) {
      fetchPropertyData();
    }
  }, [params.propertyId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Property not found
      </div>
    );
  }

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

        {/* Header with Images */}
        <div className="mb-8">
          <div className="relative rounded-2xl overflow-hidden mb-4 h-96 bg-gray-200 group">
            <Image
              src={property.images ? property.images[currentImageIndex] : ""}
              alt={property.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover transition-opacity duration-300"
            />

            {/* Navigation Arrows */}
            {property.images && property.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Top Right Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={handleShare}
                className="bg-white rounded-full p-3 hover:bg-gray-100 shadow-lg transition-transform hover:scale-105"
              >
                <Share2 size={20} className="text-gray-700" />
              </button>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="bg-white rounded-full p-3 hover:bg-gray-100 shadow-lg transition-transform hover:scale-105"
              >
                <Heart
                  size={20}
                  className={`${
                    isLiked ? "fill-red-500 text-red-500" : "text-gray-700"
                  } transition-colors`}
                />
              </button>
            </div>

            {/* Image Indicators */}
            {property.images && property.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {property.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentImageIndex === idx
                        ? "bg-white w-4"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Gallery */}
          {property.images && property.images.length > 1 && (
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {property.images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`relative cursor-pointer rounded-lg overflow-hidden h-20 ${
                    currentImageIndex === idx
                      ? "ring-2 ring-primary border-2 border-green-500"
                      : "opacity-75 hover:opacity-100"
                  } transition-all`}
                >
                  <Image
                    src={img}
                    alt={`Property image ${idx + 1}`}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
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
                  <p className="font-semibold text-gray-900">
                    {property.landType}
                  </p>
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
                  <p className="font-semibold text-gray-900">
                    {property.area} Acres
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg border border-gray-100 p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">
                    Location
                  </p>
                  <p className="font-semibold text-gray-900">
                    {property.location}
                  </p>
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
                  <MDEditor.Markdown
                    source={property.description || "No description provided."}
                  />
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
            <QASection listingId={property.id} ownerId={property.owner?.id} />

            {/* Reviews */}
            <ReviewSection
              listingId={property.id}
              reviews={property.reviews}
              avgRating={
                property.reviews?.length
                  ? property.reviews.reduce((sum, r) => sum + r.rating, 0) /
                    property.reviews.length
                  : 0
              }
              totalReviews={property.reviews?.length || 0}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Trust Score */}
            <TrustScoreDisplay listingData={property} />

            <ContactInquiryCard
              ownerName={property.owner?.name}
              listingId={property.id}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
