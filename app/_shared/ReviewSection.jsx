"use client";

import { useMemo, useState } from "react";
import ReviewCard from "./ReviewCard";
import { Star } from "lucide-react";

export default function ReviewSection({
  reviews = [],
  avgRating = 0,
  totalReviews = 0,
}) {
  const [activeTab, setActiveTab] = useState("reviews");
  const [localReviews, setLocalReviews] = useState(reviews);
  const [reviewForm, setReviewForm] = useState({
    author: "",
    rating: 5,
    comment: "",
  });

  const computedAvgRating = useMemo(() => {
    if (localReviews.length === 0) return avgRating || 0;
    return (
      localReviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) /
      localReviews.length
    );
  }, [localReviews, avgRating]);

  const computedTotalReviews = localReviews.length || totalReviews;

  const ratingDistribution = [
    { stars: 5, count: localReviews.filter((r) => Number(r.rating) === 5).length },
    { stars: 4, count: localReviews.filter((r) => Number(r.rating) === 4).length },
    { stars: 3, count: localReviews.filter((r) => Number(r.rating) === 3).length },
    { stars: 2, count: localReviews.filter((r) => Number(r.rating) === 2).length },
    { stars: 1, count: localReviews.filter((r) => Number(r.rating) === 1).length },
  ];

  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!reviewForm.author.trim() || !reviewForm.comment.trim()) {
      alert("Please provide your name and review comment.");
      return;
    }

    const newReview = {
      id: `local-review-${Date.now()}`,
      author: reviewForm.author.trim(),
      rating: Number(reviewForm.rating),
      date: new Date().toISOString(),
      comment: reviewForm.comment.trim(),
      aspects: [
        `Honesty: ${Number(reviewForm.rating)}/5`,
        `Transaction speed: ${Number(reviewForm.rating)}/5`,
      ],
    };

    setLocalReviews((prev) => [newReview, ...prev]);
    setReviewForm({ author: "", rating: 5, comment: "" });
    setActiveTab("reviews");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Reviews</h2>

      <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("reviews")}
          className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${
            activeTab === "reviews"
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Reviews
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("write")}
          className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${
            activeTab === "write"
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Write a Review
        </button>
      </div>

      {computedTotalReviews > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-gray-200">
          <div className="text-center">
            <div className="text-5xl font-extrabold text-gray-900 mb-2">
              {computedAvgRating.toFixed(1)}
            </div>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={
                    i < Math.floor(computedAvgRating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <p className="text-gray-500">Based on {computedTotalReviews} reviews</p>
          </div>

          <div className="space-y-2">
            {ratingDistribution.map((dist) => (
              <div key={dist.stars} className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-600 w-8">{dist.stars}★</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 transition-all"
                    style={{
                      width: `${computedTotalReviews > 0 ? (dist.count / computedTotalReviews) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-8">{dist.count}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 mb-8 border-b border-gray-200">
          <p className="text-gray-500">No reviews yet. Be the first to review this property!</p>
        </div>
      )}

      {activeTab === "reviews" ? (
        <div className="space-y-4">
          {localReviews.length > 0 ? (
            localReviews.map((review) => (
              <div key={review.id || `${review.author}-${review.date}`}>
                <ReviewCard review={review} />
                {review.ownerReply && (
                  <div className="mt-2">
                    <ReviewCard review={review.ownerReply} isOwnerReply={true} />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">No reviews to display</p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Name</label>
            <input
              type="text"
              value={reviewForm.author}
              onChange={(e) =>
                setReviewForm((prev) => ({ ...prev, author: e.target.value }))
              }
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Rating</label>
            <select
              value={reviewForm.rating}
              onChange={(e) =>
                setReviewForm((prev) => ({ ...prev, rating: Number(e.target.value) }))
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option value={5}>5 - Excellent</option>
              <option value={4}>4 - Good</option>
              <option value={3}>3 - Average</option>
              <option value={2}>2 - Fair</option>
              <option value={1}>1 - Poor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Review</label>
            <textarea
              value={reviewForm.comment}
              onChange={(e) =>
                setReviewForm((prev) => ({ ...prev, comment: e.target.value }))
              }
              rows={4}
              placeholder="Share your experience with this seller"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-gray-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#9afb21] text-black hover:bg-[#8aec1b] font-bold py-3 rounded-lg transition-colors"
          >
            Submit Review
          </button>
        </form>
      )}
    </div>
  );
}
