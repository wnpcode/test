import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { VitePWA } from "vite-plugin-pwa";
import dotenv from "dotenv";
// Load environment variables
dotenv.config();

// const manifestForPlugin = {
//   registerType: "prompt",
//   includesAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
//   manifest: {
//     name: "PSP POS",
//     short_name: "POs",
//     start_url: "index.html",
//     icons: [
//       {
//         src: "https://www.scoms.com/media/12178/jobs.png",
//         sizes: "192x192",
//         type: "image/png",
//       },
//     ],
//     background_color: "#3E4EB8",
//     display: "standalone",
//     theme_color: "#2E3AA1",
//   },
// };

export default defineConfig({
  // plugins: [react(), VitePWA(manifestForPlugin)],
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
