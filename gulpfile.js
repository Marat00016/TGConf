import path from 'path';
import { readFileSync } from 'fs';
import { src, dest, watch, parallel, series } from 'gulp';
import plumber from 'gulp-plumber';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import { deleteAsync as del } from 'del';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import sortMediaQueries from 'postcss-sort-media-queries';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import webpack from 'webpack-stream';
import named from 'vinyl-named';
import browserSync from 'browser-sync';
import data from 'gulp-data';
import merge from 'gulp-merge-json';
import webpackConfig from './webpack.config.js';
import svgSprite from 'gulp-svg-sprite';
import hb from 'gulp-hb';
import layouts from 'handlebars-layouts';

const sass = gulpSass(dartSass);
const bs = browserSync.create();

function coreStyles() {
  return src(['src/styles/core.scss'], { encoding: false })
    .pipe(plumber())
    .pipe(sass({
      loadPaths: ['src/', 'node_modules/'],
    }, null))
    .pipe(gulpif(process.env.NODE_ENV === 'production', postcss([
      sortMediaQueries({ sort: 'desktop-first' }),
      autoprefixer(),
      cssnano({ preset: 'default' }),
    ])))
    .pipe(rename({
      basename: 'core',
      extname: '.min.css',
    }))
    .pipe(dest('build/css'));
}

function additionalStyles() {
  return src(['src/blocks/**/index.scss'], { encoding: false })
    .pipe(plumber())
    .pipe(sass({
      loadPaths: ['src/', 'node_modules/'],
    }, null))
    .pipe(gulpif(process.env.NODE_ENV === 'production', postcss([
      sortMediaQueries({ sort: 'desktop-first' }),
      autoprefixer(),
      cssnano({ preset: 'default' }),
    ])))
    .pipe(rename((file) => ({
      dirname: '.',
      basename: file.dirname,
      extname: '.min.css',
    })))
    .pipe(dest('build/css'));
}

function coreScripts() {
  return src(['src/scripts/core.js'], { encoding: false })
    .pipe(named((file) => path.basename('core', path.extname(file.path))))
    .pipe(webpack(webpackConfig))
    .pipe(dest('build/js'))
    .pipe(bs.stream());
}

function additionalScripts() {
  return src(['src/blocks/*/index.js'], { base: process.cwd(), encoding: false })
    .pipe(named((file) => path.basename(file.dirname.split('\\').slice(-1)[0], path.extname(file.path))))
    .pipe(webpack(webpackConfig))
    .pipe(dest('build/js'))
    .pipe(bs.stream());
}

function json() {
  return src(['src/**/*.json', '!src/data/data.json', '!src/pages/**/*.json'], { encoding: false })
    .pipe(merge({ fileName: 'data.json' }))
    .pipe(dest('src/data'));
}

function html() {
  return src('./src/pages/**/*.hbs')
    .pipe(data(function() {
      try {
        const data = JSON.parse(readFileSync('./src/data/data.json'));
        return data;
      } catch (err) {
        return null;
      }
    }))
    .pipe(data(function(file) {
      try {
        const data = JSON.parse(readFileSync('./src/data/' + path.basename(file.path).replace('.hbs', '.json')));
        return data;
      } catch (err) {
        return null;
      }
    }))
    .pipe(hb()
      .partials('./src/blocks/**/*.hbs')
      .partials('./src/layouts/**/*.hbs')
      .helpers(layouts)
    )
    .pipe(rename(function(path) {
      path.extname = '.html';
    }))
    .pipe(dest('build'))
    .pipe(browserSync.stream());
}

function assets() {
  return src(['public/**/*'], { encoding: false })
    .pipe(dest('build'));
}

function watching() {
  watch(['src/**/*.scss', '!src/blocks/**/*.scss'], coreStyles);
  watch(['src/blocks/**/*.scss'], additionalStyles);
  watch(['src/**/*.js', '!src/blocks/**/*.js'], coreScripts);
  watch(['src/blocks/**/*.js'], additionalScripts);
  watch(['src/**/*.json', '!src/data/data.json'], json);
  watch(['src/**/*.hbs', 'src/pages/**/*.hbs', 'src/data/data.json', 'src/pages/**/*.json', 'src/ui/icon/sprite.svg'], html);
  watch(['public/**/*'], assets);
  watch(['build/*.html']).on('change', bs.reload);
  watch(['src/**/*.scss']).on('change', bs.reload);
}

function server() {
  bs.init({
    ui: false,
    server: { baseDir: 'build' },
    timestamps: false,
  });
}

function clean() {
  return del('build/**/*', { force: true });
}

function sprite() {
  return src('public/assets/icons/*.svg')
    .pipe(plumber())
    .pipe(svgSprite({
      mode: {
        inline: true,
        symbol: { sprite: '../sprite.hbs' }
      }
    }))
    .pipe(dest('./src/blocks'));
}

export const build = series(
  clean,
  json,
  parallel(
    assets,
    coreStyles,
    additionalStyles,
    coreScripts,
    additionalScripts,
    html
  ),
  sprite
);

export default series(
  clean,
  json,
  parallel(
    assets,
    coreStyles,
    additionalStyles,
    coreScripts,
    additionalScripts,
    html
  ),
  parallel(watching, server)
);
