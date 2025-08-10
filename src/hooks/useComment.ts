// hooks/useComments.ts
import { useApi } from "@/contexts/ApiContext";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type UiComment = {
  id: number;
  comment: string;
  createdAt: string;
  user: { id: number; name: string | null; profileImage: string | null };
};

type UiPage = {
  designId: number;
  currentPage: number;
  totalPages: number;
  totalComments: number;
  comments: UiComment[];
};

export function useComments(designId?: number, pageSize = 10) {
  const { getCommentsByDesign, createComment } = useApi();
  const qc = useQueryClient();

  const q = useInfiniteQuery({
    enabled: !!designId,
    queryKey: ["comments", designId, pageSize],
    queryFn: async ({ pageParam = 1 }): Promise<UiPage> => {
      const res = await getCommentsByDesign!(designId!, pageParam, pageSize);
      return {
        designId: res.designId,
        currentPage: res.currentPage,
        totalPages: res.totalPages,
        totalComments: res.totalComments,
        comments: res.comments.map((c) => ({
          id: c.id,
          comment: (c.comment ?? c.content ?? "").toString(),
          createdAt: c.createdAt,
          user: {
            id: c.user?.id ?? 0,
            name: c.user?.name ?? "User",
            profileImage: c.user?.profile?.profileImage ?? null,
          },
        })),
      };
    },
    getNextPageParam: (last) =>
      last.currentPage < last.totalPages ? last.currentPage + 1 : undefined,
    staleTime: 30_000,
  });

  const add = useMutation({
    mutationFn: async (content: string) => {
      if (!designId) throw new Error("Missing designId");
      await createComment(designId, content);
      return { content };
    },
    onMutate: async (content) => {
      await qc.cancelQueries({ queryKey: ["comments", designId, pageSize] });
      const prev = qc.getQueryData<any>(["comments", designId, pageSize]);

      const optimistic = {
        id: Math.floor(Math.random() * 1e9),
        comment: content,
        createdAt: new Date().toISOString(),
        user: { id: 0, name: "You", profileImage: null },
      };

      qc.setQueryData(["comments", designId, pageSize], (old: any) => {
        if (!old) return old;
        const first = old.pages?.[0];
        if (!first) return old;
        return {
          ...old,
          pages: [
            {
              ...first,
              totalComments: (first.totalComments ?? 0) + 1,
              comments: [optimistic, ...first.comments],
            },
            ...old.pages.slice(1),
          ],
        };
      });

      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) qc.setQueryData(["comments", designId, pageSize], ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["comments", designId, pageSize] });
    },
  });

  return { ...q, addComment: add.mutateAsync, adding: add.isPending };
}
