import react from "@vitejs/plugin-react-swc";

import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      pages: "/src/pages",
      features: "/src/features",
      assets: "/src/assets",
      hooks: "/src/hooks",
      widgets: "/src/widgets",
      styles: "/src/styles",
    },
  },
  base: "/cats-gallery",
});
