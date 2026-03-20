import Image from "next/image";
import Header from "./_components/Header";
import BackButton from "./_components/BackButton";
import HeroSection from "./(landing)/_components/HeroSection";
import WhyTerraVest from "./(landing)/_components/Features";
import CreateAccountPage from "./(auth)/register/signup";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#F9FAFB] pb-1 md:min-w-5xl lg:min-w-7xl">
      {/* Temporary Access Buttons */}
      <div className="sticky top-0 z-50 bg-slate-900 text-white p-4 flex gap-3 justify-center flex-wrap">
        <a
          href="/investor"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
        >
          Investor Dashboard
        </a>
        <a
          href="/owner"
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition"
        >
          Owner Dashboard
        </a>
        <a
          href="/ministry"
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
        >
          Admin Dashboard
        </a>
      </div>
      <Header />
      <div className="px-6 py-4">
        <BackButton />
      </div>
      <HeroSection />
      <WhyTerraVest />
    </div>
  );
}
