import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ApiProvider } from "./contexts/ApiContext.tsx";
import { NotificationsProvider } from "./contexts/NotificationContext.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ApiProvider>
      <NotificationsProvider>
        <App />
      </NotificationsProvider>
    </ApiProvider>
  </AuthProvider>
);
