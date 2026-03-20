"use client";

import { useParams, useRouter } from "next/navigation";
import BackButton from "@/_components/BackButton";
import {
  MapPin,
  Ruler,
  Share2,
  Heart,
} from "lucide-react";
import LocationMap from "@/_modules/geospatial/LocationMap";

import TrustScoreDisplay from "@/_modules/trustScore/TrustScoreDisplay";
import ReviewSection from "@/_shared/ReviewSection";
import GeoUtils from "@/_modules/geospatial/mapUtils";
import PropertyPageHeader from "@/_modules/property/PropertyPageHeader";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/hooks";

export default function PropertyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  
  // TODO: Fetch property data from API using propertyId
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with actual API call
    // const fetchProperty = async () => {
    //   try {
    //     const response = await fetch(`/api/properties/${params.propertyId}`);
    //     const data = await response.json();
    //     setProperty(data);
    //   } catch (error) {
    //     console.error('Failed to fetch property:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchProperty();
  }, [params.propertyId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-20">
            <p className="text-gray-500">Loading property details...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!property) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center py-20">
          <BackButton />
          <p className="text-gray-500 text-lg">Property not found.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <BackButton />
        </div>
        <PropertyPageHeader role={user.role} property={property} />

        {/* 1. HERO SECTION - Gallery & Images */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          {/* Main Image */}
          <div className="lg:col-span-3">
            <div className="relative rounded-2xl overflow-hidden h-96 bg-gray-200">
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
          </div>

          {/* Trust Score Card */}
          <div className="h-fit">
            <TrustScoreDisplay listingData={property} />
          </div>
        </div>

        {/* Gallery Thumbnails */}
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mb-8">
          {property.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Property ${idx}`}
              className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-75 transition border border-gray-200"
            />
          ))}
        </div>

        {/* 2. TITLE & DESCRIPTION SECTION */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
                {property.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
                  <span className="text-lg">✓</span>
                  {property.status.charAt(0).toUpperCase() +
                    property.status.slice(1)}
                </span>
                <span className="text-gray-600 font-semibold">
                  Survey Number: <span className="text-gray-900">{property.surveyNumber}</span>
                </span>
                <span className="text-gray-600 font-semibold">
                  Type: <span className="text-gray-900">{property.landType}</span>
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* 3. CONTACT OWNER SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Contact/Quick Info Card - Left side */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 h-fit">
            <div className="mb-6">
              <p className="text-gray-500 text-sm mb-1">Price</p>
              <p className="text-3xl font-extrabold text-gray-900">
                ${(property.price / 1000000).toFixed(2)}M
              </p>
              <p className="text-xs text-gray-400 mt-1">{property.currency}</p>
            </div>

            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-start gap-3">
                <Ruler size={18} className="text-gray-400 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Land Area</p>
                  <p className="font-bold text-gray-900">{property.area} Acres</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-gray-400 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="font-bold text-gray-900">
                    {typeof property.location === 'object' 
                      ? `${property.location.city}, ${property.location.state}` 
                      : property.location}
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => router.push(`/property/${params.propertyId}/schedule-appointment`)}
              className="w-full bg-[#9afb21] text-black hover:bg-[#8aec1b] font-bold py-3 rounded-lg transition-colors text-sm">
              Contact Owner
            </button>
          </div>
        </div>

        {/* 4. LOCATION MAP SECTION */}
        <div className="mb-8">
          <LocationMap
            latitude={property.latitude}
            longitude={property.longitude}
            title={property.title}
          />
        </div>

        {/* 5. LOCATION & ACCESSIBILITY DETAILS */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Location & Accessibility
          </h2>

          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-gray-700 text-lg">
                Accessibility Score
              </span>
              <span className="text-3xl font-extrabold text-blue-600">
                {locationInsights.accessibility}/100
              </span>
            </div>
            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
                style={{ width: `${locationInsights.accessibility}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2 capitalize">
              {locationInsights.accessibilityLevel} accessibility level
            </p>
          </div>

          {/* Accessibility Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
              <p className="text-xs font-bold text-gray-600 mb-2">Nearby Schools</p>
              <p className="text-3xl font-extrabold text-blue-600">
                {locationInsights.nearbySchools}
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
              <p className="text-xs font-bold text-gray-600 mb-2">Hospitals</p>
              <p className="text-3xl font-extrabold text-blue-600">
                {locationInsights.nearbyHospitals}
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
              <p className="text-xs font-bold text-gray-600 mb-2">Public Transport</p>
              <p className="text-2xl font-extrabold text-blue-600">
                {locationInsights.publicTransportDistance} <span className="text-sm">km</span>
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
              <p className="text-xs font-bold text-gray-600 mb-2">Road Quality</p>
              <p className="text-xl font-extrabold text-blue-600 capitalize">
                {locationInsights.roadQuality}
              </p>
            </div>
          </div>

          {/* Infrastructure Access */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <p className="font-bold text-gray-900 mb-4">Infrastructure & Access</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                <div className="w-5 h-5 rounded border-2 border-blue-500 flex items-center justify-center bg-blue-50">
                  {locationInsights.waterAccess && (
                    <span className="text-blue-600 font-bold">✓</span>
                  )}
                </div>
                <span className="font-semibold text-gray-700">Water Access</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                <div className="w-5 h-5 rounded border-2 border-blue-500 flex items-center justify-center bg-blue-50">
                  {locationInsights.electricityAccess && (
                    <span className="text-blue-600 font-bold">✓</span>
                  )}
                </div>
                <span className="font-semibold text-gray-700">Electricity Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6. REVIEWS SECTION */}
        <ReviewSection
          reviews={property.reviews}
          avgRating={
            property.reviews.reduce((sum, r) => sum + r.rating, 0) /
            property.reviews.length
          }
          totalReviews={property.reviews.length}
        />
      </div>
    </main>
  );
}

