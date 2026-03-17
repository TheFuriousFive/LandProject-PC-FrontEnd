export const metadata = {
  title: "Messages | Investor Portal",
};

import { Search, Send, CheckCircle2 } from "lucide-react";

export default function InvestorMessages() {
  const conversations = [
    {
      id: 1,
      name: "Ministry of Lands",
      subject: "Verification Request - PID 8932",
      date: "10:42 AM",
      unread: true,
      lastMessage:
        "Your verification request is currently under review by our agents.",
    },
    {
      id: 2,
      name: "John Doe (Owner)",
      subject: "Inquiry: Iowa Farm Land",
      date: "Yesterday",
      unread: false,
      lastMessage:
        "Yes, the soil quality report from 2023 is available. I'll send it over shortly.",
    },
    {
      id: 3,
      name: "Alice Smith (Owner)",
      subject: "Offer Update",
      date: "Mar 12",
      unread: false,
      lastMessage:
        "I've received the draft contract. My lawyer is reviewing it.",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 flex-col md:flex-row absolute inset-0 md:static">
      {/* Sidebar / Conversation List */}
      <div className="w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 flex flex-col h-full shrink-0">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-4">
            Messages
          </h1>
          <div className="relative">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg pl-10 pr-4 py-2 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                conv.id === 2
                  ? "bg-[#f4fce8] border-l-4 border-l-[#9afb21]"
                  : "border-l-4 border-l-transparent"
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <h3
                  className={`font-bold text-sm ${conv.unread ? "text-gray-900" : "text-gray-700"}`}
                >
                  {conv.name}
                </h3>
                <span className="text-xs text-gray-500 font-medium">
                  {conv.date}
                </span>
              </div>
              <p className="text-xs font-semibold text-gray-900 mb-1">
                {conv.subject}
              </p>
              <p
                className={`text-sm tracking-tight line-clamp-1 ${conv.unread ? "text-gray-900 font-medium" : "text-gray-500"}`}
              >
                {conv.lastMessage}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full bg-white hidden md:flex">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              John Doe (Owner)
            </h2>
            <p className="text-sm text-gray-500 font-medium">
              Inquiry: Iowa Farm Land
            </p>
          </div>
          <div className="flex items-center text-sm font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">
            <CheckCircle2 size={16} className="mr-1.5" /> Verified User
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
          <div className="flex justify-center">
            <span className="text-xs font-bold text-gray-400 bg-white px-3 py-1 rounded-full shadow-sm">
              Yesterday
            </span>
          </div>

          <div className="flex justify-end">
            <div className="bg-[#0f0f11] text-white rounded-2xl rounded-tr-none px-5 py-3 max-w-md">
              <p className="text-sm">
                Hi John, I&apos;m very interested in the 320 acre plot. Can you
                provide the soil quality report from last year?
              </p>
              <span className="text-[10px] text-gray-400 mt-1 block text-right">
                09:12 AM
              </span>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 text-gray-900 rounded-2xl rounded-tl-none px-5 py-3 max-w-md shadow-sm">
              <p className="text-sm">
                Hello! Thanks for your interest. Yes, the soil quality report
                from 2023 is available. I&apos;ll send it over shortly.
              </p>
              <span className="text-[10px] text-gray-400 mt-1 block">
                09:45 AM
              </span>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-end space-x-2">
            <textarea
              className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 min-h-[50px] max-h-32 resize-none focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors"
              placeholder="Type your message..."
              rows={1}
            ></textarea>
            <button className="bg-[#9afb21] text-[#0f0f11] p-3 rounded-xl hover:bg-[#8bed1c] transition-colors shrink-0">
              <Send size={20} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
