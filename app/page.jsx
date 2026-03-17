import Image from "next/image";
import Header from "./_components/Header";
import HeroSection from "./(landing)/_components/HeroSection";
import WhyTerraVest from "./(landing)/_components/Features";
import CreateAccountPage from "./(auth)/register/signup";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#F9FAFB] pb-1 md:min-w-5xl lg:min-w-7xl">
      <Header />
      <HeroSection />
      <WhyTerraVest />
    </div>
  );
}
