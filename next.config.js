/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: '*',
                protocol: 'http',
            },
            {
                hostname: '*',
                protocol: 'https',
            },
        ],
    },
    reactStrictMode: false,
    env: {
        WC_PROJECT_ID: process.env.WC_PROJECT_ID,
        PEANUT_API_KEY: process.env.PEANUT_API_KEY,
        GA_KEY: process.env.GA_KEY,
        PROMO_LIST: process.env.PROMO_LIST,
        SENTRY_DSN: process.env.SENTRY_DSN,
        NOTIFY_API_SECRET: process.env.NOTIFY_API_SECRET,
        DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
    },
    async rewrites() {
        return {
            beforeFiles: [
                {
                    source: '/apple-app-site-association',
                    destination: '/api/apple-app-site-association',
                },
                {
                    source: '/.well-known/assetLinks.json',
                    destination: '/api/assetLinks',
                },
            ],
        }
    },
    async redirects() {
        return [
            {
                source: '/docs',
                destination: 'https://docs.peanut.to',
                permanent: false,
                basePath: false,
            },
            {
                source: '/packet',
                destination: '/raffle/claim',
                permanent: true,
            },
            {
                source: '/create-packet',
                destination: '/raffle/create',
                permanent: true,
            },
        ]
    },
    async headers() {
        return [
            {
                source: '/apple-app-site-association',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'application/json',
                    },
                ],
            },
            {
                source: '/.well-known/assetlinks.json',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'application/json',
                    },
                ],
            },
            {
                source: '/(.*)',
                headers: [{ key: 'X-Frame-Options', value: 'DENY' }],
            },
        ]
    },
}

module.exports = nextConfig
