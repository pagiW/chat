const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const MiniCss = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CssMinimizer = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[contenthash].js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/
            },
            {
                use: [
                    MiniCss.loader,
                    'css-loader',
                    'sass-loader'
                ],
                test: /\.scss$/
            },
            {
                test: /\.(png|jpg)$/,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new HtmlPlugin({
            template: './public/index.html',
            filename: 'index.html',
            inject: true
        }),
        new MiniCss({
            filename: '[name].[contenthash].css'
        }),
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new TerserPlugin()
        ]
    }
}