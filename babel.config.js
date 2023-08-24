/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.json', '.tsx', '.ts', '.jsx', '.svg'],
        alias: {
          app: './src',
          api: './src/api',
          asset: './src/asset',
          image: './src/asset/image',
          svg: './src/asset/svg',
          component: './src/component',
          navigator: './src/navigator',
          screen: './src/screen',
          service: './src/service',
          hook: './src/hook',
          theme: './src/theme',
          color: './src/theme/color',
          translation: './src/translation',
          query: './src/query',
          common: './src/common',
          language: './src/language',
        },
      },
    ],
    'inline-dotenv',
    'react-native-reanimated/plugin', // needs to be last
  ],
};
