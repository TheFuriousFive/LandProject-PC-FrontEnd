
"use client";

import { useRouter } from "next/navigation";
import { XCircle, RefreshCcw } from "lucide-react";

export default function PaymentFailure() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 text-center max-w-md w-full">
        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle size={48} />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Payment Failed</h1>
        <p className="text-gray-600 mb-8">
          We couldn't process your payment. Your listing has been saved as a draft. 
          You can retry the payment whenever you are ready.
        </p>
        <button
          onClick={() => router.push("/owner/add-land")}
          className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCcw size={18} /> Try Payment Again
        </button>
      </div>
    </div>
  );
}