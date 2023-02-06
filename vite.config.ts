import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import linaria from '@linaria/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/pong/',
  plugins: [
    linaria({
      include: ['**/*.{ts,tsx}'],
      babelOptions: {
        presets: ['@babel/preset-typescript', '@babel/preset-react'],
      },
    }),
    react(),
  ],
});
