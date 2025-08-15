// hooks/useMyProductReviewsAndRatings.ts
import { useApi } from "@/contexts/ApiContext";
import { useQuery } from "@tanstack/react-query";

export function useMyProductReviewsAndRatings() {
  const { getMyProductReviewsAndRatings } = useApi();
  return useQuery({
    queryKey: ["myProductReviewsAndRatings"],
    queryFn: getMyProductReviewsAndRatings,
    staleTime: 60_000,
  });
}
