//定义任务
var gulp = require('gulp'),//本地gulp
    less = require('gulp-less'),//gulp插件 转换css
    cssmin = require('gulp-cssmin'),//gulp插件  压缩
    autoprefixer = require('gulp-autoprefixer'),//gulp插件 添加前缀
    rev = require('gulp-rev'),//gulp插件 添加版本号
    rename = require('gulp-rename'),//gulp插件 重命名
    imagemin = require('gulp-imagemin'),//gulp插件 图片压缩
    useref = require('gulp-useref'),//gulp插件 合并并替换路径
    uglify = require('gulp-uglify'),//gulp插件  压缩js
    gulpif = require('gulp-if'),//gulp插件  判断
    htmlmin = require('gulp-htmlmin'),//gulp插件  压缩html
    revCollector = require('gulp-rev-collector');//gulp插件 内容替换



//处理css
gulp.task('css', function () {
    return    gulp.src('./public/less/main.less')
        .pipe(less())
        .pipe(cssmin())
        .pipe(autoprefixer())
        .pipe(rev())
        .pipe(gulp.dest('./release/public/css'))
        .pipe(rev.manifest())
        .pipe(rename('css-manifest.json'))
        .pipe(gulp.dest('./release/rev'));
});

//处理图片

gulp.task('image',function(){
  return gulp.src(['./public/images/**/*','./uploads/*'],{base:'./'})
   .pipe(imagemin())
   .pipe(rev())
   .pipe(gulp.dest('./release'))
   .pipe(rev.manifest())
   .pipe(rename('image-manifest.json'))
   .pipe(gulp.dest('./release/rev'));

});


//处理js

gulp.task('useref',function(){
  return	gulp.src('./index.html')
	.pipe(useref())
	.pipe(gulpif('*.js',uglify()))
	.pipe(gulpif('*.js',rev()))
    .pipe(gulp.dest('./release'))
    .pipe(rev.manifest())
    .pipe(rename('js-manifest.json'))
    .pipe(gulp.dest('./release/rev'));
});


//处理html

gulp.task('html',function(){
	gulp.src('./views/*.html')
	    .pipe(htmlmin({
	    	collapseWhitespace:true
	    }))
	    .pipe(gulp.dest('./release/views'));
});


//其他任务

gulp.task('other',function(){
	gulp.src(['./public/fonts/*','./api/*','./favicon.ico'],{base:'./'})
	     .pipe(gulp.dest('./release'));
});

//替换路径

gulp.task('rev',['css','image','useref'],function(){
    
    gulp.src(['./release/rev/*.json','./release/index.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('./release'));

});

gulp.task('default', ['rev', 'html', 'other']);
