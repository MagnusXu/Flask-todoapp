{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf200
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const path = require('path');\
const webpack = require('webpack');\
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');\
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;\
\
module.exports = \{\
    entry: \{\
        app: './src/app.js'\
    \},\
    output: \{\
        path: path.join(__dirname, 'public'),\
        filename: '[name].js'\
    \},\
    resolve: \{\
        alias: \{\
            '@material-ui/core': '@material-ui/core/es',\
            '@material-ui/icons': '@material-ui/icons/es'\
        \}\
    \},\
    plugins: [\
        new webpack.DefinePlugin(\{\
            'process.env': \{\
                'NODE_ENV': JSON.stringify('production')\
            \}\
        \}),\
        // new BundleAnalyzerPlugin(),\
        new UglifyJsPlugin(\{\
            test: /\\.js($|\\?)/i,\
            sourceMap: true\
        \})\
    ],\
    optimization: \{\
        splitChunks: \{\
            cacheGroups: \{\
                commons: \{\
                    test: /[\\\\/]node_modules[\\\\/]/,\
                    name: "vendors",\
                    chunks: "all"\
                \}\
            \}\
        \}\
    \},\
    module: \{\
        rules: [\{\
            loader: 'babel-loader',\
            test: /\\.js$/,\
            exclude: /node_modules/\
        \}, \{\
            test: /\\.s?css$/,\
            use: [\
                'style-loader',\
                'css-loader',\
                'sass-loader'\
            ]\
        \}]\
    \},\
    devtool: 'cheap-module-eval-source-map',\
    devServer: \{\
        contentBase: path.join(__dirname, 'public'),\
        host: "localhost",\
        proxy: \{\
            '/app.js': \{\
                target: 'http://localhost:8080'\
            \},\
            '/vendors.js': \{\
                target: 'http://localhost:8080'\
            \},\
            '/**': \{\
                target: 'http://localhost:4000',\
                secure: false,\
                changeOrigin: true\
            \}\
        \}\
    \}\
\};\
}