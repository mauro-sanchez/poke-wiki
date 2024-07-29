const { webpackConfig, merge } = require("@rails/webpacker");

const customConfig = {
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
    ],
  },
};

module.exports = merge(webpackConfig, customConfig);
