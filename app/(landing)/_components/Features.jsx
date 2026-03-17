import { Landmark, TrendingUp, Shield } from "lucide-react";

export default function TerraVestFeatures() {
  const features = [
    {
      title: "Verified Listings",
      description:
        "Every parcel of land goes through a rigorous government admin approval process before it reaches our marketplace. Zero fraud, full transparency.",
      icon: <Landmark size={26} className="text-green-500" />,
    },
    {
      title: "Smart Investments",
      description:
        "Filter by zoning, acreage, and price. Connect directly with owners to negotiate the best possible terms without expensive middlemen.",
      icon: <TrendingUp size={26} className="text-green-500" />,
    },
    {
      title: "Secure Transactions",
      description:
        "Upload legal documents securely. Our platform ensures all documentation is properly managed, reviewed, and stored immutably.",
      icon: <Shield size={26} className="text-green-500" />,
    },
  ];

  return (
    <section className="bg-white py-20 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0a0a0a] tracking-tight mb-4">
            Why TerraVest?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We&apos;ve built a robust ecosystem that serves investors, land
            owners, and regulatory bodies securely.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#f8f9fa] border border-gray-200/80 rounded-3xl p-8 md:p-10 transition-shadow hover:shadow-md"
            >
              {/* Icon Container */}
              <div className="bg-[#0f0f11] w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                {feature.icon}
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
