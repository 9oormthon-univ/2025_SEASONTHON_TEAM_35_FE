import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    svgr(), // SVG를 React 컴포넌트처럼 import 가능하게
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // "@/..." 형태로 import 가능
    },
  },
})
