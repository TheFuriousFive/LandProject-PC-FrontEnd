import { CheckCircle, Clock, XCircle, Eye } from "lucide-react";

export default function MinistryDashboard() {
  const pendingApprovals = [
    {
      id: 1,
      ownerName: "John Smith",
      propertyTitle: "Texas Farmland",
      location: "Austin, TX",
      acres: 50,
      submittedDate: "2024-03-01",
      documents: 8,
      status: "pending",
    },
    {
      id: 2,
      ownerName: "Sarah Johnson",
      propertyTitle: "Oregon Development",
      location: "Portland, OR",
      acres: 120,
      submittedDate: "2024-02-28",
      documents: 6,
      status: "pending",
    },
  ];

  const stats = [
    { label: "Pending Approvals", value: "12", icon: Clock, color: "orange" },
    {
      label: "Approved",
      value: "156",
      icon: CheckCircle,
      color: "green",
    },
    {
      label: "Rejected",
      value: "23",
      icon: XCircle,
      color: "red",
    },
  ];

  return (
    <main className="p-8 md:p-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          Government Admin Portal
        </h1>
        <p className="text-gray-500 font-medium text-lg">
          Review and approve land listings for marketplace verification.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 font-medium text-sm mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`bg-${stat.color}-100 p-3 rounded-xl text-${stat.color}-600`}
                >
                  <Icon size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pending Approvals Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Pending Approvals</h2>
        <div className="space-y-4">
          {pendingApprovals.map((approval) => (
            <div
              key={approval.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left Section */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {approval.propertyTitle}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>
                      <span className="font-semibold text-gray-700">
                        Owner:
                      </span>{" "}
                      {approval.ownerName}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">
                        Location:
                      </span>{" "}
                      {approval.location} • {approval.acres} acres
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">
                        Documents:
                      </span>{" "}
                      {approval.documents} files uploaded
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">
                        Submitted:
                      </span>{" "}
                      {approval.submittedDate}
                    </p>
                  </div>
                </div>

                {/* Right Section - Actions */}
                <div className="flex gap-3 flex-shrink-0">
                  <button className="flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold px-4 py-2 rounded-lg transition-colors text-sm">
                    <Eye size={16} />
                    Review
                  </button>
                  <button className="bg-green-600 text-white hover:bg-green-700 font-bold px-4 py-2 rounded-lg transition-colors text-sm">
                    Approve
                  </button>
                  <button className="bg-red-600 text-white hover:bg-red-700 font-bold px-4 py-2 rounded-lg transition-colors text-sm">
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
