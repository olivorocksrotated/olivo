import { defineConfig } from 'cypress';

export default defineConfig({
    component: {
        devServer: {
            framework: 'next',
            bundler: 'webpack'
        }
    },
    reporter: 'progress',
    video: false
});
