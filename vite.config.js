
import { defineConfig } from 'vite';

export default defineConfig(() => {
  const config = {
    build: { 
      outDir: 'dist', 
      chunkSizeWarningLimit: 5000
    },
    base: './',
  };
  return config;
});
