const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./index.ts", // Your main server entry file
  target: "node", // Target Node.js environment
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // Clean the output directory before each build
  },
  resolve: {
    extensions: [".ts", ".js"], // Resolve these file extensions
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Apply this rule for TypeScript files
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  externals: [nodeExternals()], // Exclude node_modules from the bundle
  plugins: [
    new CleanWebpackPlugin(), // Clean the output directory
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/views"), // Copy from the views directory
          to: path.resolve(__dirname, "dist/views"), // Copy to the dist/views directory
        },
      ],
    }),
  ],
  devtool: "source-map", // Enable source maps for easier debugging
};
