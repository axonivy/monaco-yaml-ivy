
import { defineConfig } from 'vite';

export default defineConfig(() => {
  const config = {
    build: { outDir: 'dist', chunkSizeWarningLimit: 5000 },
    resolve: {
      alias: { path: 'path-browserify' }
    },
    base: './',
  };
  return config;
});
