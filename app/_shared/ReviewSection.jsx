import ReviewCard from "./ReviewCard";
import { Star } from "lucide-react";

export default function ReviewSection({
  reviews = [],
  avgRating = 0,
  totalReviews = 0,
}) {
  const ratingDistribution = [
    { stars: 5, count: reviews.filter((r) => r.rating === 5).length },
    { stars: 4, count: reviews.filter((r) => r.rating === 4).length },
    { stars: 3, count: reviews.filter((r) => r.rating === 3).length },
    { stars: 2, count: reviews.filter((r) => r.rating === 2).length },
    { stars: 1, count: reviews.filter((r) => r.rating === 1).length },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Community Reviews
      </h2>

      {/* Summary Stats */}
      {totalReviews > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-gray-200">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-5xl font-extrabold text-gray-900 mb-2">
              {avgRating.toFixed(1)}
            </div>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={
                    i < Math.floor(avgRating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <p className="text-gray-500">Based on {totalReviews} reviews</p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map((dist) => (
              <div key={dist.stars} className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-600 w-8">
                  {dist.stars}★
                </span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 transition-all"
                    style={{
                      width: `${totalReviews > 0 ? (dist.count / totalReviews) * 100 : 0}%`,
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
          <p className="text-gray-500">
            No reviews yet. Be the first to review this property!
          </p>
        </div>
      )}

      {/* Review List */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review, idx) => (
            <div key={idx}>
              <ReviewCard review={review} />
              {review.ownerReply && (
                <div className="mt-2">
                  <ReviewCard review={review.ownerReply} isOwnerReply={true} />
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">
            No reviews to display
          </p>
        )}
      </div>

      {/* Write Review Button */}
      <button className="w-full mt-8 bg-[#9afb21] text-black hover:bg-[#8aec1b] font-bold py-3 rounded-lg transition-colors">
        Write a Review
      </button>
    </div>
  );
}
