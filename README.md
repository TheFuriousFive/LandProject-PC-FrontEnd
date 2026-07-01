# 🌱 Groundwise — Land Ownership, Digitized

> A full-stack Next.js platform that digitizes the entire lifecycle of land ownership — from listing and government verification to investor acquisition.

---

## The Problem

In traditional land markets, **trust is expensive and slow.** Listings are fragmented across agencies, documents are manually reviewed, and fraud is rampant. Buyers have no reliable way to verify legality before investing.

**Groundwise fixes this.**

---

## The Solution

A unified three-tier portal where:

- 🏛️ **The Ministry** verifies and approves land listings
- 🧑‍🌾 **Land Owners** digitize and submit their properties
- 💼 **Investors** browse a marketplace of legally verified land only

No listing reaches the marketplace until the government says it's clean.

---

## ✨ Features by Role

### 🏛️ Ministry Portal (`/ministry`)
- **Pending Queue** — Review incoming listings with document previews
- **Approval Engine** — Set listing status to `Pending`, `Approved`, or `Rejected`
- **User Management** — Monitor activity and ban fraudulent actors
- **System Analytics** — View total acreage, market valuations, and platform health

### 🧑‍🌾 Owner Portal (`/owner`)
- **Submission Wizard** — Multi-step form for property metadata and PDF deed upload
- **Status Tracker** — Real-time progress indicator showing "Ministry Review" state
- **Listing Management** — Edit price/details or delete unverified listings
- **Lead Management** — Receive and respond to investor inquiries

### 💼 Investor Portal (`/investor`)
- **Verified Marketplace** — Browse only Ministry-approved listings
- **Advanced Filtering** — Filter by Zoning (Residential/Commercial), Price, and Size
- **Watchlist** — Save properties to Favorites for later review
- **Direct Contact** — Securely message owners to initiate negotiations

---

## 🏗️ System Architecture

Built on the **Next.js 15 App Router** with Route Groups for clean role isolation:

```
app/
├── (auth)/               # Authentication — Login & Register
├── (investor)/           # Investor Portal — Marketplace & Watchlist
├── (owner)/              # Owner Portal — Listings & Analytics
├── (ministry)/           # Ministry Portal — Approvals & Admin
├── _components/          # Shared UI — Header, Buttons, Modals, Sidebars
└── _lib/                 # Server Actions, Zod Schemas & Utilities
```

---

## 🗄️ Database Schema

| Table | Key Fields | Relationship |
|---|---|---|
| `Users` | `id`, `email`, `password_hash`, `role` | 1:N with Listings |
| `Land_Listings` | `id`, `owner_id`, `title`, `price`, `area` | M:1 with User |
| `Verification` | `id`, `listing_id`, `status` (P/A/R), `reviewer_id` | 1:1 with Listing |
| `Documents` | `id`, `listing_id`, `document_url` | 1:1 with Listing |

---

## 🔐 Security & Validation

- **Route Protection** — Middleware enforces that session role matches the requested path (e.g. only `admin` can access `/ministry`)
- **Data Integrity** — Zod schemas validate land prices (non-negative) and document uploads (PDF only)
- **Role-Based Redirection** — On login, users are automatically routed to their portal:

```js
const handleRedirect = (userRole) => {
  const routes = {
    investor: '/investor',
    owner: '/owner',
    admin: '/ministry'
  };
  router.push(routes[userRole] || '/');
};
```

- **Environment Security** — All API keys and database credentials are stored in `.env.local`, never committed
- **Optimistic Updates** — `useOptimistic` hook provides instant UI feedback on owner actions like deleting a listing

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI | React, Tailwind CSS |
| Icons | Lucide React |
| Validation | Zod |
| Auth | Clerk |
| Database | PostgreSQL (via `DATABASE_URL`) |

**Theme Colors:**
- 🟢 Primary: `#9afb21` (Lime) — Growth & Land
- ⚫ Dark: `#0f0f11` (Obsidian) — Professionalism

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/TheFuriousFive
cd groundwise
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
DATABASE_URL=your_database_connection_string
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 👨‍💻 Team

**Project:** Groundwise Land Management System
**Course:** CS1040 Semester Project

| Index | Name | Role |
|---|---|---|
| 240575F | Rubasingha S.T. (Selith) | |
| 240370X | Kumarasiri I.D.N. (Nethmika) | |
| 240271U | Jayasekara J.P.D.N.R. (Nadun) | |
| 240297E | Jayawardhana J.A.R.P. (Rashmi) | |
| 240567H | Rathnayake S.U. (Shanuka) | |

---

*Built with Next.js 15 · React · Tailwind CSS · Lucide Icons*
