import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {
      compress: true,
      mangle: true
    }
  },
  server: {
    port: 5173,
    open: true
  }
})
