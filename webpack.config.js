const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => ({
  mode: "development",
  // entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "build"),
    // clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Rick & Morty SSR",
      filename: `${env.page}.index.html`,
      template: "public/index.html",
    }),
    // new NodePolyfillPlugin(),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, "build"),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
});
