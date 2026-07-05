
"use client";

import { useRouter } from "next/navigation";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function PaymentSuccess() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 text-center max-w-md w-full">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={48} />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your payment. Your land listing has been submitted and is now under Ministry review. 
          You can track the verification status in your dashboard.
        </p>
        <button
          onClick={() => router.push("/owner/lists")}
          className="w-full bg-[#0f0f11] text-[#9afb21] py-4 rounded-xl font-bold hover:bg-black transition-colors flex items-center justify-center gap-2"
        >
          Go to My Listings <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}