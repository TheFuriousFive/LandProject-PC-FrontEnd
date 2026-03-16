export default function InvestorProfile() {
  return (
    <main className="p-8 md:p-12 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">
          Investor Profile
        </h1>
        <p className="text-gray-500 font-medium">
          Manage your personal details, portfolio preferences, and security
          settings.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-2 uppercase tracking-wide">
                First Name
              </label>
              <input
                type="text"
                defaultValue="Jane"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-[#9afb21] focus:border-[#9afb21] px-4 py-3 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-2 uppercase tracking-wide">
                Last Name
              </label>
              <input
                type="text"
                defaultValue="Doe"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-[#9afb21] focus:border-[#9afb21] px-4 py-3 outline-none transition-colors"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-gray-700 block mb-2 uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="jane.doe@investor.com"
                disabled
                className="w-full bg-gray-100 border border-transparent text-gray-500 text-sm rounded-lg px-4 py-3 outline-none cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-2">
                Email address cannot be changed.
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-gray-700 block mb-2 uppercase tracking-wide">
                Investment Company / Affiliation
              </label>
              <input
                type="text"
                defaultValue="Terra Capital Group"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-[#9afb21] focus:border-[#9afb21] px-4 py-3 outline-none transition-colors"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-gray-700 block mb-2 uppercase tracking-wide">
                Bio / Strategy
              </label>
              <textarea
                rows={4}
                defaultValue="Focusing on high-yield agricultural land and upcoming mixed-use developments in the midwest."
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-[#9afb21] focus:border-[#9afb21] px-4 py-3 outline-none transition-colors resize-none"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button
              type="button"
              className="bg-[#0f0f11] text-[#9afb21] font-bold py-3 px-8 rounded-xl hover:bg-black transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
