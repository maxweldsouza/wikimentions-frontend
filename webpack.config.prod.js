const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const extractSass = new ExtractTextPlugin({
    filename: '[name]-[contenthash:6].css',
    disable: false,
});

module.exports = {
    entry: './src/js/client.js',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: 'file-loader?name=[name]-[hash:6].[ext]&publicPath=assets/images/&outputPath=images/',
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: [/node_modules/],
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    loader: [{
                        loader: 'css-loader', options: {
                            sourceMap: false,
                        },
                    },
                    {
                        loader: 'sass-loader', options: {
                            sourceMap: false,
                            includePaths: [
                                'node_modules/foundation-sites/scss',
                                'node_modules/motion-ui/src'
                            ]
                        },
                    }],
                }),
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist/bundles'),
        publicPath: '/bundles/',
        filename: '[name]-[chunkhash:6].js',
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            sourceMap: true,
            mangle: {
                screw_ie8: true,
                keep_fnames: true,
            },
            compress: {
                screw_ie8: true,
            },
            comments: false,
        }),
        new HtmlWebpackPlugin({
            // https://github.com/kangax/html-minifier#options-quick-reference
            title: 'My App',
            template: 'src/index.hbs',
            filename: '../index.html',
            minify: {
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                useShortDoctype: true,
            },
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ['moment', 'manifest'] // Specify the common bundle's name.
        // }),
        // new BundleAnalyzerPlugin(),
        extractSass,
    ],
};
