module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:react/jsx-runtime"],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "modules": true
    }
  },
  "plugins": ["react", "import"],
  "rules": {
    "linebreak-style": 0,
    "semi": 0,
    "arrow-body-style": 0,
    "class-methods-use-this": 0,
    "comma-dangle": [0],
    "import/imports-first": 0,
    "import/newline-after-import": 0,
    "import/no-dynamic-require": 0,
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": 1,
    "import/no-webpack-loader-syntax": 0,
    "import/prefer-default-export": 0,
    "import/named": 0,
    "import/default": 0,
    "import/namespace": 0,
    "max-len": 0,
    "newline-per-chained-call": 0,
    "no-confusing-arrow": 1,
    "no-console": 1,
    "no-unused-vars": 1,
    "no-mixed-spaces-and-tabs": 0,
    "no-useless-escape": 0,
    "no-use-before-define": 0,
    "prefer-template": 1,
    "react/jsx-closing-tag-location": 0,
    "react/forbid-prop-types": 0,
    "react/jsx-first-prop-new-line": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-no-target-blank": 0,
    "react/prop-types": 0,
    "react/require-default-props": 0,
    "react/require-extension": 0,
    "react/self-closing-comp": 1,
    "react/destructuring-assignment": 0,
    "react/sort-comp": 0,
    "react/display-name": 0,
    "require-yield": 0,
    "react/self-closing-comp": 1,
    "react/no-unknown-property": 1
  }
}
