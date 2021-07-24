const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;

const fileName = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;
const jsLoader = () => {
  const loaders = [
    {
      loader: "babel-loader",
      options: {
        presets: ['@babel/preset-env']
      }
    }
  ];

  if (isDev) {
    loaders.push('eslint-loader')
  }

  return loaders;
}
console.log('isProd: ', isProd)

module.exports = {
  context: path.resolve(__dirname, 'src'), // где лежат все исходники приложения
  mode: "development",
  target: isDev ? "web" : "browserslist",
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: fileName('js'),
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
    }
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    port: 3000,
    hot: isDev,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: fileName('css'),
    }),
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: "index.html",
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      }
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/favicon.ico'), to: path.resolve(__dirname, 'dist') },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoader()
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
}
