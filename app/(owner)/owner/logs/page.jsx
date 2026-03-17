"use client";

import { useEffect, useState } from "react";
import { Clock, CheckCircle2, XCircle, FilePlus, Trash2 } from "lucide-react";

export default function OwnerLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetch logs from Mock DB
    const savedLogs = JSON.parse(localStorage.getItem("owner_logs") || "[]");

    if (savedLogs.length === 0) {
      // Provide some initial dummy logs if empty so it doesn't look totally blank initially
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLogs([
        {
          id: 1,
          action: "Approved by Ministry",
          target: "Sample Agricultural Plot",
          date: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: 2,
          action: "Submitted new listing",
          target: "Sample Agricultural Plot",
          date: new Date(Date.now() - 172800000).toISOString(),
        },
        {
          id: 3,
          action: "Account verified",
          target: "Owner Profile",
          date: new Date(Date.now() - 259200000).toISOString(),
        },
      ]);
    } else {
      setLogs(savedLogs);
    }
  }, []);

  const getIconForAction = (action) => {
    if (action.includes("Submitted"))
      return <FilePlus size={20} className="text-blue-500" />;
    if (action.includes("Approved"))
      return <CheckCircle2 size={20} className="text-green-500" />;
    if (action.includes("Rejected"))
      return <XCircle size={20} className="text-red-500" />;
    if (action.includes("Deleted"))
      return <Trash2 size={20} className="text-gray-500" />;
    return <Clock size={20} className="text-gray-500" />;
  };

  const formatDate = (isoString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    };
    return new Date(isoString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="p-8 md:p-12 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Activity Logs
        </h1>
        <p className="text-gray-500 font-medium">
          Keep track of your listing status changes and account activities.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-6 md:p-8">
        {logs.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500">No activity recorded yet.</p>
          </div>
        ) : (
          <div className="relative border-l-2 border-gray-100 ml-4 space-y-8 pb-4">
            {logs.map((log) => (
              <div key={log.id} className="relative pl-8">
                {/* Timeline Dot */}
                <div className="absolute -left-[17px] top-1 bg-white p-1 rounded-full border-2 border-gray-100">
                  {getIconForAction(log.action)}
                </div>

                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">
                      {log.action}
                    </h3>
                    <span className="text-xs font-bold text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                      {formatDate(log.date)}
                    </span>
                  </div>
                  <p className="text-gray-600">
                    <span className="font-medium">Target:</span> {log.target}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
