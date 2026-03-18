"use client";

import { useRouter } from "next/navigation";
import LandForm from "../../_components/LandForm";

export default function AddNewLand() {
  const router = useRouter();

  const handleSuccess = () => {
    // Just handle post-submit side effects here
    const logs = JSON.parse(localStorage.getItem("owner_logs") || "[]");
    logs.unshift({
      id: Date.now(),
      action: "Submitted new listing",
      target: "New Land Listing",
      date: new Date().toISOString(),
    });
    localStorage.setItem("owner_logs", JSON.stringify(logs));

    router.push("/owner/lists");
  };

  return (
    <div className="p-8 md:p-12 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Add New Land Listing
        </h1>
        <p className="text-gray-500 font-medium">
          Provide details about your property. All submissions require Ministry
          approval.
        </p>
      </div>

      <LandForm
        mode="create"
        onSubmitSuccess={handleSuccess}
        onCancel={() => router.push("/owner/lists")}
      />
    </div>
  );
}
