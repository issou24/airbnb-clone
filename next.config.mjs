/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'https://airbnb-clone-2-957822787686.europe-west9.run.app',
                port:'8000',
                pathname: '/**'
            }
        ]
    }
};

export default nextConfig;
