/**
 * Created by Admin on 24.01.2018.
 */
const path = require('path'),
    webpack = require('webpack');

module.exports = {
    //context - путь для всех файлов
    context: __dirname+'/src/',
    //entry - что передавать
    entry: {
        common: "./index.js"
    },
    //output - куда передавать
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
                babelrc: false,
                presets: ["babel-preset-react-native"], //babel-preset-react-native
                cacheDirectory: true
            }
        }]
    }
};