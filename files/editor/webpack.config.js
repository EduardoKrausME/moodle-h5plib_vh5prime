// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * webpack.config.js
 *
 * @package   h5plib_vh5prime
 * @copyright 2026 Eduardo Kraus {@link https://eduardokraus.com}
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  output: {
    path: path.resolve(__dirname, "styles/css")
  },
  entry: {
    index: [path.join(path.resolve(__dirname, 'styles'), "scss", "application.scss")]
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: './fonts/[name][ext]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "application.css"
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(path.resolve(__dirname, 'node_modules'), 'h5p-image-cropper', 'cropper.js'),
          to: path.join(path.resolve(__dirname, 'libs'), 'cropper.js')
        },
        {
          from: path.join(path.resolve(__dirname, 'node_modules'), 'h5p-image-cropper', 'cropper.css'),
          to: path.join(path.resolve(__dirname, 'libs'), 'cropper.css')
        },
        {
          from: path.join(path.resolve(__dirname, 'node_modules'), 'h5p-image-cropper', 'images'),
          to: path.join(path.resolve(__dirname, 'images'), 'cropper')
        },
        {
          from: path.join(path.resolve(__dirname, 'node_modules'), 'zebra_datepicker', 'dist', 'zebra_datepicker.min.js'),
          to: path.join(path.resolve(__dirname, 'libs'), 'zebra_datepicker.min.js')
        },
        {
          from: path.join(path.resolve(__dirname, 'node_modules'), 'zebra_datepicker', 'dist', 'css', 'bootstrap', 'zebra_datepicker.min.css'),
          to: path.join(path.resolve(__dirname, 'styles'), 'css', 'libs', 'zebra_datepicker.min.css')
        },
        {
          from: path.join(path.resolve(__dirname, 'node_modules'), 'zebra_datepicker', 'dist', 'css', 'bootstrap', 'icons.png'),
          to: path.join(path.resolve(__dirname, 'styles'), 'css', 'libs', 'icons.png')
        }
      ]
    })
  ]
};
