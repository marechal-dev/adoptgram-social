/* eslint-disable @typescript-eslint/ban-ts-comment */
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    root: './src/infra/http/controllers',
    globals: true,
  },
  plugins: [
    //@ts-ignore
    tsconfigPaths(),
    //@ts-ignore
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});
