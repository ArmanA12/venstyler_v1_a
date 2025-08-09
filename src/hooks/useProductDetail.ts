// hooks/useProductDetails.ts
import { useQuery } from "@tanstack/react-query";
import { useApi } from "@/contexts/ApiContext";

export function useProductDetails(designId?: number) {
  const { getProductDetails } = useApi();

  return useQuery({
    queryKey: ["product", designId],
    enabled: !!designId, 
    queryFn: async () => {
      if (!designId) throw new Error("Missing designId");
      const res = await getProductDetails(designId);
      if (!res.success) throw new Error("Failed to load product details");
      return res.product;
    },
    staleTime: 60_000,
  });
}
