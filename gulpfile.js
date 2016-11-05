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
    dest: './build/iconfont'
  }
};

// 生成图标
gulp.task('iconfont', ['example'], () => {
  gulp.src(paths.iconfont.src)
    .pipe(iconfontCss({
      fontName: 'iconfont',
      path: './assets/template/iconfont.scss',
      targetPath: '../styles/iconfont.scss',
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
      linkPath: '../styles/iconfont.scss'
    }))
    .pipe(gulp.dest(paths.example.dest));
});