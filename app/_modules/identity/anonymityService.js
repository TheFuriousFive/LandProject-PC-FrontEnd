/**
 * Anonymity & Identity Service
 * Manages user privacy, anonymization, verification, and legal accountability
 */

export class AnonymityService {
  /**
   * Generate anonymous ID for user privacy
   */
  static generateAnonymousId() {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 10);
    return `USR-${timestamp}-${randomStr}`.toUpperCase();
  }

  /**
   * Check if user is anonymous
   */
  static isAnonymous(userProfile) {
    return userProfile?.anonymityLevel === "full";
  }

  /**
   * Get anonymized user data for display
   */
  static getAnonymizedProfile(user) {
    if (user.anonymityLevel === "full") {
      return {
        id: user.anonymousId || this.generateAnonymousId(),
        name: "Anonymous Seller",
        email: "hidden@anonymous.local",
        phone: "•••••••••••",
        verified: user.verified || false,
        memberSince: user.joinDate
          ? new Date(user.joinDate).getFullYear()
          : null,
      };
    } else if (user.anonymityLevel === "partial") {
      return {
        id: user.id,
        name: user.firstName || "User",
        email: this.maskEmail(user.email),
        phone: this.maskPhone(user.phone),
        verified: user.verified || false,
        memberSince: user.joinDate
          ? new Date(user.joinDate).getFullYear()
          : null,
      };
    } else {
      // Full transparency for verified users
      return {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone,
        verified: user.verified || false,
        address: user.address,
        memberSince: user.joinDate
          ? new Date(user.joinDate).getFullYear()
          : null,
      };
    }
  }

  /**
   * Mask email address
   */
  static maskEmail(email) {
    if (!email) return "hidden@email.com";
    const [localPart, domain] = email.split("@");
    const masked =
      localPart.substring(0, 2) +
      "***" +
      localPart.substring(localPart.length - 1);
    return `${masked}@${domain}`;
  }

  /**
   * Mask phone number
   */
  static maskPhone(phone) {
    if (!phone) return "••••• •••••";
    return phone.substring(0, 3) + "•••" + phone.substring(phone.length - 3);
  }

  /**
   * Verify user identity with documents
   */
  static verifyUserIdentity(documents) {
    const requiredDocs = ["nationalId", "address"];
    const uploadedTypes = documents.map((doc) => doc.type);
    const allRequired = requiredDocs.every((type) =>
      uploadedTypes.includes(type),
    );

    return {
      isVerified: allRequired,
      completeness:
        (uploadedTypes.filter((t) => requiredDocs.includes(t)).length /
          requiredDocs.length) *
        100,
      missingDocs: requiredDocs.filter((type) => !uploadedTypes.includes(type)),
    };
  }

  /**
   * Create legal contract reference
   */
  static generateLegalReference(user, property) {
    const timestamp = Date.now().toString(36);
    return {
      contractId:
        `TERRAVEST-${user.id}-${property.id}-${timestamp}`.toUpperCase(),
      legalEntity: user.name || "Anonymous User",
      propertyReference: property.surveyNumber || property.id,
      createdAt: new Date().toISOString(),
    };
  }

  /**
   * Ensure legal accountability
   */
  static ensureLegalAccountability(user) {
    const accountabilityChecks = {
      identityVerified: user.verified || false,
      documentationComplete: user.documentsVerified || false,
      disclaimerAccepted: user.disclaimerAccepted || false,
      termsAgreed: user.termsAgreed || false,
      dataConsent: user.dataConsent || false,
    };

    const allChecks = Object.values(accountabilityChecks).every(
      (check) => check,
    );

    return {
      isCompliant: allChecks,
      checks: accountabilityChecks,
      legalStatus: allChecks ? "Compliant" : "Non-compliant",
      warning: !allChecks
        ? "User must complete verification for legal accountability."
        : null,
    };
  }

  /**
   * Get privacy policy compliance score
   */
  static calculateComplianceScore(user) {
    let score = 0;

    if (user.verified) score += 25;
    if (user.documentsVerified) score += 25;
    if (user.disclaimerAccepted) score += 20;
    if (user.termsAgreed) score += 15;
    if (user.dataConsent) score += 15;

    return score;
  }
}

export default AnonymityService;
