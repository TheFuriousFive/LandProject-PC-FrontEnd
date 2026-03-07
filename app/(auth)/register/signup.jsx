"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Building2, Landmark, Shield } from "lucide-react";

export default function CreateAccountPage() {
  const router = useRouter();
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "investor", // Sets the default role
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  // Watch the role value so we can style the active button accordingly
  const activeRole = watch("role");

  // This function runs when the form is successfully submitted
  const onSubmit = (data) => {
    console.log("Data ready to send to database:", data);

    // Redirect based on role
    const roleRoutes = {
      investor: "/investor",
      owner: "/owner",
      admin: "/ministry",
    };

    // Simulate API call - replace with actual backend call
    // fetch('/api/auth/register', { method: 'POST', body: JSON.stringify(data) })
    //   .then(res => res.json())
    //   .then(result => {
    //     if (result.success) {
    //       router.push(roleRoutes[data.role]);
    //     }
    //   })

    // For now, redirect immediately
    router.push(roleRoutes[data.role] || "/investor");
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Main Content Area */}
      <main className="flex-1 relative flex items-center bg-stone-100 justify-center bg-gr00 bg-cover bg-center">
        {/* Dark blurred overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

        {/* Registration Card */}
        <div className="relative bg-white w-full max-w-[540px] rounded-t-none md:rounded-xl p-8 md:p-12 shadow-2xl z-10 my-0 md:my-8 h-full md:h-auto overflow-y-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0a0a0a] tracking-tight mb-2">
              Create an Account
            </h1>
            <p className="text-gray-500">Join TerraVest today</p>
          </div>

          <div className="mb-6">
            <label className="text-[11px] font-bold text-gray-800 tracking-wider uppercase mb-3 block">
              Select Your Role
            </label>

            <div className="grid grid-cols-3 gap-3">
              {/* Investor Role */}
              <button
                type="button"
                onClick={() => setValue("role", "investor")}
                className={`flex flex-col items-center justify-center py-5 rounded-xl transition-all ${
                  activeRole === "investor"
                    ? "bg-[#0f0f11] border-2 border-[#9afb21] shadow-[0_0_20px_rgba(154,251,33,0.15)]"
                    : "bg-white border border-gray-200 hover:border-gray-300"
                }`}
              >
                <Building2
                  size={28}
                  color={activeRole === "investor" ? "#9afb21" : "#6b7280"}
                  strokeWidth={1.5}
                />
                <span
                  className={`text-sm mt-3 font-semibold ${activeRole === "investor" ? "text-white" : "text-gray-700"}`}
                >
                  Investor
                </span>
              </button>

              {/* Land Owner Role */}
              <button
                type="button"
                onClick={() => setValue("role", "owner")}
                className={`flex flex-col items-center justify-center py-5 rounded-xl transition-all ${
                  activeRole === "owner"
                    ? "bg-[#0f0f11] border-2 border-[#9afb21] shadow-[0_0_20px_rgba(154,251,33,0.15)]"
                    : "bg-white border border-gray-200 hover:border-gray-300"
                }`}
              >
                <Landmark
                  size={28}
                  color={activeRole === "owner" ? "#9afb21" : "#6b7280"}
                  strokeWidth={1.5}
                />
                <span
                  className={`text-sm mt-3 font-semibold ${activeRole === "owner" ? "text-white" : "text-gray-700"}`}
                >
                  Land Owner
                </span>
              </button>

              {/* Govt Admin Role */}
              <button
                type="button"
                onClick={() => setValue("role", "admin")}
                className={`flex flex-col items-center justify-center py-5 rounded-xl transition-all ${
                  activeRole === "admin"
                    ? "bg-[#0f0f11] border-2 border-[#9afb21] shadow-[0_0_20px_rgba(154,251,33,0.15)]"
                    : "bg-white border border-gray-200 hover:border-gray-300"
                }`}
              >
                <Shield
                  size={28}
                  color={activeRole === "admin" ? "#9afb21" : "#6b7280"}
                  strokeWidth={1.5}
                />
                <span
                  className={`text-sm mt-3 font-semibold ${activeRole === "admin" ? "text-white" : "text-gray-700"}`}
                >
                  Govt Admin
                </span>
              </button>
            </div>
          </div>

          {/* Form mapped to handleSubmit */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-[12px] font-bold text-gray-700 mb-1.5 block">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  className={`w-full bg-[#f8f9fa] border ${errors.firstName ? "border-red-500" : "border-gray-200"} text-gray-900 text-sm rounded-lg focus:ring-[#9afb21] focus:border-[#9afb21] block p-3 outline-none transition-colors`}
                />
                {errors.firstName && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div>
                <label className="text-[12px] font-bold text-gray-700 mb-1.5 block">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  className={`w-full bg-[#f8f9fa] border ${errors.lastName ? "border-red-500" : "border-gray-200"} text-gray-900 text-sm rounded-lg focus:ring-[#9afb21] focus:border-[#9afb21] block p-3 outline-none transition-colors`}
                />
                {errors.lastName && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-4">
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
                className={`w-full bg-[#f8f9fa] border ${errors.email ? "border-red-500" : "border-gray-200"} text-gray-900 text-sm rounded-lg focus:ring-[#9afb21] focus:border-[#9afb21] block p-3 outline-none transition-colors`}
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="mb-8">
              <label className="text-[12px] font-bold text-gray-700 mb-1.5 block">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className={`w-full bg-[#f8f9fa] border ${errors.password ? "border-red-500" : "border-gray-200"} text-gray-900 text-sm rounded-lg focus:ring-[#9afb21] focus:border-[#9afb21] block p-3 outline-none transition-colors`}
              />
              {errors.password && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-[#0f0f11] text-[#9afb21] hover:bg-black font-semibold rounded-lg text-sm px-5 py-3.5 text-center transition-colors shadow-sm"
            >
              Create {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}{" "}
              Account
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
