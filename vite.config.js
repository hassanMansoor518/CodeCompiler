import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  darkMode: "class",
  plugins: [react(), tailwindcss()],
  server: {
    host: true,       // <-- network devices (mobile) ke liye open kare
    port: 5173,       // optional
    strictPort: true, // agar port busy ho to error show kare
  }
})
