const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: '[name].css',
    disable: false,
});

module.exports = {
    entry: './src/js/client.js',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: 'file-loader?name=[name].[ext]',
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: [/node_modules/],
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    loader: [{
                        loader: 'css-loader', options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader', options: {
                            sourceMap: true,
                        },
                    }],
                }),
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dev'),
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'dev'),
        compress: true,
        port: 8000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My App',
            template: 'src/index.html',
        }),
        extractSass,
    ],
};
