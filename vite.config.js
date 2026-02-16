import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import apiPlugin from './api-plugin.js';

export default defineConfig({
  plugins: [react(), apiPlugin()],
  server: {
    port: 8000,
    allowedHosts: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});
