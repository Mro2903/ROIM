import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io",
                port: "",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "picsum.photos",
                port: "",
                pathname: "/**"
            },
        ]
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
