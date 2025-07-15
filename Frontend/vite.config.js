import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Firebase serves from the root by default
  build: {
    outDir: 'dist', // Ensure the output directory matches Firebase's hosting directory
    sourcemap: false, // Disable source maps for production (optional)
  },
});
