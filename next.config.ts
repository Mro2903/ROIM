import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["utfs.io", "picsum.photos"]
    },
    webpack: (config: NextConfig) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            "node:crypto": "crypto-browserify",
            "node:stream": "stream-browserify", // Include if needed
        };
        config.resolve.fallback = {
            crypto: require.resolve("crypto-browserify"),
            stream: require.resolve("stream-browserify"),
        };
        return config;
    }
};

export default nextConfig;
