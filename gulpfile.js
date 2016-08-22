var gulp = require("gulp");
var ts = require("gulp-typescript");
var clean = require('gulp-clean');
var sourcemaps = require("gulp-sourcemaps");
var argv = require("yargs").argv;
var mocha = require("gulp-mocha");
var path = require("path");

var tsProject = ts.createProject("tsconfig.json");

gulp.task("watch", ["build"], function () {
  gulp.watch(["src/**/*.ts", "example/**/*.ts"], ["compile-ts"]);
  gulp.watch(["src/tools/templates/**/*.js"], ["copy-assets"]);
});

gulp.task("test", function () {
  var basePath = "dist/";
  var dir = argv.dir ? path.join(argv.dir, "/**") : "**";
  var pattern = argv.pattern ? argv.pattern : "*.spec.js";

  return gulp.src(path.join(basePath, dir, pattern), {read: false})
    .pipe(mocha({
      reporter: "spec",
      require: ["source-map-support/register"]
    }));
});

gulp.task("build", ["compile-ts", "copy-assets"]);

gulp.task("copy-assets", function() {
  return gulp.src("src/tools/templates/**/*.js")
    .pipe(gulp.dest("dist/src/tools/templates"));
});

gulp.task("compile-ts", function () {
  return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist"));
});

gulp.task('clean', function () {
  return gulp.src(['dist', 'tmp'], {read: false})
    .pipe(clean());
});