import eslintPluginReact from "eslint-plugin-react";
import eslintPluginNext from "@next/eslint-plugin-next";
import eslintPluginTypescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

const ignoreConfig = {
    ignores: [
        "node_modules/**",
        "out/**",
        ".next/**",
    ],
};

const baseConfig = {
    files: ["**/*.{js,ts,tsx}"], // Match JavaScript/TypeScript files
    languageOptions: {
        parser: typescriptParser, // Use the imported parser
        ecmaVersion: 2020, // Enable modern syntax
        sourceType: "module",
        globals: {
            browser: true,
            node: true,
            jest: true
        }
    },
    plugins: {
        react: eslintPluginReact,
        "@typescript-eslint": eslintPluginTypescript,
        "@next/next": eslintPluginNext,
    },
    rules: {
        "react/react-in-jsx-scope": "off",
        "react/display-name": "off",
        "react/prop-types": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-member-accessibility": "off",
        "@typescript-eslint/indent": "off",
        "@typescript-eslint/member-delimiter-style": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "no-console": [
            "error",
            {
                allow: ["warn", "error"]
            }
        ]
    },
    settings: {
        react: {
            version: "detect"
        }
    }
};

export default [ignoreConfig, baseConfig];
