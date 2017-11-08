const path = require('path');
const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'public');

module.exports = {
    context: srcPath,

    entry: 'index.js',
    output: {
        path: distPath,
        filename: 'index.js',
        publicPath: '/'
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['*', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    devtool: 'source-map'
};