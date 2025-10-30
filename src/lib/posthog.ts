import posthog from 'posthog-js'

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  autocapture: true, // Automatically track clicks, pageviews, etc.
  capture_pageview: true,
  capture_pageleave: true,
})

export default posthog
