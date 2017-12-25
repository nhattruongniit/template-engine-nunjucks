var gulp = new require('gulp')
var nunjucksRender = new require('gulp-nunjucks-render');
var browserSync = new require('browser-sync');
var reload = browserSync.reload;

gulp.task('nunjucks', function() {
    //nunjucksRender.nunjucks.configure(['.nunjucks/']);
    // Gets .html and .nunjucks files in pages
    return gulp.src('project/**/*.+(html|nunjucks)')
        // Renders template with nunjucks
        .pipe(nunjucksRender())
        // output files in app folder
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream())
        .pipe(reload({ stream: true }));
});

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('./*.html').on('change', reload);
    gulp.watch('templates/**/*.nunjucks', ['nunjucks']).on('change', browserSync.reload);
})