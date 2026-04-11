import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'icon-192.png',
        'icon-512.png',
        'maskable_icon_x512.png',
        'screenshot-mobile.png',
        'screenshot-desktop.png',
      ],
      manifest: {
        name: 'StudioPlanner',
        short_name: 'StudioPlanner',
        description: 'Ballroom lesson planning & delivery',
        theme_color: '#1D69A2',
        background_color: '#1a1b1f',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'maskable_icon_x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        screenshots: [
          {
            src: 'screenshot-mobile.png',
            sizes: '383x839',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Build a session on mobile',
          },
          {
            src: 'screenshot-desktop.png',
            sizes: '1311x904',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Session builder on desktop',
          },
        ],
      },
    }),
  ],
})
