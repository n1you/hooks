import { defineConfig } from 'dumi';

export default defineConfig({
    outputPath: 'docs-dist',
    themeConfig: {
        name: 'Al-hooks',
    },
    chainWebpack(config) {
        config.module
            .rule('worker')
            .test(/\.worker\.(j|t)s$/)
            .use('worker-loader')
            .loader('worker-loader')
            .options({
                inline: 'no-fallback', // 将 worker 内联为 Blob
            });
    },
});
