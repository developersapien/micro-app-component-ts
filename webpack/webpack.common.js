const CopyPlugin = require("copy-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const exposeName = require("minimist")(process.argv.slice(3));
const package = require("../package.json").dependencies;
module.exports = {
  entry: path.resolve(__dirname, "../src/index.tsx"),
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@components": path.resolve(__dirname, "../src/components/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        use: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        use: "asset/inline",
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: `${exposeName["name"]}.bundle.js`,
  },
  mode: "development",
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "src/assets", to: "./assets" }],
    }),
    new ModuleFederationPlugin({
      name: exposeName["name"],
      filename: "remoteEntry.js",
      exposes: {
        "./ExampleIndex": "./src/components/Example",
      },
      /* Shared Packages, for this case is React but you can use yur owns */
      shared: {
        react: {
          eager: true,
          requiredVersion: package.react,
        },
        "react-dom": {
          eager: true,
          requiredVersion: package["react-dom"],
        },
      },
    }),
  ],
};
