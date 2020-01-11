module.exports = {
    root: true,
    env: {
        node: true,
        jquery: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'no-console': 'off',
        'no-debugger': 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}