module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
  },
  testPathIgnorePatterns: ["config"],
  transform: {
    // "^.+\\.svg$": "svg-jest",
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.(ts|tsx|js)?$": "ts-jest",
    "\\.(svg|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/fileTransformer.cjs",
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!react-responsive-pagination)",
  ],
};
