export default {
  entry: './src/index.tsx',
  disableTypeCheck: true,
  lessInBabelMode: true,
  extractCSS: true,
  cjs: {
    type: 'babel',
  },
  extraBabelPlugins: [
    ['babel-plugin-import', {
      libraryName: 'antd',
      libraryDirectory: 'lib',
      style: true,
    }],
  ],
};