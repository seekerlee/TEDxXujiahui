const path = require('path')
const glob = require('glob-all')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const PurifyCSSPlugin = require('purifycss-webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev')

const dirApp = path.join(__dirname, 'app')
const dirAssets = path.join(__dirname, 'assets')
const dirDist = path.join(__dirname, 'dist')

const appHtmlTitle = 'TEDxXujiahui | 汇聚万智，和而不同'

/**
 * Webpack Configuration
 */
module.exports = {
    entry: {
        index: path.join(dirApp, 'index'),
        about: path.join(dirApp, 'about'),
        team: path.join(dirApp, 'team'),
        join: path.join(dirApp, 'join'),
        speaker: path.join(dirApp, 'speaker')
    },
    resolve: { // change where webpack goes to look for imported module
        modules: [ // Tell webpack what directories should be searched when resolving modules
            'node_modules',
            dirApp,
            dirAssets
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: IS_DEV
        }),
        new CopyWebpackPlugin([{
             from: 'assets/images/*',
             to: dirDist,
             toType: 'dir'
        }]),
        new HtmlWebpackPlugin({
            filename: 'about',
            template: path.join(__dirname, 'page/about.ejs'),
            chunks: ['about']
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'page/index.ejs'),
            title: appHtmlTitle,
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            filename: 'team',
            template: path.join(__dirname, 'page/team.ejs'),
            chunks: ['team']
        }),
        new HtmlWebpackPlugin({
            filename: 'join',
            template: path.join(__dirname, 'page/join.ejs'),
            chunks: ['join']
        }),
        new HtmlWebpackPlugin({
            filename: 'speaker',
            template: path.join(__dirname, 'page/speaker.ejs'),
            chunks: ['speaker']
        }),

        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),

        new PurifyCSSPlugin({
            paths: glob.sync([
                path.join(__dirname, 'app/index.js'),
                path.join(__dirname, 'page/index.ejs'),
                path.join(__dirname, 'app/about.js'),
                path.join(__dirname, 'page/about.ejs'),
                path.join(__dirname, 'page/team.ejs'),
                path.join(__dirname, 'page/join.ejs'),
                path.join(__dirname, 'page/speaker.ejs'),
                path.join(__dirname, 'components/*.ejs')
            ]),
            minimize: true,
            purifyOptions: {
                whitelist: ['*:not*']
            }
        })
    ],
    module: {
        rules: [
            // BABEL
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    compact: true
                }
            },

            // STYLES
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV
                        }
                    },
                ]
            },

            // CSS / SASS
            {
                test: /\.(sass|scss)$/,
                use: [
                    {
                        // extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.
                        loader: MiniCssExtractPlugin.loader
                    },
                    //'style-loader', // Adds CSS to the DOM by injecting a <style> tag
                    {
                        loader: 'css-loader', // The css-loader interprets @import and url() like import/require() and will resolve them.
                        options: {
                            sourceMap: IS_DEV
                        }
                    },
                    {
                        loader: 'sass-loader', // Loads a Sass/SCSS file and compiles it to CSS
                        options: {
                            sourceMap: IS_DEV,
                            includePaths: [dirAssets]
                        }
                    }
                ]
            },

            // IMAGES
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                    publicPath: IS_DEV ? '' : 'https://static.tedxxujiahui.com'
                }
            },
            {
                test: /\.(svg|eot|woff|ttf|svg|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "fonts/[name].[ext]"
                        }
                    }
                ]
            }
        ]
    }
}
