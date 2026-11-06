import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react() ,  tailwindcss()],
  build: {
    target: "esnext",
    minify: "esbuild",
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three") || id.includes("three-stdlib")) {
            return "three-vendor";
          }
          if (id.includes("@react-three") || id.includes("three-mesh-bvh") || id.includes("maath")) {
            return "three-ecosystem";
          }
          if (id.includes("gsap") || id.includes("gsap-trial")) {
            return "gsap-vendor";
          }
          if (id.includes("react-icons")) {
            return "icons-vendor";
          }
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("scheduler")
          ) {
            return "react-vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1200,
  },
});
