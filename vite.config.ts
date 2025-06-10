import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs/promises';
import svgr from '@svgr/rollup';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            src: resolve(__dirname, 'src')
        }
    },
    esbuild: {
        loader: 'tsx',
        include: /src\/.*\.tsx?$/,
        exclude: []
    },
    build: {
        outDir: 'build' // Check if this is set
    },
    server: {
        watch: {
            usePolling: true // Useful for some environments (like Docker, WSL, or network shares)
        },
        hmr: true // HMR is enabled by default, but you can set this explicitly
    },

    optimizeDeps: {
        esbuildOptions: {
            plugins: [
                {
                    name: 'load-js-files-as-tsx',
                    setup(build) {
                        build.onLoad({ filter: /src\\.*\.js$/ }, async (args) => ({
                            loader: 'tsx',
                            contents: await fs.readFile(args.path, 'utf8')
                        }));
                    }
                }
            ]
        }
    },

    // plugins: [react(),svgr({
    //   exportAsDefault: true
    // })],

    plugins: [svgr(), react()]
});
