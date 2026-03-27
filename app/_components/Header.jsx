"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Define the nav items for easy management
const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
];

function Header() {
  const pathname = usePathname();

  // Custom Neon Green color used in the image
  const limeGreen = "rgb(156 255 31)"; // Approximate tailwind: lime-300

  return (
    // Dark background header, full width
    <header className="bg-[#000000] text-white w-full">
      {/* Container with padding and flex alignment to match the image spacing */}
      <nav className="px-12 py-5 flex justify-between items-center max-w-[1920px] mx-auto">
        
        {/* Logo - Matching 'Terra' (White) 'Vest' (Green) */}
        <div className="text-2xl font-bold flex items-center">
          <Link href="/" className="flex">
            <span>Ground</span>
            <span style={{ color: limeGreen }}>wise</span>
          </Link>
        </div>

        {/* Central Navigation - Centered text and links */}
        <div className="flex-1 flex justify-center space-x-12">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base transition ${
                  isActive 
                    ? "font-semibold text-white"  // Home and Services are white/bold in image
                    : "text-gray-400 font-medium"  // Demos are grayish/dimmer
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Action Buttons - Distinct Styles */}
        <div className="flex space-x-6">
          {/* Sign In - Outlined Button */}
          <Link
            href="/login"
            style={{ 
                borderColor: limeGreen, 
                color: limeGreen 
            }}
            className="border-2 rounded-[14px] px-8 py-3 text-base font-bold transition hover:bg-black/20"
          >
            Sign In
          </Link>
          
          {/* Sign Up - Solid Green Button */}
          <Link
            href="/register"
            style={{ 
                backgroundColor: limeGreen, 
                color: '#000000' // Black text on green
            }}
            className="rounded-[14px] px-8 py-3 text-base font-bold transition hover:brightness-95"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;