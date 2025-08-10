// components/comments/CommentsPanel.tsx
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useComments } from "@/hooks/useComment";

type Props = {
  designId: number;
  open: boolean;
  onClose: () => void;
  onPosted?: () => void; // optional: parent can increment its count if needed
};

export default function CommentsPanel({
  designId,
  open,
  onClose,
  onPosted,
}: Props) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    addComment,
    adding,
  } = useComments(designId, 10);

  const [text, setText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) setText("");
  }, [open]);

  const pages = data?.pages ?? [];
  const first = pages[0];
  const total = first?.totalComments ?? 0;
  const flat = pages.flatMap((p) => p.comments);

  const post = async () => {
    const content = text.trim();
    if (!content) return;
    await addComment(content);
    setText("");
    onPosted?.();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end lg:items-center lg:justify-center">
      <div className="w-full lg:w-[560px] max-h-[85vh] bg-background rounded-t-2xl lg:rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-semibold">Comments ({total})</div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>

        {/* List */}
        <div
          ref={containerRef}
          className="p-4 space-y-4 overflow-auto max-h-[60vh]"
        >
          {flat.length === 0 && (
            <div className="text-sm text-muted-foreground">
              No comments yet.
            </div>
          )}

          {flat.map((c) => (
            <div key={c.id} className="flex gap-3">
              <Avatar className="h-9 w-9">
                {c.user?.profileImage ? (
                  <AvatarImage src={c.user.profileImage} />
                ) : (
                  <AvatarFallback>{c.user?.name?.[0] ?? "U"}</AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1">
                <div className="text-sm">
                  <span className="font-medium">{c.user?.name ?? "User"}</span>{" "}
                  <span className="text-muted-foreground">{c.comment}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {new Date(c.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))}

          {hasNextPage && (
            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? "Loading..." : "Load more"}
              </Button>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t flex gap-2">
          <Input
            placeholder="Add a comment…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && post()}
          />
          <Button onClick={post} disabled={!text.trim() || adding}>
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}
