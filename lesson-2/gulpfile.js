const gulp          = require('gulp');
const autoprefixer  = require('gulp-autoprefixer');
const concat        = require('gulp-concat');
const less          = require('gulp-less');
const minifyCSS     = require('gulp-minify-css');
const uglify        = require('gulp-uglify');

// Задачи запускаемые по умолчанию
gulp.task('default', function () {
    gulp.start([
        'css',      // Запускаем заадчу "css"
        'js',       // Запускам задачу "js"
        'watch'     // Запускаем задачу "watch"
    ]);
});

// Задачи для отслеживания изменений
gulp.task('watch', function() {
    gulp.watch([
        'less/**/*.*',      // Следим за изменением любых файлов в самой папке LESS и её подпапках
        'css/*.css'         // Следим за изменением CSS файлов в папке CSS
    ], ['css']);            // Запускаем задачу или ряд задач, если что-то из перечисленных файлов изменилось
});

// Сборка CSS
gulp.task('css', function () {
    gulp.src([
        'less/*.less'
    ])
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],     // CSS префиксы для последних 5 версий всех браузеров
            cascade: true                      // Отключаем визуальный каскад
        }))
        .pipe(minifyCSS())                      // Минифицируем CSS
        .pipe(concat(
            'css/style.css',                    // Файл после конкатинации
            {
                newLine: ''                     // Задаём стиль новой строки
            }
        ))
        .pipe(gulp.dest('.'));                  // Сохраняем изменения в файл
});

// Сборка JS
gulp.task('js', function () {
    return gulp.src([
        'js/scripts.js'
    ])
        .pipe(concat('src/app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('.'));
});