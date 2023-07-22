/* eslint-disable @typescript-eslint/ban-ts-comment */
import swc from 'unplugin-swc';
import { configDefaults, defineConfig } from 'vitest/config';

import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    globals: true,
    root: './',
    exclude: [...configDefaults.exclude, './src/infra/http/controllers/**/*'],
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
