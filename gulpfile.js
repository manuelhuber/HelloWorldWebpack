var gulp = require('gulp');
var del = require('del');
var path = require('path');
var webpack = require('webpack');
var karma = require('karma');
var remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');
var dirtyHack = require('./remapLcovHack.js');

var coverageKarmaOut = path.join(__dirname, 'Coverage', 'karmaCoverage');
var coverageWebpackOut = path.join(__dirname, 'Coverage', 'target');
var coverageRemapIstanbulOut = path.join(__dirname, 'Coverage', 'remapIstanbul', 'remappedLcov.info');
var coverageDirtyHackMarker = "::delete::";
var coverageDirtyHackOut = path.join(__dirname, 'Coverage', 'remapIstanbul', 'fixedLcov.info');
var saveGameLoader = path.join(__dirname, "save-game-loader");
var tsloader = ["source-map",saveGameLoader + "?save=afterTS", "ts-loader"].join('!');

gulp.task('coverage-clean', function (callback) {
    del(path.join(__dirname, 'Coverage'));
    callback();
});

gulp.task('coverage-webpack', ['coverage-clean'], function (callback) {
    webpack({
        resolve: {
            extensions: ['', '.ts', '.webpack.js', '.web.js', '.js']
        },
        debug: true,
        devtool: 'inline-source-map',
        entry: {
            spec: "./test/HelloWorldSpec"
        },
        output: {
            path: coverageWebpackOut,
            filename: "[name]bundle.js",
            devtoolModuleFilenameTemplate: coverageDirtyHackMarker+"[absolute-resource-path]"
        },

        module: {
            loaders: [
                { test: /\.ts$/, loader: tsloader }
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
    return gulp.src(path.join(coverageKarmaOut, "report-json", "coverage-final.json"))
        .pipe(remapIstanbul({
            reports: {
                'lcovonly': coverageRemapIstanbulOut
            }
        }));
});

gulp.task('coverage-lcov-hack', ['coverage-remap-istanbul'], function () {
    dirtyHack.lcovHack(coverageRemapIstanbulOut, coverageDirtyHackOut, coverageDirtyHackMarker);

});

gulp.task('coverage', ['coverage-lcov-hack']);
