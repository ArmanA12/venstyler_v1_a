import React, { useEffect, useRef, useState } from "react";
import DailyIframe, { DailyCall } from "@daily-co/daily-js";

interface VideoCallProps {
  url: string;
  onLeave?: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ url, onLeave }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [callObject, setCallObject] = useState<DailyCall | null>(null);

  useEffect(() => {
    if (!url || !containerRef.current) return;

    const callFrame = DailyIframe.createFrame(containerRef.current, {
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

    callFrame.on("left-meeting", () => {
      onLeave?.();
    });

    return () => {
      callFrame.destroy();
      setCallObject(null);
    };
  }, [url]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "80vh", borderRadius: "12px" }}
    />
  );
};

export default VideoCall;
