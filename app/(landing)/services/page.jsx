import Header from "../../_components/Header";
import {
  MapPin,
  Layers,
  ShieldCheck,
  Users,
  FileText,
  TrendingUp,
} from "lucide-react";

const services = [
  {
    title: "Land Listing & Management",
    description:
      "Easily create, update, and manage land listings with rich details, photos, and geospatial coordinates.",
    icon: MapPin,
    highlight: "Create listings in minutes",
  },
  {
    title: "Investor Matching & Discovery",
    description:
      "Connect with verified investors who match your land profile and investment goals.",
    icon: Users,
    highlight: "Grow your opportunities",
  },
  {
    title: "Regulatory Compliance & Approval",
    description:
      "Streamline document submission and track ministry approvals with built-in workflows and status tracking.",
    icon: ShieldCheck,
    highlight: "Stay compliant, stay confident",
  },
  {
    title: "Hazard & Geospatial Insights",
    description:
      "View layered hazard maps, soil data, and access details to make smarter investment decisions.",
    icon: Layers,
    highlight: "Invest with clarity",
  },
  {
    title: "Trust Score & Reputation",
    description:
      "Build trust with buyers by displaying verified credentials, ratings, and transaction history.",
    icon: TrendingUp,
    highlight: "Showcase credibility",
  },
  {
    title: "Secure Document Vault",
    description:
      "Upload and store essential legal documents securely for quick verification and auditing.",
    icon: FileText,
    highlight: "Documents at your fingertips",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <header className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Our Services
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Groundwise helps land owners, investors, and regulators collaborate through a single platform.
            Get your property listed, connect with buyers, and move through approvals faster.
          </p>
        </header>

        <section className="grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.title}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-lg"
            >
              <span className="inline-flex items-center justify-center rounded-full bg-[#9afb21]/10 p-4 text-[#0f0f11]">
                <service.icon className="h-6 w-6" />
              </span>
              <h2 className="mt-6 text-xl font-semibold text-gray-900">
                {service.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {service.description}
              </p>
              <p className="mt-4 text-sm font-semibold text-[#0f0f11]">
                {service.highlight}
              </p>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent opacity-0 transition group-hover:opacity-100" />
            </article>
          ))}
        </section>

        <section className="mt-16 rounded-2xl bg-gradient-to-br from-[#0f0f11] via-[#152023] to-[#1f3238] px-8 py-12 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold">Ready to get started?</h2>
            <p className="mt-4 text-gray-200 leading-relaxed">
              List your land, upload documents, and connect with buyers all in one place.
              When you're ready, create an account and start growing your land portfolio.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}