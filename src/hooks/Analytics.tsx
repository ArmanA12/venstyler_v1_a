import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Extend the Window interface to include 'gtag' method
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const Analytics: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Send page view to Google Analytics on route change
    if (window.gtag) {
      window.gtag("config", "G-HMJD4JK1YK", {
        page_path: location.pathname + location.search, // Full URL (including query params)
      });
    }
  }, [location]);

  return null;
};

export default Analytics;
