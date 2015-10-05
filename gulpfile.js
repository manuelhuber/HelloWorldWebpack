var gulp = require('gulp');
var del = require('del');
var webpack = require('webpack');
var karma = require('karma');
var remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');
var dirtyHack = require('./remapLcovHack.js');

var karmaCoverageOut = __dirname + "\\karmaCoverage";
var webpackOut = __dirname + "\\target";
var remapIstanbulOut = "remapIstanbul\\remappedLcov.info";
var dirtyHackOut = "remapIstanbul\\fixedLcov.info";

gulp.task('clean', function (callback) {
    del([webpackOut, karmaCoverageOut, remapIstanbulOut, dirtyHackOut]);
    callback();
});

gulp.task('coverage-webpack', ['clean'], function (callback) {
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
            path: webpackOut,
            filename: "[name]bundle.js",
            devtoolModuleFilenameTemplate: "::delete::[absolute-resource-path]",
        },

        module: {
            loaders: [
                { test: /\.ts$/, loader: 'source-map-loader!ts-loader' }
            ]
        }
    }, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        callback();
    });

});

gulp.task('coverage-karma', ['coverage-webpack'], function (callback) {
    new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, callback).start();

})

gulp.task('coverage-remap-istanbul', ['coverage-karma'], function (callback) {
    return gulp.src('karmaCoverage/report-json/coverage-final.json')
        .pipe(remapIstanbul({
            reports: {
                'lcovonly': remapIstanbulOut
            }
        }));
});

gulp.task('coverage-lcov-hack', ['coverage-remap-istanbul'], function () {
    dirtyHack.lcovHack(remapIstanbulOut, dirtyHackOut);

});

gulp.task('coverage', ['coverage-lcov-hack']);
