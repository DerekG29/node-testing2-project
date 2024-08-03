import globals from "globals";
import pluginJs from "@eslint/js";
import jest from 'eslint-plugin-jest';

const jestConfig = {
  files: ['**/*.spec.js'],
  plugins: { jest },
  rules: { ...jest.configs.recommended.rules },
  languageOptions: {
    globals: { ...globals.jest }
  }
}

export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
];