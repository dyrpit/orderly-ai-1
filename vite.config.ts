import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@assets": `${path.resolve(__dirname, "./src/assets/")}`,
      "@buttons": `${path.resolve(__dirname, "./src/components/buttons")}`,
      "@components": `${path.resolve(__dirname, "./src/components/")}`,
      "@data": `${path.resolve(__dirname, "./src/data/")}`,
      "@types": `${path.resolve(__dirname, "./src/types/")}`,
      "@util": `${path.resolve(__dirname, "./src/util/")}`,
    }
  }
})
