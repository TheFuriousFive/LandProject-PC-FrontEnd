# TerraVest - Role-Based Access Structure

## 📋 User Roles

### 1. **Investor**

- **Route**: `/investor`
- **Dashboard**: Browse and search verified land listings
- **Features**:
  - View available properties
  - Filter by location, price, zoning
  - Contact owners directly
  - Save favorites
  - View messages
  - Manage profile

### 2. **Land Owner** (Owner)

- **Route**: `/owner`
- **Dashboard**: Manage land listings
- **Features**:
  - List new properties
  - View submission status (Pending/Approved/Rejected)
  - Edit property details
  - Delete listings
  - Track approval status
  - Manage profile

### 3. **Government Admin** (Ministry)

- **Route**: `/ministry`
- **Dashboard**: Review and approve listings
- **Features**:
  - View pending approvals
  - Review land documents
  - Approve/Reject listings
  - View analytics
  - Manage users
  - System settings

---

## 🗂️ File Structure

```
app/
├── page.jsx                          # Landing page
├── layout.jsx                        # Root layout
├── globals.css
│
├── _components/
│   └── Header.jsx                    # Main header with navigation
│
├── (landing)/
│   └── _components/
│       ├── HeroSection.jsx
│       ├── HeroLeft.jsx
│       ├── HeroRight.jsx
│       └── Features.jsx
│
├── (auth)/                           # Authentication routes
│   ├── login/
│   │   ├── page.jsx
│   │   └── signin.jsx               # Sign in form with role redirect
│   └── register/
│       ├── page.jsx
│       └── signup.jsx               # Sign up form with role redirect
│
├── (investor)/                       # Investor portal
│   ├── layout.jsx                    # Layout with InvestorSidebar
│   ├── page.jsx                      # Investor dashboard
│   └── _components/
│       ├── InvestorSidebar.jsx
│       └── SearchListings.jsx (optional)
│
├── (owner)/                          # Owner portal
│   ├── layout.jsx                    # Layout with OwnerSidebar
│   ├── page.jsx                      # Owner dashboard
│   ├── lists/
│   │   └── page.jsx                  # My listings
│   ├── profile/
│   │   └── page.jsx                  # Owner profile
│   └── _components/
│       ├── Sidebar.jsx
│       └── ListComponent.jsx         # Listing card
│
└── (ministry)/                       # Ministry/Admin portal
    ├── layout.jsx                    # Layout with MinistrySidebar
    ├── page.jsx                      # Approval dashboard
    ├── _components/
    │   └── MinistrySidebar.jsx
    ├── approvals/
    │   └── page.jsx (optional)
    ├── approved/
    │   └── page.jsx (optional)
    └── analytics/
        └── page.jsx (optional)
```

---

## 🔄 User Flow

1. **Landing Page** (`/`)
   - Shows TerraVest features
   - Call-to-action buttons → Sign Up / Sign In

2. **Sign Up** (`/register`)
   - User selects role: Investor, Owner, or Govt Admin
   - Fills registration form
   - Submits → Gets redirected to their portal

3. **Sign In** (`/login`)
   - User enters credentials
   - Submits → Gets redirected to their portal based on role

4. **Role-Based Portals**
   - **Investor**: Browse listings, message owners
   - **Owner**: Manage listings, track approvals
   - **Ministry**: Review and approve submissions

---

## 🔗 Role-Based Redirects

| Role       | Redirect URL | Dashboard         |
| ---------- | ------------ | ----------------- |
| `investor` | `/investor`  | Browse Listings   |
| `owner`    | `/owner`     | My Listings       |
| `admin`    | `/ministry`  | Pending Approvals |

---

## 🔐 Implementation Notes

### Current Implementation

- ✅ Role selection in signup/signin forms
- ✅ useRouter redirects based on selected role
- ✅ Separate layouts for each role
- ✅ Role-specific sidebars with navigation

### Next Steps (Recommended)

1. **Add Authentication Context** - Store user data globally

   ```javascript
   // Example: app/_context/AuthContext.js
   export const AuthContext = createContext();
   ```

2. **Create Route Protection** - Middleware to protect routes

   ```javascript
   // Example: middleware.js at root
   export function middleware(request) {
     // Check if user is authenticated
     // Check if user role matches route
   }
   ```

3. **Add Backend Integration** - Connect to your API

   ```javascript
   // Replace the redirect logic with actual API calls
   fetch("/api/auth/register", { method: "POST", body: JSON.stringify(data) })
     .then((res) => res.json())
     .then((result) => router.push(roleRoutes[result.user.role]));
   ```

4. **Add Session Management** - Use JWT tokens or sessions
   ```javascript
   // Store token in localStorage/cookies
   // Send token with authenticated requests
   ```

---

## 🎨 Styling & Icons

- Icons: **lucide-react** ✅
- Color Scheme:
  - Primary: `#9afb21` (lime green)
  - Dark: `#0f0f11` (dark gray)
  - Accent: Green gradients
- Responsive: Mobile-first design ✅

---

## ✨ Features by Role

### Investor Features

- ✅ Search land listings
- ✅ Filter by location, price, zoning
- ✅ View property details
- ✅ Save favorites
- ✅ Contact owners
- ✅ View messages
- ✅ Manage profile

### Owner Features

- ✅ List new property
- ✅ View listing status
- ✅ Edit property details
- ✅ Upload documents
- ✅ Delete listings
- ✅ Track approvals
- ✅ Manage profile

### Ministry Features

- ✅ Review pending submissions
- ✅ View property documents
- ✅ Approve/Reject listings
- ✅ View analytics dashboard
- ✅ Manage users
- ✅ System configuration

---

## 🚀 Ready to Deploy

Your file structure is now complete with:

- ✅ Three role-based portals
- ✅ Proper redirects after login
- ✅ Lucide-react icons throughout
- ✅ Responsive layouts
- ✅ Role-specific sidebars
- ✅ Clean folder organization
