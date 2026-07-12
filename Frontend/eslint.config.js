import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import skipFormattingConfig from "@vue/eslint-config-prettier/skip-formatting";

export default [
    // 1. Global settings (applies to all files)
    {
        files: ["**/*.js", "**/*.vue"],
        ignores: ["node_modules/**", "dist/**", "public/**"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },

    // 2. Vue-specific rules (for .vue files)
    ...pluginVue.configs["flat/strongly-recommended"],
    skipFormattingConfig,

    // 3. Custom overrides
    {
        files: ["**/*.vue"],
        rules: {
            "vue/multi-word-component-names": "off",
            "vue/first-attribute-linebreak": "off",
            "vue/max-attributes-per-line": "off",
            "vue/require-v-for-key": "off",
        },
    },

    // 4. JavaScript-specific rules (optional)
    {
        files: ["**/*.js"],
        rules: {
            "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        },
    },
];
