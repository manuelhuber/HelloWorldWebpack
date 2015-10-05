var path = require('path');
// removes invalid sourceMapURL references to *.js.map files
var stripMapLoader = path.join(__dirname, 'strip-map-loader');
var saveGameLoader = path.join(__dirname, 'save-game-loader');
var tsLoader = 'ts-loader';
var sourceMapLoader = 'source-map';
var tsLoader = [saveGameLoader + "?save=afterStripMap", stripMapLoader, saveGameLoader + "?save=afterSourceMap",sourceMapLoader, saveGameLoader + "?save=afterTS", tsLoader].join('!');

module.exports = {
    resolve: {
        extensions: ['', '.ts', '.webpack.js', '.web.js', '.js']
    },
    debug: true,
    devtool: 'source-map',
    entry: {
        //source: "./dest/src/entry.js",
        spec: "./test/HelloWorldSpec"
    },
    output: {
        path: __dirname + "\\target",
        filename: "[name]bundle.js"
        //devtoolModuleFilenameTemplate: "[absolute-resource-path]",
    },

    module: {
        //preLoaders: [
        //    { test: /\.js$/, loader: 'source-map-loader' },
        //],
        loaders: [
            { test: /\.ts$/, loader: tsLoader },
        ]
    }
};
