const webpack = require('webpack');
const path = require('path');

const webpackConfig = {
    resolve: {
        extensions: ['', '.js']
    },
    entry: [
        './app/client.js'
    ],
    output: {
        path: path.resolve('./app/public/js'),
        publicPath: '/app/public/js/',
        filename: 'main.min.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: [
                    'babel?presets[]=es2015-webpack,presets[]=react,presets[]=stage-1'
                ]
            },
            { test: /\.json$/, loader: 'json-loader'}
        ]
    },
    node: {
        setImmediate: false
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    devtool: 'source-map'
};

module.exports = webpackConfig;
