import React, { useEffect, useRef, useState } from "react";
import DailyIframe from "@daily-co/daily-js";
import axios from "axios";

const VideoCall = ({ url, onLeave }) => {
  const containerRef = useRef(null);
  const callObjectRef = useRef(null);

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
    callObjectRef.current = callFrame;

    callFrame.on("left-meeting", () => {
      onLeave?.();
    });

    return () => {
      callFrame.destroy();
      callObjectRef.current = null;
    };
  }, [url, onLeave]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "80vh", borderRadius: "12px" }}
    />
  );
};

const VideoCallApp = ({ chatId }) => {
  const [callUrl, setCallUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [callStatus, setCallStatus] = useState("idle");

  const startCall = async () => {
    if (!chatId) {
      setError("No chat ID provided");
      return;
    }
    
    setLoading(true);
    setError(null);
    setCallStatus("creating");
    
    try {
      const res = await axios.post(
        "https://venstyler.armanshekh.com/api/chat/videoCall",
        { chatId },
        { withCredentials: true }
      );
      
      if (res.data.url) {
        setCallUrl(res.data.url);
        setCallStatus("joining");
      } else {
        setError("Failed to get call URL from server");
        setCallStatus("error");
      }
    } catch (error) {
      console.error("Error starting call:", error);
      setError("Failed to start video call");
      setCallStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveCall = () => {
    setCallUrl(null);
    setCallStatus("idle");
  };

  return (
    <div style={{ 
      maxWidth: "800px", 
      margin: "0 auto", 
      padding: "20px", 
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f5f7fa",
      borderRadius: "12px"
    }}>
      <h2 style={{ color: "#2d3748", textAlign: "center" }}>Video Call</h2>
      
      {error && (
        <div style={{ 
          color: "#e53e3e", 
          padding: "12px", 
          marginBottom: "20px",
          backgroundColor: "#fed7d7",
          border: "1px solid #feb2b2",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
          <svg style={{ width: "20px", height: "20px" }} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}
      
      {!chatId && (
        <div style={{ 
          color: "#dd6b20", 
          padding: "12px", 
          marginBottom: "20px",
          backgroundColor: "#feebc8",
          border: "1px solid #fbd38d",
          borderRadius: "8px",
          textAlign: "center"
        }}>
          No chat selected. Please select a chat to start a video call.
        </div>
      )}
      
      {!callUrl ? (
        <div style={{ textAlign: "center" }}>
          <button
            onClick={startCall}
            disabled={loading || !chatId}
            style={{
              padding: "14px 28px",
              borderRadius: "8px",
              background: loading ? "#a0aec0" : !chatId ? "#cbd5e0" : "#ff1a75",
              color: "white",
              border: "none",
              cursor: (loading || !chatId) ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              minWidth: "180px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "all 0.2s ease"
            }}
          >
            {loading ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg style={{ width: "20px", height: "20px", marginRight: "8px", animation: "spin 1s linear infinite" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {callStatus === "creating" ? "Creating Call..." : "Joining Call..."}
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg style={{ width: "20px", height: "20px", marginRight: "8px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Start Video Call
              </div>
            )}
          </button>
          
          {chatId && (
            <div style={{ marginTop: "15px", color: "#4a5568", fontSize: "14px" }}>
              Starting a video call for chat: {chatId}
            </div>
          )}
        </div>
      ) : (
        <div>
          <div style={{ 
            marginBottom: "15px", 
            padding: "10px",
            borderRadius: "8px",
            textAlign: "center",
            backgroundColor: "#c6f6d5",
            border: "1px solid #9ae6b4"
          }}>
            <p style={{ color: "#22543d", margin: 0 }}>
              Connected to video call for chat: {chatId}
            </p>
          </div>
          
          <VideoCall url={callUrl} onLeave={handleLeaveCall} />
          
          <div style={{ marginTop: "15px", textAlign: "center" }}>
            <button
              onClick={handleLeaveCall}
              style={{
                padding: "10px 20px",
                borderRadius: "6px",
                background: "#e53e3e",
                color: "white",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px"
              }}
            >
              <svg style={{ width: "16px", height: "16px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Leave Call
            </button>
          </div>
        </div>
      )}
      
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default VideoCallApp;