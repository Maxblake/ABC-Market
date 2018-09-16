const path = require('path')
const webpack = require('webpack')

const dev = process.env.NODE_ENV !== 'production' && process.argv.indexOf('-p') === -1


module.exports = {
    mode: 'production',
    entry: './client/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    plugins: dev ? [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify('production') }
        }),
    ] : null,    
    module: {
        loaders: [
          {
            test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'client'),
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.styl$/,
                loader: "style-loader"
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|gif|png|jpe?g|svg|json)$/,
                loader: 'file-loader'
            },
        ]
    },
};