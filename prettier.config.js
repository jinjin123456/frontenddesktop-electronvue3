/** @type {import("prettier").Options} */
module.exports = {
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  endOfLine: 'lf',
  importOrder: [
    '<TYPES>',
    '<TYPES>^[.]',
    '',
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/(.*)$',
    '',
    '^[.]'
  ]
}
