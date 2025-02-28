import { defineConfig } from 'father';

export default defineConfig({
    // more father config: https://github.com/umijs/father/blob/master/docs/config.md

    platform: 'browser',
    esm: {
        output: 'dist',
        input: 'src',
        ignores: ['src/**/demo.{tsx,ts}'],
    },
});
