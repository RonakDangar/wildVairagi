import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    port: 3000,
    host: '0.0.0.0',
  },
  define: {
    'process.env': process.env,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000, // Adjust this number to your desired limit
  }
});
