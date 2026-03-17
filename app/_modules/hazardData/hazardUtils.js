/**
 * Hazard Data & Environmental Assessment
 * Evaluates risks: flooding, earthquakes, pollution, soil quality
 */

export class HazardAnalyzer {
  /**
   * Calculate environmental risk score (0-100)
   * Lower is better. 0 = No risk, 100 = Critical
   */
  static calculateEnvironmentalRisk(hazardData) {
    let totalRisk = 0;

    // Flood risk (25 points max)
    const floodRisk = hazardData.floodingHistory || "none";
    const floodScores = {
      critical: 25,
      high: 18,
      moderate: 10,
      low: 5,
      none: 0,
    };
    totalRisk += floodScores[floodRisk] || 0;

    // Seismic activity (20 points max)
    const seismicZone = hazardData.seismicZone || "low";
    const seismicScores = {
      critical: 20,
      high: 15,
      moderate: 10,
      low: 3,
      none: 0,
    };
    totalRisk += seismicScores[seismicZone] || 0;

    // Soil contamination (20 points max)
    const soilQuality = hazardData.soilQuality || "unknown";
    const soilScores = {
      contaminated: 20,
      poor: 12,
      fair: 8,
      good: 2,
      excellent: 0,
    };
    totalRisk += soilScores[soilQuality] || 5;

    // Air pollution (15 points max)
    const pollutionLevel = hazardData.pollutionLevel || "moderate";
    const pollutionScores = {
      critical: 15,
      high: 12,
      moderate: 8,
      low: 3,
      clean: 0,
    };
    totalRisk += pollutionScores[pollutionLevel] || 5;

    // Industrial proximity (10 points max)
    if (hazardData.nearestIndustryDistance < 2) {
      totalRisk += 10;
    } else if (hazardData.nearestIndustryDistance < 5) {
      totalRisk += 6;
    } else if (hazardData.nearestIndustryDistance < 10) {
      totalRisk += 3;
    }

    // Deforestation/Forest loss (10 points max)
    if (hazardData.deforestationRisk === "high") {
      totalRisk += 10;
    } else if (hazardData.deforestationRisk === "moderate") {
      totalRisk += 5;
    }

    return Math.min(totalRisk, 100);
  }

  /**
   * Get risk assessment breakdown
   */
  static getRiskAssessment(hazardData) {
    const totalRisk = this.calculateEnvironmentalRisk(hazardData);

    return {
      totalRisk,
      riskLevel: this.getRiskLevel(totalRisk),
      description: this.getRiskDescription(totalRisk),
      recommendation: this.getRecommendation(totalRisk),
      details: {
        flooding: hazardData.floodingHistory || "Unknown",
        seismic: hazardData.seismicZone || "Unknown",
        soilQuality: hazardData.soilQuality || "Unknown",
        pollution: hazardData.pollutionLevel || "Unknown",
        industryDistance: hazardData.nearestIndustryDistance || "Unknown",
        deforestation: hazardData.deforestationRisk || "Unknown",
      },
    };
  }

  /**
   * Get risk level label
   */
  static getRiskLevel(score) {
    if (score <= 10) return "Very Low Risk";
    if (score <= 25) return "Low Risk";
    if (score <= 40) return "Moderate Risk";
    if (score <= 60) return "High Risk";
    return "Critical Risk";
  }

  /**
   * Get risk description
   */
  static getRiskDescription(score) {
    if (score <= 10)
      return "Excellent environmental conditions. Minimal hazard concerns.";
    if (score <= 25)
      return "Good environmental conditions. Minor hazard considerations.";
    if (score <= 40)
      return "Acceptable environmental conditions. Some risk mitigation needed.";
    if (score <= 60)
      return "Significant environmental concerns. Professional assessment required.";
    return "Critical environmental hazards. Not recommended for investment.";
  }

  /**
   * Get investment recommendation
   */
  static getRecommendation(score) {
    if (score <= 10) return "✅ Safe - Proceed with investment";
    if (score <= 25) return "✅ Acceptable - Low risk investment";
    if (score <= 40) return "⚠️ Proceed carefully - Get professional survey";
    if (score <= 60) return "❌ High risk - Requires significant mitigation";
    return "❌ Not recommended - Critical environmental hazards";
  }

  /**
   * Get hazard insights for display
   */
  static getHazardInsights(hazardData) {
    const assessment = this.getRiskAssessment(hazardData);

    return {
      ...assessment,
      riskColor:
        assessment.totalRisk <= 10
          ? "green"
          : assessment.totalRisk <= 25
            ? "blue"
            : assessment.totalRisk <= 40
              ? "yellow"
              : assessment.totalRisk <= 60
                ? "orange"
                : "red",
    };
  }
}

export default HazardAnalyzer;
