import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import environment from "vite-plugin-environment";

// import devtools from 'solid-devtools/vite';

export default defineConfig({
  // for this setup, the envDir is set to the root of the project
  envDir: "../../",
  define: {
    global: "window",
  },
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
