import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path, { resolve } from 'path';

import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      cleanVueFileName: true,
      include: 'packages/**/*'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      name: 'CraneElement',
      fileName: (format) => `crane-element.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
});
