import { useQuery } from "@tanstack/react-query";
import { useApi } from "@/contexts/ApiContext";

export type MySellItem = {
  id: number;
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

      // ✅ fix: use .sells instead of .data
      return (sellData?.sells ?? []).map((sell: any): MySellItem => ({
        id: sell.id,
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
