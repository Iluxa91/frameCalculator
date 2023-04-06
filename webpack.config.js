const path = require("path")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
    mode: "development",
    entry: ["@babel/polyfill","./src/index.tsx"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash].js"
    },
    devServer: {
        port: 3000
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    plugins: [
        new HTMLWebpackPlugin({template: "./src/index.html"}),
        new CleanWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin()
    ],
    watchOptions: {
        ignored: /node_modules/,
    },
    module: {
        rules: [
            {
                test:/\.(css|less)$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.(jpg|jpeg|png|svg)/,
                use: ['file-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.m?jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            }
        ]
    }

}