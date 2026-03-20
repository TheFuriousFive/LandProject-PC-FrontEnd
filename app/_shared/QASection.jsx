import { useState } from "react";
import { MessageSquare, Send, Reply } from "lucide-react";
import { useAuth } from "@/lib/hooks";

export default function QASection({ questions = [], listingId, ownerId }) {
  const { user } = useAuth();
  const [newQuestion, setNewQuestion] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [replyingTo, setReplyTo] = useState(null);

  // You can hook these up to the backend fetch API
  const handleAskQuestion = async () => {
    if (!newQuestion.trim()) return;

    // Replace with real API call
    console.log(`Asking question for listing ${listingId}:`, newQuestion);

    // Reset state
    setNewQuestion("");
  };

  const handleAnswerQuestion = async (questionId) => {
    if (!replyContent.trim()) return;

    // Replace with real API call
    console.log(`Answering question ${questionId}:`, replyContent);

    // Reset state
    setReplyContent("");
    setReplyTo(null);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="text-gray-700" />
        <h2 className="text-2xl font-bold text-gray-900">
          Questions & Answers
        </h2>
      </div>

      {/* Q&A List */}
      <div className="space-y-6 mb-8">
        {questions.length > 0 ? (
          questions.map((q) => (
            <div
              key={q.id}
              className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
            >
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-900">
                    {q.investorName || "Investor"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(q.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{q.content}</p>
              </div>

              {/* Existing Answer */}
              {q.answer ? (
                <div className="ml-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">
                      Owner Reply
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(q.answerDate).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{q.answer}</p>
                </div>
              ) : (
                /* Reply Input for Owner */
                user?.role === "owner" &&
                user?.id === ownerId && (
                  <div className="ml-8 mt-3">
                    {replyingTo === q.id ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="Type your answer..."
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                        />
                        <button
                          onClick={() => handleAnswerQuestion(q.id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                        >
                          Submit
                        </button>
                        <button
                          onClick={() => setReplyTo(null)}
                          className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setReplyTo(q.id)}
                        className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        <Reply size={16} /> Reply to question
                      </button>
                    )}
                  </div>
                )
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No questions asked yet. Be the first to ask!
            </p>
          </div>
        )}
      </div>

      {/* Ask Question Form - For Investors */}
      {user?.role === "investor" && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-bold text-gray-900 mb-3">
            Have a question about this property?
          </h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Ask the owner a question..."
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#9afb21] focus:border-transparent"
            />
            <button
              onClick={handleAskQuestion}
              className="bg-[#9afb21] text-black hover:bg-[#8aec1b] font-bold px-6 py-3 rounded-xl transition-colors flex items-center gap-2"
            >
              <Send size={18} /> Ask
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
