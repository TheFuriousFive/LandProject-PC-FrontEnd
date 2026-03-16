"use client";
import { Activity, Clock, PlusCircle, Trash, CheckCircle } from "lucide-react";
import { useListings } from "../../_components/useListings";

export default function ActivityLogs() {
  const { logs } = useListings();

  const getLogIcon = (action) => {
    switch (true) {
      case action.includes("Created"):
        return <PlusCircle size={20} className="text-blue-500" />;
      case action.includes("Approved"):
        return <CheckCircle size={20} className="text-green-500" />;
      case action.includes("Deleted"):
        return <Trash size={20} className="text-red-500" />;
      default:
        return <Activity size={20} className="text-gray-500" />;
    }
  };

  return (
    <main className="p-8 md:p-12 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">
          Activity Logs
        </h1>
        <p className="text-gray-500 font-medium text-lg">
          Track the history and status changes of all your land listings.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl p-8 relative isolate">
        {/* Timeline Line */}
        <div className="absolute left-[47px] top-12 bottom-12 w-0.5 bg-gray-100 -z-10"></div>

        <div className="space-y-8">
          {logs.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No activity recorded yet.</p>
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="flex gap-6 starting-items">
                <div className="w-12 h-12 rounded-full bg-white border-4 border-gray-50 shadow-sm flex items-center justify-center flex-shrink-0 relative z-10">
                  {getLogIcon(log.action)}
                </div>

                <div className="flex-1 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">
                      {log.action}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                      <Clock size={12} />
                      {log.date}
                    </div>
                  </div>

                  <p className="text-[#0f0f11] font-semibold mb-1">
                    {log.property}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {log.details}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
