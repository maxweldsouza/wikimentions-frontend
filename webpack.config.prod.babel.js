import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const extractSass = new ExtractTextPlugin({
    filename: '[name]-[contenthash:8].css',
    disable: false
});

export default {
    entry: './src/js/client.js',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js.snap$/,
                use: 'ignore-loader'
            },
            {
                test: /\.svg$/,
                use: 'file-loader?name=[name]-[hash:6].[ext]&publicPath=assets/images/&outputPath=images/'
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: [/node_modules/]
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    loader: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: false
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: false,
                                includePaths: [
                                    'node_modules/foundation-sites/scss',
                                    'node_modules/motion-ui/src'
                                ]
                            }
                        }
                    ]
                })
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist/bundles'),
        publicPath: '/bundles/',
        filename: '[name]-[chunkhash:8].js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            sourceMap: true,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
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
                useShortDoctype: true
            }
        }),
        // new BundleAnalyzerPlugin(),
        extractSass
    ]
};
