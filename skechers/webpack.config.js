const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = {
    devtool: 'eval-source-map',
    entry: {
        // bundle: __dirname + "/app/main.js",
        // car: __dirname + "/app/car.js",
        // hero: __dirname + "/app/hero.js",
        p1: __dirname + "/app/p1.js",
        p2: __dirname + "/app/p2.js",
        p3: __dirname + "/app/p3.js"
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js"
    },
    devServer: {
        contentBase: "./public", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true //实时刷新
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }, {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }, {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin(
            [
                {
                    from: __dirname + '/public',
                    to: __dirname + '/dist'
                }
            ],{
                ignore: [],
                copyUnmodified: false
            }
        ),

    ]
}

module.exports = config;