import js from "@eslint/js";
import babelParser from "@babel/eslint-parser";
import eslintPluginReact from "eslint-plugin-react";
import react from "react";

export default [
  js.configs.recommended,
  {
    files: ["**/*.jsx"],
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
    },
    languageOptions: {
      parser: babelParser,
    },
    plugins: { eslintPluginReact, react },
    rules: {
      "eslintPluginReact/jsx-uses-react": "error",
      "eslintPluginReact/jsx-uses-vars": "error",
    },
  },
];
