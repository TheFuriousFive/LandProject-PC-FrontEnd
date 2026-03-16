"use client";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { Shield } from "lucide-react";
import Link from "next/link";

const setAuthCookie = (role, email) => {
  document.cookie = `currentUser=${JSON.stringify({ role, email })}; path=/; max-age=86400`;
};

export default function SignInPage() {
  const router = useRouter();
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "investor", // Default role
      email: "",
      password: "",
    },
  });

  // Watch the role value for styling the segmented control
  const activeRole = useWatch({ control, name: "role" });

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Sign In Data:", data);

    const actualRole = data.role === "admin" ? "ministry" : data.role;

    // Set a cookie manually for the mock authentication
    setAuthCookie(actualRole, data.email);

    // Redirect based on role
    const roleRoutes = {
      investor: "/investor",
      owner: "/owner",
      ministry: "/ministry",
    };

    router.push(roleRoutes[actualRole] || "/investor");
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Main Content Area */}
      <main className="flex-1 relative flex items-center bg-stone-100 justify-center bg-gr00 bg-cover bg-center">
        {/* Dark blurred overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

        {/* Sign In Card */}
        <div className="relative bg-white w-full max-w-[440px] rounded-t-none md:rounded-xl p-8 md:p-10 shadow-2xl z-10 my-0 md:my-8 h-full md:h-auto overflow-y-auto">
          {/* Header Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-[#0f0f11] w-14 h-14 rounded-xl flex items-center justify-center shadow-lg shadow-black/10">
              <Shield size={28} color="#9afb21" strokeWidth={2} />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-[#0a0a0a] tracking-tight mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm">Sign in to your account</p>
          </div>

          {/* Role Segmented Control */}
          <div className="bg-[#f3f4f6] rounded-xl p-1.5 flex mb-8">
            <button
              type="button"
              onClick={() => setValue("role", "investor")}
              className={`flex-1 text-sm py-2.5 rounded-lg font-semibold transition-all ${
                activeRole === "investor"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Investor
            </button>
            <button
              type="button"
              onClick={() => setValue("role", "owner")}
              className={`flex-1 text-sm py-2.5 rounded-lg font-semibold transition-all ${
                activeRole === "owner"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Owner
            </button>
            <button
              type="button"
              onClick={() => setValue("role", "admin")}
              className={`flex-1 text-sm py-2.5 rounded-lg font-semibold transition-all ${
                activeRole === "admin"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Admin
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label className="text-[12px] font-bold text-gray-700 mb-1.5 block">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full bg-[#f8f9fa] border ${
                  errors.email ? "border-red-500" : "border-gray-200"
                } text-gray-900 text-sm rounded-lg focus:ring-[#9afb21] focus:border-[#9afb21] block p-3 outline-none transition-colors`}
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[12px] font-bold text-gray-700 block">
                  Password
                </label>
                {/* Adjust href to your actual forgot password route */}
                <a
                  href="#"
                  className="text-[12px] font-semibold text-gray-500 hover:text-gray-800 transition-colors"
                >
                  Forgot?
                </a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                })}
                className={`w-full bg-[#f8f9fa] border ${
                  errors.password ? "border-red-500" : "border-gray-200"
                } text-gray-900 text-sm rounded-lg focus:ring-[#9afb21] focus:border-[#9afb21] block p-3 outline-none transition-colors`}
              />
              {errors.password && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#0f0f11] text-[#9afb21] hover:bg-black font-semibold rounded-lg text-sm px-5 py-3.5 text-center transition-colors shadow-sm mb-6"
            >
              Sign In
            </button>

            {/* Footer Link */}
            <p className="text-center text-sm text-gray-600">
              New to TerraVest?{" "}
              {/* If using Next.js routing, swap the <a> tags below for <Link href="/register"> */}
              <Link
                href="/register"
                className="font-bold text-gray-900 hover:text-black transition-colors cursor-pointer"
              >
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
