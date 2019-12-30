export default {
  entry: './src/index.tsx',
  lessInBabelMode: true,
  extractCSS: true,
  cjs: {
    type: 'babel',
  },
  extraBabelPlugins: [
    ['babel-plugin-import', {
      libraryName: 'antd',
      libraryDirectory: 'lib',
      style: 'css',
    }],
  ],
};