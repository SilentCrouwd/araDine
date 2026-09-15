import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  base: "/araDine",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router")
            ) {
              return "react-vendor";
            }

            if (id.includes("date-fns")) {
              return "date-vendor";
            }

            if (
              id.includes("react-day-picker") ||
              id.includes("@base-ui") ||
              id.includes("lucide-react")
            ) {
              return "ui-vendor";
            }

            if (id.includes("@supabase")) {
              return "supabase-vendor";
            }

            if (id.includes("tailwind") || id.includes("@tailwindcss")) {
              return "tailwind-vendor";
            }
          }
        },
      },
    },
  },
});
