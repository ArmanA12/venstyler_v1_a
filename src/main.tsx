import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import { ApiProvider } from "./contexts/ApiContext";
import { NotificationsProvider } from "./contexts/NotificationContext";

const queryClient = new QueryClient();


createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ApiProvider>
        <NotificationsProvider>
          <App />
        </NotificationsProvider>
      </ApiProvider>
    </AuthProvider>
  </QueryClientProvider>
);
