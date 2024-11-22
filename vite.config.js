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
      "@Components": path.resolve("./src/Components"),
      "@ui": path.resolve("./src/Components/ui"),
      "@public": path.resolve("./public"), // public 폴더 경로
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
