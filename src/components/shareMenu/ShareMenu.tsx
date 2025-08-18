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
} from "@/components/ui/popover"; // shadcn/ui
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner"; // Add Sonner for toast messages

type Props = {
  url: string;
  title?: string;
  onShared?: () => void; // Call your shareMutate here
  size?: number; // Icon size
  className?: string;
  onClose?: (status: "success" | "error") => void; // Add onClose prop to handle success/error
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
  onClose, // Accept onClose prop
}: Props) {
  const [open, setOpen] = React.useState(false);

  const triggerNativeShare = async () => {
    try {
      await (navigator as any).share({ title, text: title, url });
      onShared?.(); // Only count after successful share
      onClose?.("success"); // Call onClose with success message when share is successful
    } catch (_e) {
      // User cancelled or not supported — ignore
      onClose?.("error"); // Call onClose with error message if it fails
    }
  };

  // If native share is supported, click goes to native; otherwise, it opens popover
  const onTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWebShareSupported()) {
      triggerNativeShare();
    } else {
      setOpen((v) => !v);
    }
  };

  // When using react-share buttons, fire onShared as well and close
  const onReactShare = () => {
    onShared?.();
    setOpen(false);
    onClose?.("success"); // Call onClose with success message
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
            <FacebookShareButton url={url} quote={title} onClick={onReactShare}>
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

          {/* Explicit native button if supported and user opened popover manually */}
          {isWebShareSupported() && (
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => {
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
