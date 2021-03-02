const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            '@components': path.join(__dirname, 'src', 'components'),
        },
    },
    entry: {
        index: path.resolve(__dirname, './src/pages/index/index.ts'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
        filename: 'js/[name].bundle.js',

    },
    module: {
        rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                {
                    test: /\.html$/,
                    use: ['html-loader']
                },
                {
                    test: /\.pug$/,
                    use: ['html-loader', 'pug-html-loader']
                },
                {
                    test: /\.(scss|css)$/,
                    use: [MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                url: true,
                            },
                        },
                        'postcss-loader',
                        // {
                        //     loader: "resolve-url-loader",
                        //     options: {
                        //         absolute: true
                        //     }
                        // }, 
                        { 
                            loader : 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        // {
                        //     loader: 'sass-resources-loader',
                        //     options: {
                        //         resources: './src/scss/resources.scss'
                        //     }
                        // }
                    ],
                },
            ],
        },
        optimization: {
            splitChunks: {
                chunks: "all",
                minSize: 1,
                minChunks: 2
            },
            minimizer: [
                new CssMinimizerPlugin(),
              ],
        },
    plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                chunks: ['index'],
                template: path.resolve(__dirname, './src/pages/index/index.pug'),
                minify: {
                    collapseWhitespace: true,
                }
            }),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: path.join('style', '[name].css'),
                chunkFilename: '[id].css',
                ignoreOrder: true,
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './src/pages'),
        port: 8080,
        open: false,
    },
  
}