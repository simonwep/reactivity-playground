import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'ESNext',
    lib: {
      entry: 'src/index.ts',
      name: 'composition',
      formats: ['cjs', 'es', 'iife']
    }
  }
});
