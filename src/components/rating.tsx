import { Star, StarHalf } from "lucide-react";

interface RatingProps {
  rating: number;
  reviews: number;
}

export default function Rating({ rating, reviews }: RatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="h-5 w-5 fill-amber-300 text-amber-300" />
      ))}
      {hasHalfStar && (
        <StarHalf className="h-5 w-5 fill-amber-300 text-amber-300" />
      )}
      <span className="ml-2 text-sm text-muted-foreground">
        {reviews} reviews
      </span>
    </div>
  );
}
