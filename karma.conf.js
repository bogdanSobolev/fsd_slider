// Karma configuration
// Generated on Fri Mar 12 2021 15:32:21 GMT+0300 (Москва, стандартное время)

const webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'webpack'],

    plugins: ['karma-webpack', 'karma-jasmine', "karma-chrome-launcher", "karma-jasmine-html-reporter"],

    // list of files / patterns to load in the browser
    files: [
      'src/**/*.spec.[jt]s'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.spec.[jt]s': [ 'webpack' ]
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // reporters: ['progress'],
    
    reporters: ['kjhtml'],
    // reporters: ['progress'],


    jasmineHtmlReporter : { 
      suppressAll : true , //  Подавить все сообщения (отменяет другие настройки подавления)  
      suppressFailed : true //  Подавить неудачные сообщения  
    },
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    // webpack: webpackConfig,
    webpack: {
      resolve: {
        extensions: ['.js', '.ts']
      },
      module: {
        rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                {
                    test: /\.html$/,
                    use: ['html-loader']
                },
                // {
                //     test: /\.pug$/,
                //     use: ['html-loader', 'pug-html-loader']
                // },
                {
                    test: /\.pug$/,
                    use: ['pug-loader']
                },
                // {
                //     test: /\.(scss|css)$/,
                //     use: [MiniCssExtractPlugin.loader,
                //         {
                //             loader: 'css-loader',
                //             options: {
                //                 url: true,
                //             },
                //         },
                //         'postcss-loader',
                //         // {
                //         //     loader: "resolve-url-loader",
                //         //     options: {
                //         //         absolute: true
                //         //     }
                //         // }, 
                //         { 
                //             loader : 'sass-loader',
                //             options: {
                //                 sourceMap: true
                //             }
                //         },
                //         // {
                //         //     loader: 'sass-resources-loader',
                //         //     options: {
                //         //         resources: './src/scss/resources.scss'
                //         //     }
                //         // }
                //     ],
                // },
            ],
        },
        optimization: {
            splitChunks: {
                chunks: "all",
                minSize: 1,
                minChunks: 2
            },
        },
      stats: {
          colors: true,
          modules: true,
          reasons: true,
          errorDetails: true
      },
      devtool: 'inline-source-map',
    },
    // webpackMiddleware: {
    //   noInfo:true
    // }
  })
}
