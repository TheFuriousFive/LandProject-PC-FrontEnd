import { TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import TrustScoreCalculator from "./trustScoreCalculator";

export default function TrustScoreDisplay({ listingData }) {
  if (!listingData) return null;

  const scoreBreakdown = TrustScoreCalculator.getScoreBreakdown(listingData);
  const { score, level, description, recommendation } = scoreBreakdown;

  // Determine color based on score
  const getScoreColor = (s) => {
    if (s >= 85) return "text-green-700";
    if (s >= 70) return "text-blue-700";
    if (s >= 55) return "text-yellow-700";
    if (s >= 40) return "text-orange-700";
    return "text-red-700";
  };

  const getScoreIcon = (s) => {
    if (s >= 70) return <CheckCircle className="text-green-600" size={24} />;
    if (s >= 55) return <TrendingUp className="text-yellow-600" size={24} />;
    return <AlertCircle className="text-red-600" size={24} />;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 text-gray-900">
      {/* Header with Icon and Score */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {getScoreIcon(score)}
          <div>
            <h3 className="text-sm font-bold opacity-75">Trust Score</h3>
            <p className="text-3xl font-extrabold">{score}/100</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-lg font-bold ${getScoreColor(score)}`}>{level}</p>
          <p className="text-xs opacity-75 max-w-xs">{description}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-500"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* Recommendation */}
      <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 mb-4">
        <p className="text-sm font-semibold">{recommendation}</p>
      </div>
    </div>
  );
}
