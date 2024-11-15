// vite.config.ts
import { defineConfig } from "file:///Users/adriennerio/Documents/auth-client/node_modules/vite/dist/node/index.js";
import react from "file:///Users/adriennerio/Documents/auth-client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { extname, relative, resolve } from "path";
import { fileURLToPath } from "node:url";
import { glob } from "file:///Users/adriennerio/Documents/auth-client/node_modules/glob/dist/esm/index.js";
import dts from "file:///Users/adriennerio/Documents/auth-client/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/adriennerio/Documents/auth-client";
var __vite_injected_original_import_meta_url = "file:///Users/adriennerio/Documents/auth-client/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    dts({
      include: ["src"],
      exclude: ["src/**/*.spec.tsx", "src/App.tsx", "src/main.tsx"],
      tsconfigPath: "./tsconfig.app.json",
      insertTypesEntry: true
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      formats: ["es"],
      name: "@deriv-com/auth-client",
      fileName: "auth-client"
    },
    copyPublicDir: false,
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "react-dom", "@deriv-com/utils"],
      input: Object.fromEntries(
        glob.sync("src/**/*.{ts,tsx}", {
          ignore: [
            "**/*.test.ts",
            "**/*.test.tsx",
            "**/*.spec.ts",
            "**/*.spec.tsx",
            "**/__tests__/**",
            "./src/App.tsx",
            "./src/main.tsx"
          ]
        }).map((file) => {
          return [
            // The name of the entry point
            // src/nested/foo.ts becomes nested/foo
            relative("src", file.slice(0, file.length - extname(file).length)),
            // The absolute path to the entry file
            // src/nested/foo.ts becomes /project/src/nested/foo.ts
            fileURLToPath(new URL(file, __vite_injected_original_import_meta_url))
          ];
        })
      ),
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWRyaWVubmVyaW8vRG9jdW1lbnRzL2F1dGgtY2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYWRyaWVubmVyaW8vRG9jdW1lbnRzL2F1dGgtY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9hZHJpZW5uZXJpby9Eb2N1bWVudHMvYXV0aC1jbGllbnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyBleHRuYW1lLCByZWxhdGl2ZSwgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJztcbmltcG9ydCB7IGdsb2IgfSBmcm9tICdnbG9iJztcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW1xuICAgICAgICByZWFjdCgpLFxuICAgICAgICBkdHMoe1xuICAgICAgICAgICAgaW5jbHVkZTogWydzcmMnXSxcbiAgICAgICAgICAgIGV4Y2x1ZGU6IFsnc3JjLyoqLyouc3BlYy50c3gnLCAnc3JjL0FwcC50c3gnLCAnc3JjL21haW4udHN4J10sXG4gICAgICAgICAgICB0c2NvbmZpZ1BhdGg6ICcuL3RzY29uZmlnLmFwcC5qc29uJyxcbiAgICAgICAgICAgIGluc2VydFR5cGVzRW50cnk6IHRydWUsXG4gICAgICAgIH0pLFxuICAgIF0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgICBsaWI6IHtcbiAgICAgICAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9pbmRleC50cycpLFxuICAgICAgICAgICAgZm9ybWF0czogWydlcyddLFxuICAgICAgICAgICAgbmFtZTogJ0BkZXJpdi1jb20vYXV0aC1jbGllbnQnLFxuICAgICAgICAgICAgZmlsZU5hbWU6ICdhdXRoLWNsaWVudCcsXG4gICAgICAgIH0sXG4gICAgICAgIGNvcHlQdWJsaWNEaXI6IGZhbHNlLFxuICAgICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgICAgICBleHRlcm5hbDogWydyZWFjdCcsICdyZWFjdC9qc3gtcnVudGltZScsICdyZWFjdC1kb20nLCAnQGRlcml2LWNvbS91dGlscyddLFxuICAgICAgICAgICAgaW5wdXQ6IE9iamVjdC5mcm9tRW50cmllcyhcbiAgICAgICAgICAgICAgICBnbG9iXG4gICAgICAgICAgICAgICAgICAgIC5zeW5jKCdzcmMvKiovKi57dHMsdHN4fScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlnbm9yZTogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcqKi8qLnRlc3QudHMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcqKi8qLnRlc3QudHN4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnKiovKi5zcGVjLnRzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnKiovKi5zcGVjLnRzeCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyoqL19fdGVzdHNfXy8qKicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy4vc3JjL0FwcC50c3gnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcuL3NyYy9tYWluLnRzeCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAubWFwKGZpbGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgbmFtZSBvZiB0aGUgZW50cnkgcG9pbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzcmMvbmVzdGVkL2Zvby50cyBiZWNvbWVzIG5lc3RlZC9mb29cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZSgnc3JjJywgZmlsZS5zbGljZSgwLCBmaWxlLmxlbmd0aCAtIGV4dG5hbWUoZmlsZSkubGVuZ3RoKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGFic29sdXRlIHBhdGggdG8gdGhlIGVudHJ5IGZpbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzcmMvbmVzdGVkL2Zvby50cyBiZWNvbWVzIC9wcm9qZWN0L3NyYy9uZXN0ZWQvZm9vLnRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVVSTFRvUGF0aChuZXcgVVJMKGZpbGUsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAgICAgICBhc3NldEZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV1bZXh0bmFtZV0nLFxuICAgICAgICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnW25hbWVdLmpzJyxcbiAgICAgICAgICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlYWN0OiAnUmVhY3QnLFxuICAgICAgICAgICAgICAgICAgICAncmVhY3QtZG9tJzogJ1JlYWN0RE9NJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBTLFNBQVMsb0JBQW9CO0FBQ3ZVLE9BQU8sV0FBVztBQUNsQixTQUFTLFNBQVMsVUFBVSxlQUFlO0FBQzNDLFNBQVMscUJBQXFCO0FBQzlCLFNBQVMsWUFBWTtBQUNyQixPQUFPLFNBQVM7QUFMaEIsSUFBTSxtQ0FBbUM7QUFBK0ksSUFBTSwyQ0FBMkM7QUFRek8sSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sSUFBSTtBQUFBLE1BQ0EsU0FBUyxDQUFDLEtBQUs7QUFBQSxNQUNmLFNBQVMsQ0FBQyxxQkFBcUIsZUFBZSxjQUFjO0FBQUEsTUFDNUQsY0FBYztBQUFBLE1BQ2Qsa0JBQWtCO0FBQUEsSUFDdEIsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNILEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDbkM7QUFBQSxFQUNKO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDSCxLQUFLO0FBQUEsTUFDRCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ3hDLFNBQVMsQ0FBQyxJQUFJO0FBQUEsTUFDZCxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsSUFDZDtBQUFBLElBQ0EsZUFBZTtBQUFBLElBQ2YsZUFBZTtBQUFBLE1BQ1gsVUFBVSxDQUFDLFNBQVMscUJBQXFCLGFBQWEsa0JBQWtCO0FBQUEsTUFDeEUsT0FBTyxPQUFPO0FBQUEsUUFDVixLQUNLLEtBQUsscUJBQXFCO0FBQUEsVUFDdkIsUUFBUTtBQUFBLFlBQ0o7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNKO0FBQUEsUUFDSixDQUFDLEVBQ0EsSUFBSSxVQUFRO0FBQ1QsaUJBQU87QUFBQTtBQUFBO0FBQUEsWUFHSCxTQUFTLE9BQU8sS0FBSyxNQUFNLEdBQUcsS0FBSyxTQUFTLFFBQVEsSUFBSSxFQUFFLE1BQU0sQ0FBQztBQUFBO0FBQUE7QUFBQSxZQUdqRSxjQUFjLElBQUksSUFBSSxNQUFNLHdDQUFlLENBQUM7QUFBQSxVQUNoRDtBQUFBLFFBQ0osQ0FBQztBQUFBLE1BQ1Q7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNKLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLFFBQ2hCLFNBQVM7QUFBQSxVQUNMLE9BQU87QUFBQSxVQUNQLGFBQWE7QUFBQSxRQUNqQjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
