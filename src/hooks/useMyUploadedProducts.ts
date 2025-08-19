// hooks/useMyUploadedProducts.ts
import { useQuery } from "@tanstack/react-query";
import { useApi } from "@/contexts/ApiContext";

export function useMyUploadedProducts() {
  const { getMyUploadedProducts } = useApi();

  return useQuery({
    queryKey: ["myUploadedProducts"],
    queryFn: getMyUploadedProducts,
  });
}
