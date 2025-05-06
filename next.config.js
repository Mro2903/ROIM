// For CommonJS (next.config.js):
const nextConfig = {
    images: {
        domains: ["utfs.io"]
    },
    webpack: (config) => {
        // Add aliases for "node:" protocols
        config.resolve.alias = {
            ...config.resolve.alias,
            "node:crypto": "crypto-browserify",
            "node:stream": "stream-browserify", // Include if needed
        };

        // Add fallbacks (as before)
        config.resolve.fallback = {
            crypto: require.resolve("crypto-browserify"),
            stream: require.resolve("stream-browserify"),
        };
        return config;
    },
};

module.exports = nextConfig;