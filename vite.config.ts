import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    dts({ include: ["src"], bundleTypes: true, tsconfigPath: "./tsconfig.app.json" }),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "coco.js" : "coco.cjs"),
      cssFileName: "styles",
    },
    rollupOptions: {
      // Everything in dependencies + peerDependencies stays external so consumers
      // resolve a single copy of Radix, React and the class utilities.
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "class-variance-authority",
        "clsx",
        "cmdk",
        "dayjs",
        "dayjs/plugin/customParseFormat",
        "framer-motion",
        "highlightjs-curl",
        "input-otp",
        "lucide-react",
        "radix-ui",
        "react-day-picker",
        "react-hook-form",
        "react-resizable-panels",
        "react-syntax-highlighter",
        "recharts",
        "sonner",
        "tailwind-merge",
        "vaul",
      ],
    },
  },
});
