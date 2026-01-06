const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configure Expo Router to use src/app as the root directory
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs'];

module.exports = config;
