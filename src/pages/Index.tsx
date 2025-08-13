import { DesignCard } from "@/components/DesignCard";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Home,
  Search,
  Heart,
  MessageCircle,
  PlusCircle,
  User,
  Bookmark,
  Settings,
  Camera,
  Video,
  Image as ImageIcon,
  Bell,
  Globe,
  TrendingUp,
  Share,
  Share2,
} from "lucide-react";
import design1 from "@/assets/design-1.jpg";
import design2 from "@/assets/design-2.jpg";
import designerAvatar from "@/assets/designer-avatar-1.jpg";
import { Header } from "@/components/navbar/Header";
import { BottomNav } from "@/components/navbar/bottomNav";
import { Link } from "react-router-dom";
import { useApi } from "@/contexts/ApiContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useFeed } from "@/hooks/useFeed";
import { useToggleLike } from "@/hooks/useToggleLike";
import CommentsPanel from "@/components/comments/commentPanle";
import { useToggleSave } from "@/hooks/useToggleSave";
import { useShareDesign } from "@/hooks/useShareDesign";
// import { Header } from "@/components/Header";

const Index = () => {
  const { createComment } = useApi();
  const [page, setPage] = useState(1);
  const qc = useQueryClient();

  const [openCommentBox, setOpenCommentBox] = useState<Record<string, boolean>>(
    {}
  );
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [commentsCounts, setCommentsCounts] = useState<Record<string, number>>(
    {}
  );

  const [openCommentsFor, setOpenCommentsFor] = useState<string | null>(null);

  const { data, isLoading, isFetching, isError, error } = useFeed(page);
  console.log(data, "feed")
  useEffect(() => {
    if (isError) {
      toast.error((error as Error)?.message || "Failed to load feed");
    }
  }, [isError, error]);

  // Data mapped by the hook's `select`
  const items = data?.items ?? [];
  const loading = isLoading; // alias so existing JSX `loading` checks still work
  const total = data?.total ?? 0;
  const pageSize = data?.pageSize ?? 10;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const { mutate: likeUnlike } = useToggleLike(page);
  const { mutate: toggleSaveMutate } = useToggleSave(page);
  const { mutate: shareMutate } = useShareDesign(page);

  // UI helpers
  const toggleComment = (id: string) => {
    setOpenCommentBox((s) => ({ ...s, [id]: !s[id] }));
  };

  const onTextChange = (id: string, value: string) => {
    setCommentText((s) => ({ ...s, [id]: value }));
  };

  const submitComment = async (id: string) => {
    const content = (commentText[id] || "").trim();
    if (!content) return;

    try {
      await createComment(Number(id), content);
      setCommentText((t) => ({ ...t, [id]: "" }));
      setOpenCommentBox((s) => ({ ...s, [id]: false }));
      setCommentsCounts((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
      toast.success("Comment posted");

      // Optionally refresh this page from server (to sync counts)
      qc.invalidateQueries({ queryKey: ["feed", page] });
    } catch (e: any) {
      const msg =
        e?.response?.data?.message ||
        e?.message ||
        "Failed to comment. Please try again.";
      toast.error(msg);
    }
  };

  const sidebarSuggestions = [
    { name: "Fashion Week Updates", category: "Event", followers: "2.1k" },
    {
      name: "Textile Artisans Guild",
      category: "Community",
      followers: "1.8k",
    },
    { name: "Sustainable Fashion", category: "Movement", followers: "3.2k" },
  ];

  const handleLikeClick = (designId: string) => {
    likeUnlike(Number(designId));
  };

  const handleSaveClick = (id: string) => {
    toggleSaveMutate(Number(id));
  };

  return (
    <div>
      <div>
        <Header />
      </div>

      <div className="min-h-screen bg-background">
        {/* Enhanced Header with glass effect */}

        <div className="w-full px-0 lg:w-5/6 lg:px-4 mx-auto">
          <div className="grid grid-cols-12 gap-0">
            <div className="col-span-3 hidden lg:block">
              <div className="sticky top-18  border-l border-border/30">
                <div className="fashion-card p-6 animate-fade-in">
                  <nav className="space-y-3">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-4 h-12 text-left hover-lift bg-primary/10 text-primary"
                    >
                      <Home className="w-5 h-5" />
                      <span className="font-medium">Home</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-4 h-12 text-left hover-lift"
                      onClick={() => (window.location.href = "/explore")}
                    >
                      <Search className="w-5 h-5" />
                      <span className="font-medium">Explore</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-4 h-12 text-left hover-lift"
                    >
                      <Heart className="w-5 h-5" />
                      <span className="font-medium">Liked Designs</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-4 h-12 text-left hover-lift"
                    >
                      <Bookmark className="w-5 h-5" />
                      <span className="font-medium">Saved</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-4 h-12 text-left hover-lift"
                    >
                      <User className="w-5 h-5" />
                      <span className="font-medium">Profile</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-4 h-12 text-left hover-lift"
                      onClick={() => (window.location.href = "/settings")}
                    >
                      <Settings className="w-5 h-5" />
                      <span className="font-medium">Settings</span>
                    </Button>
                  </nav>
                </div>

                <div className="fashion-card p-6 animate-fade-in border-t border-border/50">
                  <h3 className="font-semibold mb-5 text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full  justify-start gap-4 h-12  hover-glow border-primary/20 hover:border-primary/40 -z-10 relative overflow-hidden"
                    >
                      <Camera className="w-5 h-5" />
                      <span className="font-medium">Upload Design</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-4 h-12 hover-glow border-secondary/20 hover:border-secondary/40"
                    >
                      <Video className="w-5 h-5" />
                      <span className="font-medium">Create Story</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-4 h-12 hover-glow border-accent/20 hover:border-accent/40"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-medium">Start Chat</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Feed */}
            <div className="col-span-12 lg:col-span-6  border-l border-r border-border/30 ">
              {/* Enhanced Stories */}

              {/* Enhanced Create Post */}
              <div className="hidden md:block">
                <div className="fashion-card p-6 animate-slide-up border-b border-border/30">
                  <div className="flex gap-4">
                    <div className="">
                      <Avatar className="w-12 h-12 story-gradient rounded-full">
                        <AvatarImage
                          className="rounded-full"
                          src={designerAvatar}
                        />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <Input
                        placeholder="Share your latest design or inspiration..."
                        className="mb-4 bg-muted/50 border-muted/80 backdrop-blur-sm focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                      />
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2 hover-glow text-primary justify-start"
                        >
                          <ImageIcon className="w-4 h-4" />
                          Photo
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2 hover-glow text-secondary justify-start"
                        >
                          <Video className="w-4 h-4" />
                          Video
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2 hover-glow text-accent justify-start"
                        >
                          <Camera className="w-4 h-4" />
                          Collection
                        </Button>
                        <Button
                          variant="gradient"
                          size="sm"
                          className="shadow-colored hover:shadow-glow px-6 justify-center"
                        >
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Design Feed */}
              <div>
                {loading && (
                  <div className="p-6 text-center text-muted-foreground">
                    Loading feed…
                  </div>
                )}

                {!loading && items.length === 0 && (
                  <div className="p-6 text-center text-muted-foreground">
                    No designs yet.
                  </div>
                )}

                {!loading &&
                  items.map((design, index) => (
                    <div
                      key={design.id}
                      className="fashion-card border-b border-border/30 overflow-hidden animate-fade-in"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      {/* Post Header */}
                      <div className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="story-gradient">
                            <Avatar className="w-12 h-12">
                              {design.designerAvatar ? (
                                <AvatarImage src={design.designerAvatar} />
                              ) : (
                                <AvatarFallback>
                                  {design.designer?.[0] || "U"}
                                </AvatarFallback>
                              )}
                            </Avatar>
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">
                              {design.designer}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Just now
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover-glow"
                        >
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Image */}
                      <div className="relative overflow-hidden">
                        {design.imageUrl ? (
                          <img
                            src={design.imageUrl}
                            alt={design.title}
                            className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full aspect-square bg-muted" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Actions + Meta */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex gap-5">
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`hover-glow ${design.isLiked ? "text-red-500" : ""}`}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log("[Heart] click", design.id);
                                likeUnlike(Number(design.id));
                              }}
                            >
                              <Heart
                                className={`w-6 h-6 ${design.isLiked ? "fill-current animate-pulse" : ""}`}
                              />
                            </Button>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="hover-glow"
                              onClick={() => toggleComment(design.id)}
                            >
                              <MessageCircle className="w-6 h-6" />
                            </Button>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="hover-glow"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                shareMutate(Number(design.id));
                              }}
                            >
                              <Share2 className="w-6 h-6" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className={`hover-glow ${design.isSaved ? "text-primary" : ""}`}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleSaveClick(design.id);
                            }}
                          >
                            <Bookmark
                              className={`w-6 h-6 ${design.isSaved ? "fill-current" : ""}`}
                            />
                          </Button>
                        </div>

                        <p className="font-semibold mb-2 text-lg">
                          {design.likes.toLocaleString()} likes
                        </p>

                        <h3 className="font-semibold text-xl mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                          {design.title}
                        </h3>

                        {design.category && (
                          <p className="text-sm text-primary mb-3 font-medium">
                            #{design.category}
                          </p>
                        )}

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground p-0 hover:p-1 h-auto hover:text-foreground transition-colors"
                          onClick={() => setOpenCommentsFor(design.id)}
                        >
                          View all{" "}
                          {(commentsCounts[design.id] ?? 0) + design.comments}{" "}
                          comments
                        </Button>

                        {openCommentBox[design.id] && (
                          <div className="mt-3 flex items-center gap-2">
                            <input
                              type="text"
                              value={commentText[design.id] ?? ""}
                              placeholder="Add a comment..."
                              className="flex-1 rounded-md border px-3 py-2 text-sm bg-background"
                              onChange={(e) =>
                                onTextChange(design.id, e.target.value)
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") submitComment(design.id);
                              }}
                            />
                            <Button
                              size="sm"
                              onClick={() => submitComment(design.id)}
                              disabled={
                                !(commentText[design.id] ?? "").trim().length
                              }
                            >
                              Post
                            </Button>
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-4">
                          <Link to={`/product/${design.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-sm text-[#ee4482] rounded-lg btshadow font-medium hover-glow relative overflow-clip border-transparent"
                            >
                              View Details
                              <div className="w-20 h-5 bg-[#ee4482] absolute top-0 blur-2xl"></div>
                            </Button>
                          </Link>

                          {/* price/discount not in original UI here; keep your placeholder */}
                          <div className="text-right">
                            <p className="text-muted-foreground text-sm line-through">
                              ₹ 1299
                            </p>
                            <p className="text-primary font-semibold text-lg">
                              ₹ 999
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                {openCommentsFor !== null && (
                  <CommentsPanel
                    designId={openCommentsFor}
                    open
                    onClose={() => setOpenCommentsFor(null)}
                    onPosted={() =>
                      setCommentsCounts((c) => ({
                        ...c,
                        [String(openCommentsFor)]:
                          (c[String(openCommentsFor)] ?? 0) + 1,
                      }))
                    }
                  />
                )}
              </div>
            </div>

            {/* Enhanced Right Sidebar */}
            <div className="col-span-3 hidden lg:block w-[300px]">
              <div className="sticky top-18 border-r border-border/50">
                {/* Enhanced Suggestions */}
                <div className="fashion-card p-6 animate-fade-in">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-semibold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Suggestions for you
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary/80"
                    >
                      See All
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {sidebarSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/30 transition-all duration-300 hover-lift"
                      >
                        <div className="flex items-center gap-3">
                          <div className="story-gradient">
                            <Avatar className="w-11 h-11">
                              <AvatarImage src={designerAvatar} />
                              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20">
                                {suggestion.name[0]}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div>
                            <p className="font-medium text-sm">
                              {suggestion.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {suggestion.followers} followers
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover-glow border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                        >
                          Follow
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Trending */}
                <div className="fashion-card p-6 animate-fade-in border-t border-border/50">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Trending
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10 hover-lift cursor-pointer bg-image">
                      <p className="font-medium text-sm text-primary">
                        #SustainableFashion
                      </p>
                      <p className="text-xs text-muted-foreground">
                        1.2k posts today
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-r from-secondary/5 to-accent/5 border border-secondary/10 hover-lift cursor-pointer bg-image">
                      <p className="font-medium text-sm text-secondary">
                        #IndianTextiles
                      </p>
                      <p className="text-xs text-muted-foreground">
                        890 posts today
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-r from-accent/5 to-primary/5 border border-accent/10 hover-lift cursor-pointer bg-image">
                      <p className="font-medium text-sm text-accent">
                        #HandmadeDesigns
                      </p>
                      <p className="text-xs text-muted-foreground">
                        756 posts today
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10">
        <BottomNav />
      </div>
    </div>
  );
};

export default Index;
