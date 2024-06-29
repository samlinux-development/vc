import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import environment from "vite-plugin-environment";
import dotenv from "dotenv";

// import devtools from 'solid-devtools/vite';

dotenv.config();

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" })
  ],
  build: {
    target: 'esnext',
  }
});
