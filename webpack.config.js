const path = require('path');

module.exports = {
  mode: 'development',
  entry: './ts/app.ts',
  devtool: 'inline-source-map',
  devServer: {
    static: './public',
  },
  optimization: {
    runtimeChunk: 'single',
  },
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
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
  },
};
