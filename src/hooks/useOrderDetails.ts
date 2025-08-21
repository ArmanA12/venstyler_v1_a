import { useQuery } from "@tanstack/react-query";
import { useApi } from "@/contexts/ApiContext";

export function useOrderDetails(orderId: number) {
  const { getOrderDetails } = useApi();
  
  return useQuery({
    queryKey: ["orderDetails", orderId],
    queryFn: () => getOrderDetails(orderId),
    enabled: !!orderId,
  });
}