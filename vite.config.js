const { defineConfig } = require("vite");
const path = require("path");

module.exports = defineConfig({
  root: "src", // Define the root directory for Vite
  build: {
    outDir: path.resolve(__dirname, "public"), // Output to the `public` folder
    emptyOutDir: false, // Do not clear the `public` folder
    rollupOptions: {
      input: path.resolve(__dirname, "src/js/index.js"), // Entry point for your JS
      output: {
        entryFileNames: "bundle.js", // Output file name
      },
    },
  },
  server: {
    port: 3001, // Development server port
    strictPort: true,
    open: false, // Prevent auto-opening of the browser
  },
});
