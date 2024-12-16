import { resolve } from "path";
// eslint-disable-next-line import/namespace
import { defineConfig } from "vite";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  root: "src/",
  server: {
    host: "localhost",
    port: 5173,
  },
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        tradesmen: resolve(__dirname, "src/tradesmen/tradesmen.html"),
        join: resolve(__dirname, "src/join/join.html"),
        about: resolve(__dirname, "src/about/about.html"),
        thankyou: resolve(__dirname, "src/thankyou/index.html"),
      },
    },
  },
});
