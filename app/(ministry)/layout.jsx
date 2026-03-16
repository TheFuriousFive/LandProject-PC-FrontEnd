import MinistrySidebar from "./_components/MinistrySidebar";
import { MinistryProvider } from "./_components/MinistryProvider";

export default function MinistryLayout({ children }) {
  return (
    <MinistryProvider>
      <div className="min-h-screen flex bg-[#f8f9fa] font-sans text-gray-900 overflow-hidden">
        {/* Persistent Left Sidebar */}
        <MinistrySidebar />

        {/* Dynamic Main Content Area */}
        <div className="flex-1 overflow-y-auto h-screen">{children}</div>
      </div>
    </MinistryProvider>
  );
}
