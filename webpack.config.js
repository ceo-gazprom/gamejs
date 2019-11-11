const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');


module.exports = {
    mode: 'development',
    entry: './client/main.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
      filename: '[name].[hash].bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.sass$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          })
        }
      ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          filename: '../dist/index.html',
          template: 'index.html',
        }),
        new VueLoaderPlugin(),
        new ExtractTextPlugin('[hash].style.css')
      ],
}