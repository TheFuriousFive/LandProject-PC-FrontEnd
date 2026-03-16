export default function InvestorMessages() {
  const conversations = [
    {
      id: 1,
      name: "John Smith (Owner)",
      subject: "Inquiry on Texas Farmland",
      lastMessage: "Yes, the soil quality report is available.",
      time: "2h ago",
      unread: true,
    },
    {
      id: 2,
      name: "Ministry Admin",
      subject: "Verification Complete",
      lastMessage: "Your investor profile has been verified successfully.",
      time: "1d ago",
      unread: false,
    },
  ];

  return (
    <main className="p-8 md:p-12 max-w-6xl mx-auto h-[calc(100vh-2rem)] flex flex-col">
      <div className="mb-6 shrink-0">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">
          Messages
        </h1>
        <p className="text-gray-500 font-medium">
          Communicate directly with property owners and ministry officials.
        </p>
      </div>

      <div className="flex-1 bg-white border border-gray-200 rounded-2xl flex overflow-hidden shadow-sm min-h-0">
        {/* Sidebar */}
        <div className="w-1/3 border-r border-gray-200 bg-gray-50 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-white">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full bg-gray-100 border border-transparent focus:border-[#9afb21] focus:bg-white text-sm rounded-lg px-4 py-2 outline-none transition-colors"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((chat) => (
              <div
                key={chat.id}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors ${chat.unread ? "bg-white" : ""}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4
                    className={`text-sm ${chat.unread ? "font-bold text-gray-900" : "font-medium text-gray-700"}`}
                  >
                    {chat.name}
                  </h4>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap">
                    {chat.time}
                  </span>
                </div>
                <p className="text-xs font-semibold text-gray-800 mb-1 truncate">
                  {chat.subject}
                </p>
                <p
                  className={`text-xs truncate ${chat.unread ? "font-medium text-gray-800" : "text-gray-500"}`}
                >
                  {chat.lastMessage}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Conversation View */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-900">John Smith (Owner)</h3>
              <p className="text-xs text-gray-500">Inquiry on Texas Farmland</p>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50/50">
            {/* Mock messages */}
            <div className="flex justify-end">
              <div className="bg-[#0f0f11] text-white p-3 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
                Hi John, is the soil quality report from last year available for
                the Texas Farmland plot?
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 text-gray-800 p-3 rounded-2xl rounded-tl-sm max-w-[80%] text-sm shadow-sm">
                Yes, the soil quality report is available. I will upload it to
                the documents section shortly.
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-gray-50 border border-gray-200 focus:border-[#9afb21] rounded-xl px-4 py-3 outline-none text-sm transition-colors"
              />
              <button className="bg-[#0f0f11] text-[#9afb21] px-6 py-3 rounded-xl font-bold hover:bg-black transition-colors shrink-0">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
