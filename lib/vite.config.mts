import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import path from 'path';
import dts from 'vite-plugin-dts';
import AutoImport from 'unplugin-auto-import/vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        dts({ tsconfigPath: './tsconfig.app.json' }),
        AutoImport({
            // Targets to transform
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/,
                /\.vue\?vue/, // .vue
            ],
            // Global imports to register
            imports: [
                // Presets
                'vue', // Automatically imports APIs like ref, computed, watch, etc.
                'vitest', // If you use Vitest
                // 'vue-router', // If you use Vue Router
            ],
            // Generate a tsconfig file to ensure TypeScript type safety
            dts: './auto-imports.d.ts',
        }),
        // Copy the README.md file down to the lib folder, so that it shows up on npmjs.org
        viteStaticCopy({
            targets: [
                {
                    // The 'src' path is relative to the package root (the 'lib' folder)
                    src: '../README.md', // Go up one level to the monorepo root
                    dest: '..', // The 'dest' path is relative to the 'dist' folder
                },
            ],
        }),
    ],

    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'Windvane',
            fileName: (format) => `windvane.${format}.js`,
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['vue'],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
