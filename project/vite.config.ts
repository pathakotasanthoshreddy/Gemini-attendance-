import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    https: false,
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: ['s4foru.in', 'www.s4foru.in'],
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

