import { useQuery } from "@tanstack/react-query";
import { useApi } from "@/contexts/ApiContext";

export function useProductAnalytics(productId: number) {
  const { getProductAnalytics } = useApi();

  return useQuery({
    queryKey: ["product-analytics", productId],
    queryFn: () => getProductAnalytics(productId),
    enabled: !!productId, // productId हो तभी call हो
  });
}
