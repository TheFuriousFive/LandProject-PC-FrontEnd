/**
 * Geospatial Utilities
 * Handles map coordinates, distance calculations, area computations
 */

export class GeoUtils {
  /**
   * Calculate distance between two coordinates (Haversine formula)
   * @param {number} lat1 - First latitude
   * @param {number} lon1 - First longitude
   * @param {number} lat2 - Second latitude
   * @param {number} lon2 - Second longitude
   * @returns {number} Distance in kilometers
   */
  static calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Get nearby amenities within radius
   */
  static getNearbyAmenities(propertyLat, propertyLon, amenities, radiusKm = 5) {
    return amenities
      .map((amenity) => ({
        ...amenity,
        distance: this.calculateDistance(
          propertyLat,
          propertyLon,
          amenity.lat,
          amenity.lon,
        ),
      }))
      .filter((amenity) => amenity.distance <= radiusKm)
      .sort((a, b) => a.distance - b.distance);
  }

  /**
   * Calculate area accessibility score (0-100)
   * Based on nearby amenities, infrastructure, connectivity
   */
  static calculateAccessibilityScore(connectivity) {
    let score = 0;

    // Nearby schools (15 points)
    if (connectivity.nearbySchools > 0) {
      score += Math.min(connectivity.nearbySchools * 3, 15);
    }

    // Hospitals (15 points)
    if (connectivity.nearbyHospitals > 0) {
      score += Math.min(connectivity.nearbyHospitals * 5, 15);
    }

    // Public Transport (15 points)
    if (connectivity.publicTransportDistance < 5) {
      score += 15;
    } else if (connectivity.publicTransportDistance < 10) {
      score += 10;
    } else if (connectivity.publicTransportDistance < 15) {
      score += 5;
    }

    // Road Quality (15 points)
    const roadScores = { excellent: 15, good: 12, average: 8, poor: 3 };
    score += roadScores[connectivity.roadQuality] || 0;

    // Markets/Shopping (15 points)
    if (connectivity.nearbyMarkets > 0) {
      score += Math.min(connectivity.nearbyMarkets * 3, 15);
    }

    // Utilities - Water (15 points)
    if (connectivity.waterAccess) score += 15;

    // Utilities - Electricity (10 points)
    if (connectivity.electricityAccess) score += 10;

    return Math.min(score, 100);
  }

  /**
   * Get location insights
   */
  static getLocationInsights(propertyData) {
    const accessibility = this.calculateAccessibilityScore(
      propertyData.connectivity || {},
    );

    return {
      accessibility,
      accessibilityLevel:
        accessibility >= 80
          ? "Excellent"
          : accessibility >= 60
            ? "Good"
            : accessibility >= 40
              ? "Average"
              : "Poor",
      nearbySchools: propertyData.connectivity?.nearbySchools || 0,
      nearbyHospitals: propertyData.connectivity?.nearbyHospitals || 0,
      publicTransportDistance:
        propertyData.connectivity?.publicTransportDistance || "Unknown",
      roadQuality: propertyData.connectivity?.roadQuality || "Unknown",
      waterAccess: propertyData.connectivity?.waterAccess || false,
      electricityAccess: propertyData.connectivity?.electricityAccess || false,
    };
  }
}

export default GeoUtils;
