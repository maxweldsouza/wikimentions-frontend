import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const extractSass = new ExtractTextPlugin({
    filename: '[name].css',
    disable: false
});

export default {
    entry: './src/js/client.js',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.hbs$/,
                use: 'handlebars-loader'
            },
            {
                test: /\.svg$/,
                use: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: [/node_modules/]
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    loader: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
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
        path: path.resolve(__dirname, 'dev'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: [path.join(__dirname, 'dev'), path.join(__dirname, 'src')],
        historyApiFallback: true,
        compress: true,
        port: 8000
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My App',
            template: 'src/index.hbs'
        }),
        extractSass
    ]
};
