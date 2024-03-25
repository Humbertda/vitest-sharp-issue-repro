import { resolve } from 'path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
  },
  resolve: {
    alias: {
      '@lib': resolve(__dirname, 'lib'),
      '@node': resolve(__dirname, 'apps/node/src'),
      '@server': resolve(__dirname, 'apps/server/src'),
    },
  },
  build: {
    rollupOptions: {
      external: ['sharp'],
    },
  },
});
