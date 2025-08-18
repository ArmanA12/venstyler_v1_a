import { useApi } from "@/contexts/ApiContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type ItemsShape = {
  items?: Array<{ id: string | number; shares?: number }>;
};
type ProductsShape = {
  products?: Array<{ id: string | number; meta?: { sharesCount?: number } }>;
};
type AnyFeed = (ItemsShape | ProductsShape) & Record<string, any>;

export function useShareDesign(page?: number) {
  const { shareDesign } = useApi();
  const qc = useQueryClient();
  const feedKey = ["feed", page];

  return useMutation({
    mutationFn: (designId: number) => shareDesign(designId),

    onMutate: async (designId: number) => {
      await qc.cancelQueries({ queryKey: feedKey });
      const prev = qc.getQueryData<AnyFeed>(feedKey);

      // Optimistic increment
      qc.setQueryData<AnyFeed>(feedKey, (old) => {
        if (!old) return old;
        // A) transformed items
        if (Array.isArray((old as ItemsShape).items)) {
          const o = old as ItemsShape;
          return {
            ...o,
            items: o.items!.map((it) =>
              String(it.id) === String(designId)
                ? { ...it, shares: (it.shares ?? 0) + 1 }
                : it
            ),
          };
        }
        // B) raw products
        if (Array.isArray((old as ProductsShape).products)) {
          const o = old as ProductsShape;
          return {
            ...o,
            products: o.products!.map((p) =>
              String(p.id) === String(designId)
                ? {
                    ...p,
                    meta: { ...p.meta, sharesCount: (p.meta?.sharesCount ?? 0) + 1 },
                  }
                : p
            ),
          };
        }
        return old;
      });

      return { prev };
    },

    onError: (_e, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(feedKey, ctx.prev);
      toast.error("Error while sharing!");
    },

    // onSuccess: (data) => {
    //   toast.success(data.message || "Shared successfully!");
    // },

    onSettled: (_data, _err, designId) => {
      qc.invalidateQueries({ queryKey: feedKey });
      qc.invalidateQueries({ queryKey: ["product", Number(designId)] });
    },
  });
}
