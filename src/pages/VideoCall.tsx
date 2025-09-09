import React, { useEffect, useRef, useState } from "react";
import DailyIframe, { DailyCall } from "@daily-co/daily-js";

interface VideoCallProps {
  url: string; // Daily.co room URL
  onLeave?: () => void; // callback when user leaves
}

const VideoCall: React.FC<VideoCallProps> = ({ url, onLeave }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [callObject, setCallObject] = useState<DailyCall | null>(null);

  useEffect(() => {
    if (!url) return;

    // Create Daily iframe
    const callFrame = DailyIframe.createFrame(iframeRef.current!, {
      showLeaveButton: true,
      iframeStyle: {
        width: "100%",
        height: "100%",
        border: "0",
        borderRadius: "12px",
      },
    });

    callFrame.join({ url });
    setCallObject(callFrame);

    // Handle leave event
    callFrame.on("left-meeting", () => {
      onLeave?.();
    });

    return () => {
      callFrame.destroy();
      setCallObject(null);
    };
  }, [url]);

  return (
    <div style={{ width: "100%", height: "80vh", borderRadius: "12px" }}>
      <div ref={iframeRef}></div>
    </div>
  );
};

export default VideoCall;
