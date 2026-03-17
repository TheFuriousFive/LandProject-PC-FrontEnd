"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Building, ShieldCheck } from "lucide-react";

export default function InvestorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.invests@example.com",
    phone: "+1 (555) 123-4567",
    company: "AJ Capital Group",
    location: "New York, NY",
    bio: "Real estate investor specializing in agricultural lands and developing mixed-use properties.",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Submit to an API here
  };

  return (
    <div className="p-8 md:p-12 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            My Profile
          </h1>
          <p className="text-gray-500 font-medium">
            Manage your personal information and preferences.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl font-bold text-sm">
          <ShieldCheck size={18} /> Verified Investor
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header/Cover */}
        <div className="h-32 bg-gradient-to-r from-[#0f0f11] to-[#1a1a1e] relative">
          <div className="absolute -bottom-12 left-8 w-24 h-24 bg-white rounded-2xl border-4 border-white shadow-md flex items-center justify-center text-[#9afb21] overflow-hidden">
            <div className="w-full h-full bg-[#0f0f11] flex items-center justify-center">
              <User size={40} className="text-[#9afb21]" />
            </div>
          </div>
        </div>

        <div className="pt-16 pb-8 px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-gray-500 font-medium">{profile.company}</p>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gray-100 text-gray-900 px-5 py-2 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-100 text-gray-900 px-5 py-2 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-[#9afb21] text-[#0f0f11] px-5 py-2 rounded-xl font-bold text-sm hover:bg-[#8bed1c] transition-colors"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-5">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                Contact Information
              </h3>

              <div>
                <label className="flex items-center text-sm font-bold text-gray-700 mb-1">
                  <Mail size={16} className="mr-2 text-gray-400" /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg px-4 py-2.5 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none disabled:opacity-70 disabled:bg-gray-100 transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-bold text-gray-700 mb-1">
                  <Phone size={16} className="mr-2 text-gray-400" /> Phone
                  Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg px-4 py-2.5 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none disabled:opacity-70 disabled:bg-gray-100 transition-colors"
                />
              </div>
            </div>

            {/* General Info */}
            <div className="space-y-5">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                General Details
              </h3>

              <div>
                <label className="flex items-center text-sm font-bold text-gray-700 mb-1">
                  <Building size={16} className="mr-2 text-gray-400" /> Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={profile.company}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg px-4 py-2.5 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none disabled:opacity-70 disabled:bg-gray-100 transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-bold text-gray-700 mb-1">
                  <MapPin size={16} className="mr-2 text-gray-400" /> Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg px-4 py-2.5 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none disabled:opacity-70 disabled:bg-gray-100 transition-colors"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center text-sm font-bold text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg px-4 py-3 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none disabled:opacity-70 disabled:bg-gray-100 transition-colors resize-none"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
