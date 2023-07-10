import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.e2e.spec.ts'],
    globals: true,
    root: './',
    alias: {
      '@Configs': './src/configs',
      '@Core': './src/core',
      '@Domain': './src/domain',
      '@Application': './src/application',
      '@Infra': './src/infra',
      '@Testing': './test',
    },
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});
