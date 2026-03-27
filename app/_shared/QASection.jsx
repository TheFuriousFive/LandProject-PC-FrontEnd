import { useState, useEffect } from "react";
import { MessageSquare, Send, Reply } from "lucide-react";
import { useAuth } from "@/lib/hooks";

export default function QASection({ listingId, ownerId }) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [newQuestion, setNewQuestion] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [replyingTo, setReplyTo] = useState(null);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Questions
  const fetchQuestions = async () => {
    try {
      setLoadingQuestions(true);
      const token = (localStorage.getItem("token") || "")
        .replace(/^"|"$/g, "")
        .trim();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/listings/${listingId}/questions`,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        },
      );
      if (res.ok) {
        const data = await res.json();
        setQuestions(data || []);

        // Check if questions already have an answer, and prepopulate answers state
        const initialAnswers = {};
        data.forEach((q) => {
          if (q.answer) {
            initialAnswers[q.id] = [{ content: q.answer }];
          }
        });
        setAnswers((prev) => ({ ...prev, ...initialAnswers }));

        // Fetch answers for all questions (in case they are separated)
        data.forEach((q) => {
          if (!q.answer) {
            fetchAnswers(q.id);
          }
        });
      } else {
        console.error("Failed to fetch questions");
      }
    } catch (err) {
      console.error("Error fetching questions:", err);
    } finally {
      setLoadingQuestions(false);
    }
  };

  // Fetch Answers for a specific question
  const fetchAnswers = async (questionId) => {
    try {
      const token = (localStorage.getItem("token") || "")
        .replace(/^"|"$/g, "")
        .trim();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/questions/${questionId}/answers`,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        },
      );
      if (res.ok) {
        const data = await res.json();
        // Ensure data is treated as an array even if a single object is returned
        let answersArray = [];
        if (Array.isArray(data)) {
          answersArray = data;
        } else if (
          data &&
          typeof data === "object" &&
          Object.keys(data).length > 0 &&
          !data.error
        ) {
          if (
            data.message &&
            typeof data.message === "string" &&
            data.message.toLowerCase().includes("not found")
          ) {
            answersArray = [];
          } else {
            answersArray = [data];
          }
        } else if (typeof data === "string") {
          answersArray = [{ content: data }];
        }
        setAnswers((prev) => ({ ...prev, [questionId]: answersArray }));
      }
    } catch (err) {
      console.error("Error fetching answers for question", questionId, err);
    }
  };

  useEffect(() => {
    if (listingId) {
      fetchQuestions();
    }
  }, [listingId]);

  const handleAskQuestion = async () => {
    if (!newQuestion.trim()) return;

    setIsSubmitting(true);
    try {
      const token = (localStorage.getItem("token") || "")
        .replace(/^"|"$/g, "")
        .trim();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/landapp/investors/listings/${listingId}/questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: newQuestion.trim(),
          }),
        },
      );

      if (res.ok) {
        setNewQuestion("");
        // fetchQuestions has been handling state updates, let's keep it
        fetchQuestions();
      } else {
        alert("Failed to post question.");
      }
    } catch (err) {
      console.error("Error posting question:", err);
      alert("Error posting question.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnswerQuestion = async (questionId) => {
    if (!replyContent.trim()) return;

    setIsSubmitting(true);
    try {
      const token = (localStorage.getItem("token") || "")
        .replace(/^"|"$/g, "")
        .trim();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/landapp/owners/questions/${questionId}/answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: replyContent.trim(),
          }),
        },
      );

      if (res.ok) {
        setReplyContent("");
        setReplyTo(null);
        // Refresh both list of questions to pick up .answer if present,
        // and fetch answers individually just in case.
        fetchQuestions();
        fetchAnswers(questionId);
      } else {
        alert("Failed to post answer.");
      }
    } catch (err) {
      console.error("Error posting answer:", err);
      alert("Error posting answer.");
    } finally {
      setIsSubmitting(false);
    }
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
        {loadingQuestions ? (
          <div className="text-center py-8 text-gray-500">
            Loading questions...
          </div>
        ) : questions.length > 0 ? (
          questions.map((q) => (
            <div
              key={q.id}
              className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
            >
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-900">Question</span>
                  {q.created_at && (
                    <span className="text-xs text-gray-500">
                      {new Date(q.created_at).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <p className="text-gray-700">{q.content}</p>
              </div>

              {/* Answers */}
              {answers[q.id] && answers[q.id].length > 0 ? (
                <div className="space-y-3 mb-3">
                  {answers[q.id].map((ans, idx) => (
                    <div
                      key={ans.id || idx}
                      className="ml-8 p-4 bg-gray-50 rounded-xl border border-gray-100"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">
                          {ans.investor_id === ownerId
                            ? "Owner Reply"
                            : "Reply"}
                        </span>
                        {ans.created_at && (
                          <span className="text-xs text-gray-500">
                            {new Date(ans.created_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700">
                        {ans.content ||
                          ans.message ||
                          ans.answer ||
                          (typeof ans === "string" ? ans : "")}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="ml-8 mb-3 text-sm text-gray-500 italic">
                  No answers yet
                </div>
              )}

              {/* Reply Input for Owner */}
              {user?.role === "owner" &&
                (!answers[q.id] || answers[q.id].length === 0) && (
                  <div className="ml-8 mt-3">
                    {replyingTo === q.id ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="Write an answer..."
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                          disabled={isSubmitting}
                        />
                        <button
                          onClick={() => handleAnswerQuestion(q.id)}
                          disabled={isSubmitting || !replyContent.trim()}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "Submitting..." : "Submit"}
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
              disabled={isSubmitting}
            />
            <button
              onClick={handleAskQuestion}
              disabled={isSubmitting || !newQuestion.trim()}
              className="bg-[#9afb21] text-black hover:bg-[#8aec1b] font-bold px-6 py-3 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} /> {isSubmitting ? "Asking..." : "Ask"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
