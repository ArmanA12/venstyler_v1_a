import { useQuery } from "@tanstack/react-query";
import { useApi } from "@/contexts/ApiContext";

export type MySellItem = {
  orderId: number;
  buyerName: string;
  buyerProfileImage: string | null;
  productTitle: string;
  amount: number;
  status: string;
  date: string;
};

export function useMySells() {
  const { getMySells } = useApi();

  return useQuery({
    queryKey: ["mySells"],
    queryFn: async (): Promise<MySellItem[]> => {
      const sellData = await getMySells();
      return (sellData?.data ?? []).map((sell: any): MySellItem => ({
        orderId: sell.id,
        buyerName: sell.user?.name ?? "Unknown",
        buyerProfileImage: sell.user?.profile?.profileImage ?? null,
        productTitle: sell.orderItems?.[0]?.title ?? "Untitled",
        amount: sell.totalAmount,
        status: sell.status,
        date: sell.createdAt,
      }));
    },
  });
}
