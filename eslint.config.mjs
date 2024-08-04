import globals from "globals";
import pluginJs from "@eslint/js";

const jestConfig = {
  files: ['**/*.test.js'],
  rules: { ...jest.configs.recommended.rules },
  languageOptions: {
    globals: { ...globals.jest }
  }
}

export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.node }},
  jestConfig,
  pluginJs.configs.recommended,
];