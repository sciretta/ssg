const path = require("path");
// const NodemonPlugin = require("nodemon-webpack-plugin");

module.exports = {
  mode: "development",
  target: "node",
  entry: "./server/index.tsx",
  module: {
    rules: [
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
  // plugins: [new NodemonPlugin()], // "start": "webpack --config server.config.js --watch"
};
