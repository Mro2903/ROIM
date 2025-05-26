/**
 * Next.js configuration file that defines custom settings for the application.
 * This configuration includes:
 * - Image optimization settings for remote image sources
 * - Webpack configuration for handling Node.js built-in modules in the browser
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /**
     * Image optimization configuration
     * Defines allowed remote image sources for Next.js Image component
     */
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
    /**
     * Webpack configuration
     * Adds polyfills for Node.js built-in modules to work in the browser
     * @param {NextConfig} config - The webpack configuration object
     * @returns {NextConfig} Modified webpack configuration
     */
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
