// hooks/useToggleLike.ts
import { useApi } from "@/contexts/ApiContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type FeedItemsShape = {
  items?: Array<{ id: string | number; isLiked?: boolean; likes?: number }>;
  total?: number; pageSize?: number; page?: number;
};

type FeedProductsShape = {
  success?: boolean;
  products?: Array<{ id: number | string; meta?: { likesCount?: number } }>;
  total?: number; pageSize?: number; page?: number; message?: string;
};

type AnyFeed = FeedItemsShape | (FeedProductsShape & Record<string, any>);

export function useToggleLike(page?: number) {
  const { toggleLike } = useApi();
  const qc = useQueryClient();
  const feedKey = ["feed", page];

  return useMutation({
    mutationFn: async (designId: number) => {
      console.log("[useToggleLike] call =>", designId);
      return toggleLike(designId);
    },

    onMutate: async (designId: number) => {
      await qc.cancelQueries({ queryKey: feedKey });

      const prev = qc.getQueryData<AnyFeed>(feedKey);

      // Optimistic update for either cache shape
      qc.setQueryData<AnyFeed>(feedKey, (old) => {
        if (!old) return old;

        // Case A: transformed shape with items[]
        if (Array.isArray((old as FeedItemsShape).items)) {
          const o = old as FeedItemsShape;
          const nextItems = o.items!.map((it) => {
            if (String(it.id) !== String(designId)) return it;
            const nowLiked = !it.isLiked;
            return {
              ...it,
              isLiked: nowLiked,
              likes: Math.max(0, (it.likes ?? 0) + (nowLiked ? 1 : -1)),
            };
          });
          return { ...o, items: nextItems };
        }

        // Case B: raw API shape with products[]
        if (Array.isArray((old as FeedProductsShape).products)) {
          const o = old as FeedProductsShape;
          const nextProducts = o.products!.map((p) => {
            if (String(p.id) !== String(designId)) return p;
            const current = p.meta?.likesCount ?? 0;
            // best-effort flip (+1/-1) — no isLiked flag here
            return {
              ...p,
              meta: { ...p.meta, likesCount: current + 1 },
            };
          });
          return { ...o, products: nextProducts };
        }

        // Unknown shape → skip
        console.warn("[useToggleLike] unknown feed cache shape, skipping optimistic update", old);
        return old;
      });

      return { prev };
    },

    onError: (err, _designId, ctx) => {
      console.error("[useToggleLike] error", err);
      if (ctx?.prev) qc.setQueryData(feedKey, ctx.prev);
    },

    onSettled: (_data, _err, designId) => {
      qc.invalidateQueries({ queryKey: feedKey });
      qc.invalidateQueries({ queryKey: ["product", Number(designId)] });
    },
  });
}
