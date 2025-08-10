// hooks/useToggleSave.ts
import { useApi } from "@/contexts/ApiContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type ItemsShape = {
  items?: Array<{
    id: string | number;
    isSaved?: boolean;
    // optional count field if you keep one on card
    saves?: number;
  }>;
};

type ProductsShape = {
  products?: Array<{
    id: string | number;
    meta?: { savesCount?: number };
    __isSaved?: boolean; // client-only flag if you use raw shape
  }>;
};

type AnyFeed = (ItemsShape | ProductsShape) & Record<string, any>;

export function useToggleSave(page?: number) {
  const { toggleSave } = useApi();
  const qc = useQueryClient();
  const feedKey = ["feed", page];

  return useMutation({
    mutationFn: (designId: number) => toggleSave(designId),

    onMutate: async (designId: number) => {
      await qc.cancelQueries({ queryKey: feedKey });
      const prev = qc.getQueryData<AnyFeed>(feedKey);

      qc.setQueryData<AnyFeed>(feedKey, (old) => {
        if (!old) return old;

        // A) transformed shape: { items: [...] }
        if (Array.isArray((old as ItemsShape).items)) {
          const o = old as ItemsShape;
          return {
            ...o,
            items: o.items!.map((it) => {
              if (String(it.id) !== String(designId)) return it;
              const nowSaved = !it.isSaved;
              return {
                ...it,
                isSaved: nowSaved,
                // if you keep a "saves" number on card, nudge it:
                saves: typeof it.saves === "number" ? Math.max(0, it.saves + (nowSaved ? 1 : -1)) : it.saves,
              };
            }),
          };
        }

        // B) raw API shape: { products: [...] }
        if (Array.isArray((old as ProductsShape).products)) {
          const o = old as ProductsShape;
          return {
            ...o,
            products: o.products!.map((p) => {
              if (String(p.id) !== String(designId)) return p;
              const nowSaved = !(p as any).__isSaved;
              const current = p.meta?.savesCount ?? 0;
              return {
                ...p,
                meta: { ...p.meta, savesCount: Math.max(0, current + (nowSaved ? 1 : -1)) },
                __isSaved: nowSaved, // client-only flag for UI if raw shape
              };
            }),
          };
        }

        return old;
      });

      return { prev };
    },

    onError: (_err, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(feedKey, ctx.prev);
    },

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onSettled: (_data, _err, designId) => {
      qc.invalidateQueries({ queryKey: feedKey });
      qc.invalidateQueries({ queryKey: ["product", Number(designId)] });
    },
  });
}
