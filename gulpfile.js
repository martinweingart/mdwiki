const gulp = require('gulp');
const path = require('path');
const replace = require('gulp-replace-task');

gulp.task('replace', function() {
  gulp.src(['gui/dist/**/*'])
    .pipe(replace({
            patterns: [
              // {
              //   match: new RegExp('http://localhost:3000', "g"),
              //   replacement: function() {
              //     return `http://${process.argv[2]}:3000`;
              //   }
              // },
              {
                match: new RegExp('/static/', "g"),
                replacement: function() {
                  return '/wiki/static/'
                }
              }
            ]
          }))
    .pipe(gulp.dest('gui/dist/'));
});
