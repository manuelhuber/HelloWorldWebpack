var gulp = require('gulp');
var webpack = require('webpack');


gulp.task('default', function () {
    // place code for your default task here
    webpack({
        resolve: {
            extensions: ['', '.ts', '.webpack.js', '.web.js', '.js']
        },
        debug: true,
        devtool: 'source-map',
        entry: {
            spec: "./test/HelloWorldSpec"
        },
        output: {
            path: __dirname + "\\target",
            filename: "[name]bundle.js"
        },

        module: {
            loaders: [
                { test: /\.ts$/, loader: 'source-map-loader!ts-loader'}
            ]
        }
    }, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
    });
});

