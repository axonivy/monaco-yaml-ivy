import { defineConfig } from 'vite';

export default defineConfig(() => ({
  resolve: {
    alias: {
      'monaco-editor/esm/vs/editor/editor.worker.js': 'monaco-editor/editor/editor.worker.js'
    }
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 5000
  },
  base: './'
}));
