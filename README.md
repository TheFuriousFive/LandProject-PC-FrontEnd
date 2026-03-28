Groundwise is a full-stack Next.js application designed to digitize the lifecycle of land ownership, from initial listing and government verification to investor acquisition. By implementing a strict Three-Tier Role-Based Access Control (RBAC) system, the platform ensures that only legally verified properties reach the marketplace, eliminating fraud and manual bottlenecks.

       ->Table of Contents
Project Vision
System Architecture
User Roles & Features
Database Schema
Technical Implementation
Security & Validation
Installation & Setup


->Project Vision

In traditional land markets, "Trust" is expensive and slow. Groundwise digitizes this trust.
Problem: Fragmented data, fraudulent listings, and slow manual government approvals.
Solution: A unified portal where the Ministry acts as the validator, Owners act as the suppliers, and Investors act as the verified consumers.

 ->System Architecture

1. Folder Structure (Next.js App Router)The project utilizes Route Groups () to isolate layouts and Private Folders _ for internal logic.Plaintextapp/
├── (auth)/                # Authentication Group
│   ├── login/             # Role-based login logic
│   └── register/          # Role selection & signup
├── (investor)/            # Investor Portal (Marketplace)
│   ├── layout.jsx         # Sidebar: Search, Favorites, Messages
│   └── page.jsx           # Grid of "Approved" listings only
├── (owner)/               # Owner Portal (Inventory)
│   ├── layout.jsx         # Sidebar: My Listings, Add New, Analytics
│   ├── lists/             # CRUD management for personal land
│   └── page.jsx           # Dashboard: Approval status tracking
├── (ministry)/            # Government Portal (Regulator)
│   ├── layout.jsx         # Sidebar: Pending Queue, System Logs
│   ├── approvals/         # Document verification interface
│   └── page.jsx           # Admin Analytics (Market health)
├── _components/           # Atomic UI Components
│   ├── Header.jsx         # Global Navigation
│   ├── Shared/            # Buttons, Inputs, Modals
│   └── Layouts/           # Role-specific Sidebars
└── _lib/                  # Server actions, Zod schemas, & Utils

 ->User Roles & Features

1. Ministry (The Regulator)
Route: /ministry
Core Task: Verify the legality of land documents.
Features:
    Pending Queue: Review incoming listings with document previews.
    Approval Engine: Toggle status between Pending, Approved, or Rejected.
    User Management: Monitor platform activity and ban fraudulent actors.
    System Analytics: View total acreage and market valuation.

2. Land Owner (The Seller)
Route: /owner
Core Task: Digitize land assets for sale.
Features:
    Submission Wizard: Multi-step form for property metadata and PDF deeds.
    Status Tracker: Real-time progress bars showing "Ministry Review" status.
    Listing Management: Edit price/details or delete unverified listings.
    Lead Management: Receive inquiries from interested investors.

3. Investor (The Buyer)
Route: /investor
Core Task: Secure land acquisition.
Features:
    Verified Marketplace: View a curated feed of only Ministry-approved land.
    Advanced Filtering: Sort by Zoning (Residential/Commercial), Price, and Size.
    Watchlist: Save properties to a "Favorites" list for later review.
    Direct Contact: Securely message owners to initiate negotiations.

->Database Schema

Table                   Key Fields                                  Relationship
Users            id, email, password_hash, role (Enum)             1:N with Listings
Land_Listings    id, owner_id, title, description, price, area     M:1 with User
Verification     id, listing_id, status (P/A/R), reviewer_id       1:1 with Listing
Documents        id, listing_id, document_url (PDF/Image)          1:1 with Listing

->Technical Implementation

1.Role-Based Redirection
When a user logs in, the signin.jsx component executes a dynamic redirect based on the authenticated user's role:
JavaScriptconst handleRedirect = (userRole) => {
  const routes = {
    investor: '/investor',
    owner: '/owner',
    admin: '/ministry'
  };
  router.push(routes[userRole] || '/');
};

->UI/UX Standards

1.Styling: Tailwind CSS for high-performance, utility-first styling.
2.Icons: lucide-react for consistent, accessible iconography.
3.Theming:Primary:#9afb21 (Lime) — Growth & Land.Dark:#0f0f11 (Obsidian) — Professionalism.

->Security & Validation

1.Route Protection: Middleware intercepts requests to /ministry or /owner to ensure the session role matches the path.
2.Data Integrity: Using Zod to validate land prices (non-negative) and document types (PDF only).
3.Environment Security: Sensitive API keys and Database URLs are stored in .env.local.
4.Optimistic Updates: Using React's useOptimistic hook to provide instant feedback when an owner deletes a listing.

-> Installation & Setup
1.Clone the ProjectBashgit clone https://github.com/TheFuriousFive
2.Install Dependencies
Bash
npm install
3.Configure Environment
Create a .env.local file:
4.Code snippet
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
DATABASE_URL=...
5.Run Development Server
Bash
npm run dev

-> Academic Credentials
Project: Groundvest Land Management 
SystemCourse: CS1040 semester project
Technology: Next.js 15, React, Tailwind CSS, Lucide Icons.
Team members:
▪ Index: 240575F | Name: RUBASINGHA.S.T (Selith) 
▪ Index: 240370X | Name: KUMARASIRI I.D.N. (Nethmika) 
▪ Index: 240271U| Name: JAYASEKARA J. P. D. N. R (Nadun) 
▪ Index: 240297E| Name: JAYAWARDHANA J.A.R.P (Rashmi)
▪ Index: 240567H | Name: RATHNAYAKE S.U (Shanuka)
