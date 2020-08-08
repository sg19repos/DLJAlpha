const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: ['./src/index.js', '@babel/polyfill'],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                ],
            },
            // {
            //     test: /\.(jpe?g|gif|png|svg)$/i,
            //     use: [
            //         {
            //             loader: 'url-loader',
            //             options: {
            //                 limit: 10000,
            //             },
            //         },
            //     ],
            // },
            {
                test: /\.(gif|png|jpe?g)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // name: '[name].[ext]',
                            // name: '[path][name].[hash].[ext]',
                            // name: '/src/assets/images/[hash].[ext]',
                            // name: '/assets/src/images/[name].[ext]',
                            // outputPath: 'src/assets/images/',
                            name: '[name].[ext]',
                            outputPath: 'assets/images/',
                        },
                    },
                ],
            },
            // {
            //     loader: 'babel-loader',
            //     options: {
            //         presets: ['@babel/react', '@babel/env', '@babel/preset-env'],
            //     },
            // },
        ],
        // loaders: [{ test: /\.jsx?$/, loader: 'babel' }],
    },
    devServer: {
        host: '192.168.1.10', //your ip address,
        // host: '0.0.0.0', //your ip address,
        historyApiFallback: true,
        // contentBase: '././src',
        contentBase: './build',
        // port: 8080,
        disableHostCheck: true,
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    output: {
        path: path.join(__dirname, '/dist'),
        // path: path.resolve(__dirname, '/dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            // template: path.resolve('./dist/index.html'),
            filename: 'index.html',
            inject: true,
            // template: path.resolve('./index.html'),
            template: path.resolve(__dirname, 'index.html'),
        }),
        // new CopyWebpackPlugin({
        //     patterns: [{ from: './src', to: './dist' }],
        // }),
    ],
    devServer: {
        // contentBase: './dist',
        contentBase: './build',
        hot: true,
    },
};
