"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie =
      "currentUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    //   This line deletes a cookie named currentUser.

    // How it works:

    // currentUser= → sets the cookie value to empty

    // expires=Thu, 01 Jan 1970 → sets the expiration date in the past

    // Browsers automatically remove cookies that are already expired

    // path=/ → ensures the cookie is deleted for the whole site

    // So effectively this line means:

    // Remove the cookie that stores the logged-in user information.

    // If your website stores login info like:

    // currentUser = investor123

    // this line erases it, meaning the user is no longer authenticated.
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center space-x-3 text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-3 rounded-xl font-semibold transition-all w-full text-left"
    >
      <LogOut size={20} />
      <span className="text-sm">Log Out</span>
    </button>
  );
}
