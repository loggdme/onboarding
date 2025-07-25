import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      enableRouteGeneration: false,
      autoCodeSplitting: true,
    }),
    react(),
    tsconfigPaths(),
    tailwindcss(),
    analyzer({ enabled: process.env.ANALYZE_DEBUG === 'true' }),
  ],
});
