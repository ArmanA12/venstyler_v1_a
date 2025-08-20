import { useQuery } from "@tanstack/react-query";
import { useApi } from "@/contexts/ApiContext";

export type MyOrderItem = {
  orderId: number;
  title: string;
  price: number;
  status: string;
  date: string;
};

export function useMyOrders() {
  const { getMyOrders } = useApi();
  return useQuery({
    queryKey: ["myOrders"],
    queryFn: async (): Promise<MyOrderItem[]> => {
      const orderData = await getMyOrders();
      return (orderData.orders ?? []).map((order: any): MyOrderItem => ({
        orderId: order.id,
        title: order.orderItems?.[0]?.title ?? "Untitled",
        price: order.totalAmount,
        status: order.status,
        date: order.createdAt,
      }));
    },
  });
}
