/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
  server: {
    host: true,
    port: 4000,
    watch: {
      usePolling: true
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
});