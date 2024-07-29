const { generateWebpackConfig } = require("webpack");

const options = {
  resolve: {
    extensions: [
      ".jsx",
      ".mjs",
      ".js",
      ".cjs",
      ".sass",
      ".scss",
      ".css",
      ".module.sass",
      ".module.scss",
      ".module.css",
      ".png",
      ".svg",
      ".gif",
      ".jpeg",
      ".jpg",
      ".webp",
      ".esm.mjs",
    ],
  },
};

module.exports = generateWebpackConfig(options);
