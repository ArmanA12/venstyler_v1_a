// components/ShareMenu.tsx
import * as React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom"; // ⬅️ redirect
import { useAuth } from "@/contexts/AuthContext";

type Props = {
  url: string;
  title?: string;
  onShared?: () => void;
  size?: number;
  className?: string;
  onClose?: (status: "success" | "error") => void;
};

function isWebShareSupported() {
  return typeof navigator !== "undefined" && !!(navigator as any).share;
}

export function ShareMenu({
  url,
  title = "",
  onShared,
  size = 36,
  className,
  onClose,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const requireAuth = React.useCallback(
    (actionLabel = "share") => {
      if (isLoading) return false; // still resolving cookie on app boot
      if (!isAuthenticated) {
        toast("Please sign in", {
          description: `You need to be logged in to ${actionLabel}.`,
        });
        // keep return path so we come back to the same page after login
        navigate("/signin", { state: { from: location.pathname } });
        return false;
      }
      return true;
    },
    [isAuthenticated, isLoading, navigate, location.pathname]
  );

  const triggerNativeShare = async () => {
    try {
      await (navigator as any).share({ title, text: title, url });
      onShared?.(); // count share only on success
      onClose?.("success");
    } catch {
      onClose?.("error");
    }
  };

  // If native share is supported, we use that; else open the popover
  const onTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // ⬇️ block when not authenticated (modal will NOT open)
    if (!requireAuth("share")) return;

    if (isWebShareSupported()) {
      triggerNativeShare();
    } else {
      setOpen((v) => !v);
    }
  };

  // Extra safety: if something tries to open the popover externally
  const handleOpenChange = (next: boolean) => {
    if (next && !requireAuth("share")) return; // don't open
    setOpen(next);
  };

  // Using react-share buttons
  const onReactShare = () => {
    // Shouldn't reach here when unauthenticated because popover won't open,
    // but keep the check as defense-in-depth.
    if (!requireAuth("share")) return;

    onShared?.();
    setOpen(false);
    onClose?.("success");
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={className ?? "hover-glow"}
          onClick={onTriggerClick}
          aria-label="Share"
        >
          <Share2 className="w-6 h-6" />
        </Button>
      </PopoverTrigger>

      {/* Fallback menu for desktop/unsupported */}
      <PopoverContent className="w-72">
        <div className="space-y-3">
          <p className="text-sm font-medium">Share this design</p>

          <div className="grid grid-cols-3 gap-3 justify-items-center">
            <FacebookShareButton url={url} title={title} onClick={onReactShare}>
              <FacebookIcon size={size} round />
            </FacebookShareButton>

            <WhatsappShareButton url={url} title={title} onClick={onReactShare}>
              <WhatsappIcon size={size} round />
            </WhatsappShareButton>

            <TwitterShareButton url={url} title={title} onClick={onReactShare}>
              <TwitterIcon size={size} round />
            </TwitterShareButton>

            <LinkedinShareButton url={url} title={title} onClick={onReactShare}>
              <LinkedinIcon size={size} round />
            </LinkedinShareButton>

            <TelegramShareButton url={url} title={title} onClick={onReactShare}>
              <TelegramIcon size={size} round />
            </TelegramShareButton>

            <EmailShareButton url={url} subject={title} onClick={onReactShare}>
              <EmailIcon size={size} round />
            </EmailShareButton>
          </div>

          {isWebShareSupported() && (
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => {
                if (!requireAuth("share")) return;
                triggerNativeShare();
                setOpen(false);
              }}
            >
              Share via device…
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
