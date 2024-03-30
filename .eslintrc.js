/* eslint-env node */
// require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  // required to lint *.vue files
  plugins: ['vue', 'html'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    '@electron-toolkit',
    '@electron-toolkit/eslint-config-ts/eslint-recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier'
  ],
  rules: {
    '@typescript-eslint/ban-types': 'off', // TODO - 有待商榷
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off',
    // 自己写一些想配置的规则
    '@typescript-eslint/no-var-requires': 'off',
    semi: 'off',
    'linebreak-style': [0, 'error', 'window'],
    'no-console': 'off', // 生产环境禁用consele
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 生产环境禁用debugger
    'vue/max-attributes-per-line': 'off', // 关闭强制 html 标签换行
    'no-param-reassign': [
      'error',
      {
        props: false
      }
    ], // 允许修改参数中的属性值
    'prefer-destructuring': [
      'error',
      {
        object: true,
        array: false
      }
    ], // 允许数组通过下标取值
    'max-len': 'off', // 对象选项
    'no-use-before-define': 'off', // 允许定义之前使用
    'func-names': 'off', // 允许使用匿名函数
    'no-shadow': [
      'error',
      {
        allow: ['state']
      }
    ], // 允许对其进行阴影处理
    'import/prefer-default-export': 'off', // 模块只输出一个变量时，是否需要添加default
    'no-plusplus': 'off', // 一元运算符
    'import/no-extraneous-dependencies': 'off',
    'import/order': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-duplicates': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'comma-dangle': 'off',
    'object-curly-newline': 'off',
    'import/no-absolute-path': 'off',
    'arrow-parens': 'off',
    'consistent-return': 'off',
    'no-unused-expressions': 'off',
    'arrow-body-style': 'off',
    radix: 'off',
    'no-underscore-dangle': 'off',
    'global-require': 'off',
    'no-bitwise': 'off',
    'import/no-dynamic-require': 'off',
    'prettier/prettier': 'error'
  },
  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
    extraFileExtensions: ['.vue'],
    ecmaFeatures: {
      jsx: true
    }
  }
}
