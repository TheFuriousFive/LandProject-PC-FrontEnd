import { Star, MessageCircle, Flag } from "lucide-react";

export default function ReviewCard({ review, isOwnerReply = false }) {
  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 3.5) return "text-blue-600";
    if (rating >= 2.5) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div
      className={`border rounded-xl p-4 ${isOwnerReply ? "bg-blue-50 border-blue-200 ml-8" : "bg-white border-gray-200"}`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="font-bold text-gray-900">
            {review.author || "Anonymous Reviewer"}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(review.date).toLocaleDateString()}
          </p>
        </div>

        {/* Rating */}
        {!isOwnerReply && (
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < Math.floor(review.rating)
                    ? `${getRatingColor(review.rating)} fill-current`
                    : "text-gray-300"
                }
              />
            ))}
            <span className={`ml-2 font-bold ${getRatingColor(review.rating)}`}>
              {review.rating}/5
            </span>
          </div>
        )}

        {isOwnerReply && (
          <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">
            Owner Reply
          </span>
        )}
      </div>

      {/* Review Text */}
      <p className="text-gray-700 text-sm mb-3">{review.comment}</p>

      {/* Review Aspects (if provided) */}
      {!isOwnerReply && review.aspects && (
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          {review.aspects.map((aspect, idx) => (
            <div key={idx} className="bg-gray-100 rounded px-2 py-1">
              <span className="text-gray-600">{aspect}</span>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      {!isOwnerReply && (
        <div className="flex gap-3 text-xs text-gray-500">
          <button className="flex items-center gap-1 hover:text-gray-700">
            <MessageCircle size={14} />
            Reply
          </button>
          <button className="flex items-center gap-1 hover:text-red-600">
            <Flag size={14} />
            Report
          </button>
        </div>
      )}
    </div>
  );
}
