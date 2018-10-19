const path = require('path');
const glob = require('glob-all')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');
// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirApp = path.join(__dirname, 'app');
const dirAssets = path.join(__dirname, 'assets');

const appHtmlTitle = 'TEDxXujiahui';

/**
 * Webpack Configuration
 */
module.exports = {
    entry: {
        bundle: path.join(dirApp, 'index')
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

        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.ejs'),
            title: appHtmlTitle
        }),
        
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),

        new PurifyCSSPlugin({
            paths: glob.sync([
                path.join(__dirname, 'app/*.js'),
                path.join(__dirname, 'index.ejs')
            ]),
            minimize: true,
            purifyOptions: {
                whitelist: []
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
                    name: '[path][name].[ext]'
                }
            }
        ]
    }
};
