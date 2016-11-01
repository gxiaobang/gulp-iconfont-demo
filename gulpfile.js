var gulp = require('gulp'),
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    template = require('gulp-template');

var fs = require('fs');

var paths = {
  iconfont: {
    src: './assets/iconfont/*.svg',
    dest: './build/iconfont'
  },
  example: {
    src: './assets/template/example.html',
    dest: './build/template'
  }
};

// 生成图标
gulp.task('iconfont', ['example'], () => {
  gulp.src(paths.iconfont.src)
    .pipe(iconfontCss({
      fontName: 'iconfont',
      path: './assets/template/iconfont.css',
      targetPath: '../styles/iconfont.css',
      fontPath: '../iconfont/'
    }))
    .pipe(iconfont({
      fontName: 'iconfont',
      formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
      normalize: true
    }))
    .pipe(gulp.dest(paths.iconfont.dest));
});

// 图标示例
gulp.task('example', () => {
  let files = fs.readdirSync('./assets/iconfont/');
  gulp.src(paths.example.src)
    .pipe(template({
      icons: files.map(file => file.replace('.svg', '')),
      linkPath: '../styles/iconfont.css'
    }))
    .pipe(gulp.dest(paths.example.dest));
});