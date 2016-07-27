const path = require('path');
module.exports = {
    entry: './src/Store.js',
    output: {
        path: __dirname,
        filename: 'index.js',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            { test: path.join(__dirname, 'es6'),
              loader: 'babel-loader' }
        ]
    }
};