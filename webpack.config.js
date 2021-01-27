//
// (c) 2021 Alien Labs.
//

const path = require('path');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const GoogleFontsPlugin = require('@beyonk/google-fonts-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    disableHostCheck: true,
    port: 8080,
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 600
    }
  },
  plugins: [
    // NOTE: Must come first.
    // https://webpack.js.org/plugins/html-webpack-plugin
    new HtmlWebPackPlugin({
      template: './public/index.html',
      templateParameters: {
        title: 'Rich Burdon'
      }
    }),

    // BUG: webpack 5.
    // https://www.npmjs.com/package/google-fonts-webpack-plugin
    new GoogleFontsPlugin({
      fonts: [
        { family: 'Montserrat' }
      ]
    }),

    // BUG: https://github.com/jantimon/favicons-webpack-plugin/issues/222
    // https://github.com/jantimon/favicons-webpack-plugin
    new FaviconsWebpackPlugin({
      logo: './static/images/logo-192.png'
    }),
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
