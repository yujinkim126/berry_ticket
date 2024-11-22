import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "tailwindcss";
import path from "path";
import { fileURLToPath } from "url";

// 현재 모듈의 디렉토리 경로를 가져오기 위한 __dirname 유사 구현
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@ui": path.resolve(__dirname, "./src/components/ui"),
      "@public": path.resolve(__dirname, "./public"),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
