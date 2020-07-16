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
require('laravel-mix-polyfill')

mix
  .js('resources/js/app.js', 'public/js')
  .eslint({
    fix: false,
    cache: false,
    configFile: path.join(__dirname, '.eslintrc.js'),
    emitWarning: process.env.NODE_ENV === 'development'
  })
  .sass('resources/sass/app.scss', 'public/css')
  .polyfill({
    enabled: true,
    useBuiltIns: 'usage',
    targets: '> 0.25%, not dead'
  })
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
  .extract()

if (mix.inProduction()) {
  mix.version()
}
