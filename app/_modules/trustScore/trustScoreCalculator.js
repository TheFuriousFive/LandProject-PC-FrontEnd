/**
 * Trust Score Calculator
 * Calculates reliability score (0-100) for land listings
 * Based on: Documentation completeness, owner verification, peer reviews, approval status
 */

export class TrustScoreCalculator {
  /**
   * Calculate overall trust score
   * @param {Object} listingData - Listing details
   * @returns {number} Trust score 0-100
   */
  static calculateScore(listingData) {
    const weights = {
      documentation: 0.35, // 35% - Completeness of documents
      ownerVerification: 0.25, // 25% - Owner identity verification
      peerReviews: 0.2, // 20% - Community reviews & ratings
      governmentApproval: 0.2, // 20% - Government validation status
    };

    const scores = {
      documentation: this.calculateDocumentationScore(
        listingData.documents || [],
      ),
      ownerVerification: this.calculateOwnerVerificationScore(
        listingData.owner || {},
      ),
      peerReviews: this.calculatePeerReviewScore(listingData.reviews || []),
      governmentApproval: this.calculateApprovalScore(
        listingData.approvalStatus,
      ),
    };

    // Calculate weighted score
    const totalScore =
      scores.documentation * weights.documentation +
      scores.ownerVerification * weights.ownerVerification +
      scores.peerReviews * weights.peerReviews +
      scores.governmentApproval * weights.governmentApproval;

    return Math.round(totalScore);
  }

  /**
   * Calculate documentation completeness score (0-100)
   */
  static calculateDocumentationScore(documents) {
    const requiredDocs = [
      "deed",
      "surveyMap",
      "taxCertificate",
      "pollutionClearance",
      "boundaryMarked",
    ];

    const uploadedDocTypes = documents.map((doc) => doc.type);
    const completeness =
      (uploadedDocTypes.filter((type) => requiredDocs.includes(type)).length /
        requiredDocs.length) *
      100;

    // Bonus for additional documentation
    const additionalBonus =
      Math.min(documents.length - requiredDocs.length, 5) * 2;

    return Math.min(completeness + additionalBonus, 100);
  }

  /**
   * Calculate owner verification score (0-100)
   */
  static calculateOwnerVerificationScore(owner) {
    let score = 0;

    // ID verification (25 points)
    if (owner.idVerified) score += 25;

    // Contact verification (15 points)
    if (owner.contactVerified) score += 15;

    // Property history (20 points)
    if (owner.previousListings && owner.previousListings > 0) {
      score += Math.min(owner.previousListings * 5, 20);
    }

    // Account age (15 points)
    if (owner.accountAgeMonths && owner.accountAgeMonths >= 12) {
      score += 15;
    } else if (owner.accountAgeMonths) {
      score += (owner.accountAgeMonths / 12) * 15;
    }

    // KYC completion (25 points)
    if (owner.kycCompleted) score += 25;

    return Math.min(score, 100);
  }

  /**
   * Calculate peer review score (0-100)
   */
  static calculatePeerReviewScore(reviews) {
    if (reviews.length === 0) return 50; // Neutral score for no reviews

    const averageRating =
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    const reviewCount = reviews.length;

    // Rating value (70 points)
    const ratingScore = (averageRating / 5) * 70;

    // Review count bonus (30 points, max at 10+ reviews)
    const reviewBonus = Math.min((reviewCount / 10) * 30, 30);

    return Math.round(ratingScore + reviewBonus);
  }

  /**
   * Calculate approval score (0-100)
   */
  static calculateApprovalScore(status) {
    const approvalScores = {
      approved: 100,
      underReview: 65,
      pending: 50,
      rejected: 0,
      notSubmitted: 30,
    };

    return approvalScores[status] || 30;
  }

  /**
   * Get trust score breakdown with description
   */
  static getScoreBreakdown(listingData) {
    const score = this.calculateScore(listingData);
    const breakdown = {
      score,
      level: this.getScoreLevel(score),
      description: this.getScoreDescription(score),
      recommendation: this.getInvestorRecommendation(score),
      details: {
        documentation: this.calculateDocumentationScore(
          listingData.documents || [],
        ),
        ownerVerification: this.calculateOwnerVerificationScore(
          listingData.owner || {},
        ),
        peerReviews: this.calculatePeerReviewScore(listingData.reviews || []),
        governmentApproval: this.calculateApprovalScore(
          listingData.approvalStatus,
        ),
      },
    };

    return breakdown;
  }

  /**
   * Get trust level label
   */
  static getScoreLevel(score) {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Very Good";
    if (score >= 55) return "Good";
    if (score >= 40) return "Fair";
    return "Low";
  }

  /**
   * Get score description
   */
  static getScoreDescription(score) {
    if (score >= 85)
      return "Highly trustworthy. Complete documentation and verified owner.";
    if (score >= 70) return "Trustworthy. Most documentation complete.";
    if (score >= 55)
      return "Moderately trustworthy. Some documentation pending.";
    if (score >= 40) return "Limited trust. Significant verification needed.";
    return "Low trust. Requires further investigation before investment.";
  }

  /**
   * Get investment recommendation
   */
  static getInvestorRecommendation(score) {
    if (score >= 85) return "✅ Recommended - Safe to invest";
    if (score >= 70) return "✅ Good option - Conduct due diligence";
    if (score >= 55) return "⚠️ Proceed with caution - Request more info";
    if (score >= 40) return "❌ High risk - Request additional verification";
    return "❌ Not recommended - Major concerns";
  }
}

export default TrustScoreCalculator;
