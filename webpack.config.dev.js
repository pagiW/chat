const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const MiniCss = require('mini-css-extract-plugin')

module.exports = {
    mode: 'development',
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
    ],
    devServer: {
        compress: true,
        historyApiFallback: true,
        port: 3000,
        open: true
    }
}