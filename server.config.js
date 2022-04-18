const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const NodemonPlugin = require("nodemon-webpack-plugin");

module.exports = {
  mode: "development",
  target: "node",
  entry: "./server/index.tsx",
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        // use: ["style-loader", "css-loader"],
        use: [MiniCssExtractPlugin.loader, "css-loader"],
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
    filename: "[name].js",
    path: path.resolve(__dirname, "server"),
  },
  plugins: [new MiniCssExtractPlugin()],
  // plugins: [new NodemonPlugin()], // "start": "webpack --config server.config.js --watch"
};
