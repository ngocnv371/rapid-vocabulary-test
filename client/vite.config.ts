import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import zalo from "zmp-vite-plugin";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  return {
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
    plugins: [react(), zalo()],
    base: "./",
    define: {
      "process.env.SUPABASE_URL": JSON.stringify(env.SUPABASE_URL),
      "process.env.SUPABASE_ANON_KEY": JSON.stringify(env.SUPABASE_ANON_KEY),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunk for React and related libraries
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            // Vendor chunk for Zalo Mini Program libraries
            'vendor-zmp': ['zmp-sdk', 'zmp-ui'],
            // Vendor chunk for Supabase
            'vendor-supabase': ['@supabase/supabase-js'],
          },
        },
      },
      // Increase chunk size warning limit (default is 500kb)
      chunkSizeWarningLimit: 1000,
    },
  };
});
