/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: './src/main.ts',
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  output: {
    filename: 'main.js',
    path: resolve(__dirname, 'dist'),
  },
};
