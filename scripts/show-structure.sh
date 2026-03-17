#!/bin/bash
# Quick script to visualize your app structure
# Save as: scripts/show-structure.sh

echo "
╔══════════════════════════════════════════════════════════════╗
║          TerraVest - Role-Based Project Structure           ║
╚══════════════════════════════════════════════════════════════╝

📱 PUBLIC PAGES
├─ / (Landing Page)
│  └─ Components: Header, HeroSection, Features
│
└─ /(landing) - Featured sections

🔐 AUTHENTICATION
├─ /(auth)/login - Sign In Page
│  └─ signin.jsx → Redirect to /investor, /owner, or /ministry
│
└─ /(auth)/register - Sign Up Page
   └─ signup.jsx → Redirect based on selected role

👨‍💼 INVESTOR PORTAL
├─ /investor - Dashboard (Browse Listings)
│  ├─ /(investor)/browse
│  ├─ /(investor)/favorites
│  ├─ /(investor)/messages
│  ├─ /(investor)/profile
│  └─ Components: InvestorSidebar, SearchListings
│
└─ Protected Routes: ✅ Implemented

🏘️ OWNER PORTAL  
├─ /owner - Dashboard (My Listings)
│  ├─ /(owner)/lists
│  ├─ /(owner)/profile
│  └─ Components: Sidebar, ListComponent
│
└─ Protected Routes: ✅ Implemented

🏛️ MINISTRY PORTAL
├─ /ministry - Dashboard (Approvals)
│  ├─ /(ministry)/approvals
│  ├─ /(ministry)/approved
│  ├─ /(ministry)/analytics
│  ├─ /(ministry)/users
│  ├─ /(ministry)/settings
│  └─ Components: MinistrySidebar
│
└─ Protected Routes: ✅ Implemented

═══════════════════════════════════════════════════════════════

✅ ROLE-BASED REDIRECT LOGIC
├─ investor  → /investor/dashboard
├─ owner     → /owner/listings
└─ admin     → /ministry/approvals

═══════════════════════════════════════════════════════════════

🎨 DESIGN SYSTEM
├─ Colors: 
│  ├─ Primary: #9afb21 (lime green)
│  ├─ Dark: #0f0f11 (charcoal)
│  └─ Backgrounds: #f8f9fa, #f3f4f6
│
├─ Icons: lucide-react ✅
├─ Forms: react-hook-form ✅
├─ Animations: framer-motion ✅
└─ Styling: tailwindcss ✅

═══════════════════════════════════════════════════════════════
"

tree -L 3 --dirsfirst -I 'node_modules'
