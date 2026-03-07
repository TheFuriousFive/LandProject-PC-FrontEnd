import InvestorSidebar from "./_components/InvestorSidebar";

export default function InvestorLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-[#f8f9fa] font-sans text-gray-900 overflow-hidden">
      {/* Persistent Left Sidebar */}
      <InvestorSidebar />

      {/* Dynamic Main Content Area */}
      <div className="flex-1 overflow-y-auto h-screen">{children}</div>
    </div>
  );
}
