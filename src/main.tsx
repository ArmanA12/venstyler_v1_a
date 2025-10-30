import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import { ApiProvider } from "./contexts/ApiContext";
import { NotificationsProvider } from "./contexts/NotificationContext";
import { PostHogProvider } from 'posthog-js/react'
import posthog from './lib/posthog'
const queryClient = new QueryClient();


createRoot(document.getElementById("root")!).render(
   <PostHogProvider client={posthog}>
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ApiProvider>
        <NotificationsProvider>
          <App />
        </NotificationsProvider>
      </ApiProvider>
    </AuthProvider>
  </QueryClientProvider>
  </PostHogProvider>
);


// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { PostHogProvider } from 'posthog-js/react'

// const options = {
//   api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
//   defaults: '2025-05-24',
// }

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <PostHogProvider apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY} options={options}>
//       <App />
//     </PostHogProvider>
//   </StrictMode>,
// );

// posthog.capture('my event', { property: 'value' })