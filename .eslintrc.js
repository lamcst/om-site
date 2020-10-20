module.exports = {
    root: true,
    env: {
      browser: true,
      node: true
    },
    parser: 'babel-eslint',
    parserOptions: {
      
      allowImportExportEverywhere: true,
      ecmaVersion: 2018,
      sourceType: 'module'
    },
    extends: [
      'plugin:react/recommended',
      'plugin:prettier/recommended'
    ],
    plugins: [],
    // add your custom rules here
    rules: {
        "react/prop-types": 1
    }
  }