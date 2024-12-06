import { resolve } from "path";
// eslint-disable-next-line import/namespace
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  server: {
    host: "localhost",
    port: 5173
  },
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        tradesmen: resolve(__dirname, "src/tradesmen/index.html"),
        join: resolve(__dirname, "src/join/index.html"),
        proximity: resolve(__dirname, "src/proximity/index.html")
      },
    },
  },
});


   
 
  
