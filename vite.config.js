import { defineConfig, optimizeDeps } from "vite";

export default defineConfig({
  optimizeDeps: {
    include: ["firebase/app", "firebase/auth", "firebase/firestore"],
  },
});
