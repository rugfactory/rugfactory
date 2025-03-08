import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      '@': '/src',
      buffer: 'buffer',
    },
  },
  define: {
    'global': 'globalThis',
    'process.env': {},
    'window.ethereum': 'window.ethereum || null'
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          buffer: ['buffer'],
          'near-api': ['near-api-js', '@near-js/providers']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['buffer', '@near-js/providers', 'near-api-js'],
    esbuildOptions: {
      define: {
        global: 'globalThis',
        Buffer: ['buffer', 'Buffer']
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true
        })
      ]
    }
  }
})