import Link from "next/link";

function Header() {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      {/* Navigation Bar */}
      <nav className="bg-[#0f0f11] text-white px-6 py-4 flex justify-between items-center z-20 shadow-md">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight cursor-pointer hover:text-[#9afb21] transition"
        >
          Terra<span className="text-[#9afb21]">Vest</span>
        </Link>

        <div className="hidden md:flex space-x-6 text-sm items-center">
          <Link
            href="/"
            className="font-bold text-white hover:text-[#9afb21] transition"
          >
            Home
          </Link>
          <Link
            href="/services"
            className="font-bold text-white hover:text-[#9afb21] transition"
          >
            Services
          </Link>
        </div>

        <div className="flex space-x-3">
          <Link
            href="/login"
            className="border border-[#9afb21] text-[#9afb21] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#9afb21]/10 transition inline-block"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="bg-[#9afb21] text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#8aec1b] transition inline-block"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
