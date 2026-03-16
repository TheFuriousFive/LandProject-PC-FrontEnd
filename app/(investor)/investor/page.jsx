import { TrendingUp, FileText, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function InvestorDashboard() {
  const stats = [
    {
      label: "Active Investments",
      value: "3",
      icon: TrendingUp,
      color: "text-blue-600 bg-blue-100",
    },
    {
      label: "Saved Listings",
      value: "12",
      icon: FileText,
      color: "text-purple-600 bg-purple-100",
    },
    {
      label: "Approved Offers",
      value: "1",
      icon: CheckCircle,
      color: "text-green-600 bg-green-100",
    },
    {
      label: "Pending Checks",
      value: "2",
      icon: Clock,
      color: "text-orange-600 bg-orange-100",
    },
  ];

  const recentListings = [
    {
      id: 1,
      title: "Premium Agricultural Land",
      location: "Iowa",
      price: "$1.2M",
      imageUrl:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Development Ready Plot",
      location: "Texas",
      price: "$850K",
      imageUrl:
        "https://images.unsplash.com/photo-1492617519907-e0f71f7c76fc?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <main className="p-8 md:p-12 max-w-6xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">
          Investor Dashboard
        </h1>
        <p className="text-gray-500 font-medium">
          Welcome back. Here is the overview of your investments and activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="text-gray-500 font-medium text-sm">
                  {stat.label}
                </p>
                <div className="text-3xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </div>
              </div>
              <div className={`p-4 rounded-xl ${stat.color}`}>
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Opportunities snippet */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Recent Opportunities</h2>
          <Link
            href="/investor/browse"
            className="text-sm font-semibold text-[#9afb21] hover:text-[#7ed01c] underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentListings.map((land) => (
            <Link
              key={land.id}
              href={`/property/${land.id}`}
              className="group relative rounded-xl overflow-hidden border border-gray-200 block"
            >
              <div className="h-48 relative overflow-hidden bg-gray-100">
                <Image
                  src={land.imageUrl}
                  alt={land.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {land.title}
                  </h3>
                  <div className="bg-[#9afb21]/20 text-[#548a12] px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                    {land.price}
                  </div>
                </div>
                <p className="text-gray-500 text-sm">{land.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
