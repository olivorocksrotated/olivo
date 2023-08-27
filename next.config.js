/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
});

const nextConfig = {
    reactStrictMode: true,
    experimental: {
        serverActions: true,
        outputFileTracingExcludes: {
            '*': [
                './node_modules/@swc/core-linux-x64-gnu',
                './node_modules/@swc/core-linux-x64-musl',
                './node_modules/@esbuild/linux-x64'
            ]
        }
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com'
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com'
            }
        ]
    }
};

module.exports = withBundleAnalyzer(nextConfig);
