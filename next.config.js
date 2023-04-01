/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true,
        swcPlugins: [['next-superjson-plugin', {}]]
    }
};

module.exports = nextConfig;
