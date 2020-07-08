const mix = require('laravel-mix')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
require('laravel-mix-eslint')

mix
  .js('resources/js/app.js', 'public/js')
  .eslint({
    fix: false,
    cache: false,
    emitWarning: process.env.NODE_ENV === 'development'
  })
  .sass('resources/sass/app.scss', 'public/css')
  .webpackConfig({
    devServer: {
      host: '0.0.0.0',
      port: 8080
    },
    watchOptions: {
      poll: 200,
      ignored: /node_modules/
    }
  })
