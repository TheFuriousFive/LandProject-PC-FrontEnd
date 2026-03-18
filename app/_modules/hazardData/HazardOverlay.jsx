import {
  AlertTriangle,
  Droplets,
  Zap,
  Wind,
  Factory,
  Leaf,
} from "lucide-react";
import HazardAnalyzer from "./hazardUtils";

export default function HazardOverlay({ hazardData }) {
  if (!hazardData) return null;

  const analysis = HazardAnalyzer.getHazardInsights(hazardData);

  const getRiskColor = (risk) => {
    if (risk <= 10) return "bg-white text-gray-900 border-gray-200";
    if (risk <= 25) return "bg-white text-gray-900 border-gray-200";
    if (risk <= 40) return "bg-white text-gray-900 border-gray-200";
    if (risk <= 60) return "bg-white text-gray-900 border-gray-200";
    return "bg-white text-gray-900 border-gray-200";
  };

  const hazards = [
    {
      icon: Droplets,
      label: "Flooding",
      value: hazardData.floodingHistory || "Unknown",
      color: "text-blue-500",
    },
    {
      icon: Zap,
      label: "Seismic",
      value: hazardData.seismicZone || "Unknown",
      color: "text-red-500",
    },
    {
      icon: Wind,
      label: "Pollution",
      value: hazardData.pollutionLevel || "Unknown",
      color: "text-orange-500",
    },
    {
      icon: Factory,
      label: "Industry",
      value: `${hazardData.nearestIndustryDistance || 0} km away`,
      color: "text-gray-500",
    },
    {
      icon: Leaf,
      label: "Deforestation",
      value: hazardData.deforestationRisk || "Unknown",
      color: "text-green-600",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      {/* <div
        className={`border-2 rounded-2xl p-6 `}
      > */}
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <AlertTriangle size={28} />
        <div>
          <h3 className="text-lg font-bold">Environmental Risk Assessment</h3>
          <p className="text-sm opacity-75">{analysis.description}</p>
        </div>
      </div>

      {/* Risk Score */}
      <div className="mb-4 bg-gray-50 border border-gray-100 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold">Risk Score</span>
          <span className="text-2xl font-extrabold">
            {analysis.totalRisk}/100
          </span>
        </div>
        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all"
            style={{ width: `${analysis.totalRisk}%` }}
          />
        </div>
        <p className="text-sm font-semibold mt-2">{analysis.riskLevel}</p>
      </div>

      {/* Recommendation */}
      <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 mb-4">
        <p className="text-sm font-bold">{analysis.recommendation}</p>
      </div>

      {/* Hazard Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {hazards.map((hazard, idx) => {
          const Icon = hazard.icon;
          return (
            <div
              key={idx}
              className="bg-gray-50 border border-gray-100 rounded-lg p-4 text-center"
            >
              <Icon size={24} className={`mx-auto mb-2 ${hazard.color}`} />
              <p className="text-xs font-bold opacity-75 mb-1">
                {hazard.label}
              </p>
              <p className="text-sm font-bold">{hazard.value}</p>
            </div>
          );
        })}
      </div>

      {/* Soil Quality */}
      {hazardData.soilQuality && (
        <div className="mt-4 bg-gray-50 border border-gray-100 rounded-lg p-4">
          <p className="text-xs font-bold opacity-75 mb-2">Soil Quality</p>
          <p className="font-bold capitalize">{hazardData.soilQuality}</p>
        </div>
      )}

      {/* Professional Assessment Recommendation */}
      {analysis.totalRisk >= 40 && (
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-sm">
            ⚠️ <strong>Professional survey recommended</strong> before
            investment decision.
          </p>
        </div>
      )}
    </div>
  );
}
