/**
 * Created by jimmy on 2017/3/24.
 */

import webpack from 'webpack';
import path from 'path';
import fs from 'fs';

let nodeModules = {};
fs.readdirSync('node_modules')
    .filter(item => {
        return ['.bin'].indexOf(item) == -1;
    })
    .forEach(item => {
        nodeModules[item] = 'commonjs ' + item;
    });

export default {
    name: 'server side build',
    context: __dirname,
    target: 'node',
    entry: [
        './app.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    externals: nodeModules,
    node: {
        __dirname: false,
        __filename: false
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'stage-0', 'react']
                    }
                }

            },
            {
                test: /\.(css|scss)$/,
                use: {
                    loader: 'null-loader'
                }
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|ttf|eot|svg)(\?.*)?$/i,
                use: [
                    {
                        loader: 'null-loader'
                    }
                ]
            }
        ]
    },
    plugins: [

    ]
}