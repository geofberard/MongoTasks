const webpack = require("webpack");

module.exports = {
  entry: [`${__dirname}/src/main/typescript/main.tsx`],
  output: {
    path: __dirname + "/src/main/resources/public",
    filename: "index.js",
  },
  devServer: {
    inline: true,
    contentBase: __dirname + "/src/main/resources/public",
    compress: true,
    port: 8090,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["awesome-typescript-loader", "eslint-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
  ],
};
