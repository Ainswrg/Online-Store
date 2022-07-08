const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const baseConfig = {
  entry: './src/index.ts',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(?:ico|gif|jpg|png|mp4)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]'
        },
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/svg/[hash][ext]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext]',
        },
      },
    ],
  },
  stats: {
    errorDetails: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@imgs': path.resolve(__dirname, './src/assets/images'),
      '@core': path.resolve(__dirname, './src/core'),
      '@components': path.resolve(__dirname, './src/core/components'),
    },
  },
  output: {
    filename: 'index.[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [new CleanWebpackPlugin()],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode
    ? require('./webpack.prod.config')
    : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};
