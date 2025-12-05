import { defineConfig } from 'vite';

export default defineConfig(() => ({
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 5000
  },
  base: './'
}));
