// https://css-tricks.com/gulp-for-beginners/

const gulp = require("gulp");

// Requires the gulp-sass plugin
const sass = require("gulp-sass")(require("sass"));

const browserSync = require("browser-sync");
const { watch } = require("browser-sync");

function css() {
  return gulp
    .src("src/scss/style.scss")
    .pipe(sass())
    .pipe(gulp.dest("src/css/"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
}

function watchFiles() {
  gulp.watch("src/scss/*.scss", css);
  gulp.watch("src/*.html", browserSync.reload);
  gulp.watch("src/js/*.js", browserSync.reload);
}

function browserSyncReload() {
  browserSync.init({
    server: {
      baseDir: "src",
    },
  });
}

gulp.task("serve", gulp.parallel(css, browserSyncReload, watchFiles));
