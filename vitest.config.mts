import path from 'path';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
    test: {
        environment: 'jsdom',
        reporters: ['basic'],
        coverage: {
            reporter: ['text-summary']
        },
        clearMocks: true,
        setupFiles: [
            './src/lib/tests/matchers.ts',
            './src/lib/__mocks__/next-auth.ts',
            './src/lib/__mocks__/next-cache.ts',
            './src/lib/__mocks__/prisma.ts',
            './src/lib/__mocks__/inngest.ts',
            './src/lib/__mocks__/console.ts',
            './src/lib/__mocks__/fetch.ts'
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
});
