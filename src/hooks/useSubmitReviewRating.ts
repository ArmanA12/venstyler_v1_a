// hooks/useSubmitReviewAndRating.ts
import { useApi } from "@/contexts/ApiContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Payload = {
  comment: string;
  rating: number;
  images?: File[];
};

export function useSubmitReviewAndRating(designId: number) {
  const { submitReviewAndRating } = useApi();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: Payload) =>
      submitReviewAndRating({ designId, ...payload }),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["product", designId] });

      qc.invalidateQueries({ queryKey: ["reviews", designId] });
    },
  });
}
