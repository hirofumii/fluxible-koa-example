const webpack = require('webpack');
const path = require('path');

const webpackConfig = {
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    entry: [
        './app/client.js'
    ],
    output: {
        path: path.resolve('./app/public/js'),
        publicPath: '/app/public/js/',
        filename: 'main.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: [
                    'babel?presets[]=es2015-webpack,presets[]=react,plugins[]=transform-class-properties'
                ]
            },
            { test: /\.json$/, loader: 'json-loader'}
        ]
    },
    node: {
        setImmediate: false
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],
    devtool: 'eval'
};

module.exports = webpackConfig;
