/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */
const mix = require('laravel-mix');

mix.minify('resources/js/app.js', 'dist/assets/js/app.js')
    .minify('resources/js/options.js', 'dist/assets/js/options.js')
    .postCss('resources/css/app.css', 'assets/css', [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
    ])
    .disableSuccessNotifications()
    .setPublicPath('dist')
    .copy([
        'manifest.json',
        'views',
    ], 'dist')
    .copy('resources/icons', 'dist/assets/icons');
