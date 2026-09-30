import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));
const basePath = process.env.PAGES_BASE_PATH || '/d5-arco-landing';
export default defineConfig({
  root: resolve(projectRoot, 'pages'),
  base: `${basePath}/`,
  publicDir: resolve(projectRoot, 'public'),
  plugins: [react()],
  resolve: { alias: { '@': projectRoot } },
  define: { 'process.env.NEXT_PUBLIC_BASE_PATH': JSON.stringify(basePath) },
  css: { postcss: { plugins: [tailwindcss()] } },
  build: {
    outDir: resolve(projectRoot, 'dist/pages'),
    emptyOutDir: true,
    rollupOptions: { input: {
      home: resolve(projectRoot, 'pages/index.html'),
      garden: resolve(projectRoot, 'pages/share/garden/index.html'),
    } },
  },
});
