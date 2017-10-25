var path = require("path");
var webpack = require("webpack");

module.exports = {
  devtool: "eval",
  entry: [
    './example/src/index.js',
  ],
  output: {
    path: path.join(__dirname, "static"),
    filename: "bundle.js",
    publicPath: "/static/",
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
        ],
      },
    ],
  },
  devServer: {
    contentBase: __dirname,
    compress: true,
    hot: true,
    port: 8888
  }
};
