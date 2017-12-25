var gulp = new require('gulp');
var browserSync = new require('browser-sync');
var reload = browserSync.reload;
var sass = new require('gulp-sass');
var sourcemaps = new require('gulp-sourcemaps');
var cssmin = new require('gulp-cssmin');
var rename = new require('gulp-rename');
var nunjucksRender = new require('gulp-nunjucks-render');

gulp.task('sass', function() {
    return gulp.src('./assets/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./assets/css/'))
        .pipe(browserSync.stream());
});

gulp.task('nunjucks', function() {
    // Gets .html and .nunjucks files in pages
    return gulp.src('pages/**/*.+(html|nunjucks)')
        // Renders template with nunjucks
        .pipe(nunjucksRender({
            path: ['templates'],
            data: {
                path: 'http://localhost:3000/',
                sub_path: '2017/ikusa/',
            }
        }))
        // output files in app folder
        .pipe(gulp.dest('.'))
        .pipe(browserSync.stream())
        .pipe(reload({ stream: true }));
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./assets/sass/**/*.scss', ['sass', 'minify-css']);
    gulp.watch('*.html').on('change', reload);
    gulp.watch('templates/**/*.nunjucks', ['nunjucks']).on('change', browserSync.reload);
});


gulp.task('minify-css', function() {
    return gulp.src(['./assets/css/main.css'])
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./assets/css/'))
});