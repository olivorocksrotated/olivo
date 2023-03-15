import webpackPreprocessor from '@cypress/webpack-preprocessor';
import { defineConfig } from 'cypress';
import path from 'path';


export default defineConfig({
    component: {
        devServer: {
            framework: 'next',
            bundler: 'webpack'
        },
        setupNodeEvents(on, config) {
            const options = {
                webpackOptions: {
                    resolve: {
                        extensions: ['.ts', '.tsx', '.js', '.jsx'],
                        alias: {
                            '@': path.resolve(__dirname, './src')
                        }
                    }
                }
            };

            on('file:preprocessor', webpackPreprocessor(options));

            return config;
        }
    },
    reporter: 'progress',
    video: false
});
