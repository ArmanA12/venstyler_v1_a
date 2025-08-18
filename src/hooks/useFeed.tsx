// hooks/useFeed.ts (your snippet is perfect)
import { useEffect } from "react";
import {
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { useApi } from "@/contexts/ApiContext";

export type FeedItem = {
  id: number;
  title: string;
  images: string[];
  designer: {
    id: number;
    name: string | null;
    profileImage: string | null;
    city: string | null;
  } | null;
  designerAvatar: string | null;
  category?: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isSaved: boolean;
};

export function useFeed(page: number) {
  const { getFeed } = useApi();
  const qc = useQueryClient();

  const q = useQuery({
    queryKey: ["feed", page],
    queryFn: () => getFeed(page),
    placeholderData: keepPreviousData,
    select: (res) => ({
      items: res.products.map((p) => ({
        id: String(p.id),
        imageUrl: p.images?.[0] || "",
        title: p.title,
        price:p.price,
        discount:p.discount,
        city:p.designer.city,
        createdAt:p.createdAt,
        designer: p.designer?.name || "Unknown",
        isVerified:p.designer.isVerified,
        designerAvatar: p.designer?.profileImage || null,
        category: p.category,
        likes: p.meta?.likesCount ?? 0,
        comments: p.meta?.commentCount ?? 0,
        isLiked: !!p.isLiked, // <-- normalize here
        isSaved: !!p.isSaved,
      })),
      total: res.total,
      pageSize: res.pageSize,
      page: res.page,
    }),
  });

  useEffect(() => {
    if (!q.data) return;
    const totalPages = Math.ceil(q.data.total / q.data.pageSize);
    const next = page + 1;
    if (next <= totalPages) {
      qc.prefetchQuery({
        queryKey: ["feed", next],
        queryFn: () => getFeed(next),
      });
    }
  }, [page, q.data, qc, getFeed]);

  return q;
}
