// vite.config.ts
import Inspect from 'vite-plugin-inspect';
import { resolve } from 'path';

export default {
  define: {
    global: {},
  },
  resolve: {
    alias: {
      crypto: 'crypto-js',
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
    rollupOptions: {
      input: {
        index: resolve(__dirname, './index.html'),
      },
    },
  },
  server: {
    port: 4000,
  },
  preview: {
    port: 3000,
  },
  plugins: [
    Inspect(),
  ],
};
