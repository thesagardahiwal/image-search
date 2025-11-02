import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist', // ✅ Vercel will serve from here
  },
  base: './', // ✅ Ensures assets and routes resolve correctly in production
  server: {
    port: 5173, // (optional) for local dev consistency
  },
})
