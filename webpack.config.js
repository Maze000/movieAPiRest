const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: process.env.NODE_ENV || "development", // Define el modo
  entry: "./src/index.js", // Archivo principal
  output: {
    path: path.resolve(__dirname, "dist"), // Carpeta de salida
    filename: "[name].[contenthash].js", // Nombres únicos para los archivos
    clean: true, // Limpia la carpeta dist en cada build
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          "babel-loader", // Transpila código moderno a ES5
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // Procesa archivos CSS
      },
    ],
  },
  devtool: process.env.NODE_ENV === "production" ? false : "inline-source-map", // Solo para desarrollo
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 3000,
    open: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: process.env.NODE_ENV === "production" && {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    process.env.NODE_ENV !== "production" && new Dotenv(), // Solo se incluye en desarrollo
  ].filter(Boolean), // Elimina valores nulos o false
  optimization: {
    splitChunks: {
      chunks: "all", // Divide código en bundles más pequeños
    },
    runtimeChunk: "single", // Optimiza la carga del runtime
  },
};


