var gulp = require('gulp');

gulp.task('ngdocs', [], function () {
  var gulpDocs = require('gulp-ngdocs');
  return gulp.src(['./src/components/button/button.component.ts'])
    .pipe(gulpDocs.process())
    .pipe(gulp.dest('./b'));
});
