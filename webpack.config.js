const path = require('path');
const htmlWebpack = require('html-webpack-plugin');

module.exports = {
    mode : 'development',
    devServer : {
        static : {
            directory : path.resolve(__dirname, 'bundle')
        },
        port : 3000,
        open : true,
        hot  : true,
        compress : true,
        historyApiFallback : true
    },
    entry : path.resolve(__dirname, 'src/index.js'),
    output : {
        path : path.resolve(__dirname, 'bundle'),
        filename : 'bundle.js',
        assetModuleFilename : '[name][ext]',
        clean : true
    },
    module : {
        rules : [
            {
                test : /\.js$/,
                exclude : /(node_modules)/,
                use : {
                    loader : 'babel-loader',
                    options : {
                        presets : ['@babel/preset-env']
                    }
                }
            },
            {
                test : /\.(css|scss)$/,
                use : ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test : /\.(jpg|png)$/,
                type : 'asset/resource'
            }
        ]
    },
    plugins : [
        new htmlWebpack({
            title : 'Like React',
            filename : 'index.html',
            template : path.resolve(__dirname, 'public/index.html')
        })
    ]
}