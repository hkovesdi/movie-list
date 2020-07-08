module.exports = {
    extends: ["eslint:recommended", "plugin:vue/recommended"],
    rules: {
        // override/add rules settings here, such as:
        "no-undef": "off",
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
        // 'vue/no-unused-vars': 'error'
    }
};
