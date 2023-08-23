
import { defineConfig } from 'vite';

export default defineConfig(() => {
  const config = {
    build: { 
      outDir: 'dist', 
      chunkSizeWarningLimit: 5000 ,
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`
        }
      }
    },
    resolve: {
      alias: { path: 'path-browserify' }
    },
    base: './',
  };
  return config;
});
