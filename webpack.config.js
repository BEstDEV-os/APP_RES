const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./js/main.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    publicPath: "/",
  },

  devServer: {
    open: true,
    port: 3000,
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              publicPath: "assets",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                quality: 70,
                progressive: true,
              },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].bundle.css",
      chunkFilename: "[id].css",
    }),
  ],
};
