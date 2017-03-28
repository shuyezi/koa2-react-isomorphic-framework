/**
 * Created by jimmy on 2017/3/24.
 */

import webpack from 'webpack';
import fs from 'fs';
import glob from 'glob';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import AssetsWebpackPlugin from 'assets-webpack-plugin';

import buildConfig from './configs/build';

const __ENV__ = process.env.NODE_ENV || 'development';
const __DEV__ = __ENV__ == 'development';
const __VERSION__ = '0.0.1';
const __CONFIGS__ = buildConfig[__ENV__];

const afterPlugin = () => {
    const assetsPath = path.join(__dirname, 'assetsMap.js');
    let assetsStr = fs.readFileSync(assetsPath).toString();
    assetsStr = 'export default ' + assetsStr;
    fs.writeFileSync(path.join(assetsPath), assetsStr);
};

const getEntry = ()=>{
    let entry = {};
    let list = glob.sync(__CONFIGS__.entriesPath);
    list.map(item => {
        if(!!item && path.extname(item) === '.js'){
            let _key = item
                .replace('src', 'static')
                .replace('.js', '')
                .replace('./', '');
            entry[_key] = item;
        }
    });
    entry['static/common/index'] = path.join(__dirname, 'src', 'common/index.js');
    console.log('entry', entry);
    return entry;
};

const getModule = ()=>{
    let _rules = [
        {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: [
                {
                    loader: 'babel-loader'
                }
            ]
        },
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        },
        {
            test: /\.(jpe?g|png|gif|woff|woff2|ttf|eot|svg)(\?.*)?$/i,
            use: [
                {
                    loader: 'file-loader',
                    query: {
                        hash: 'sha512',
                        digest: 'hex',
                        name: __DEV__ ? '/static/assets/[name].[ext]' : '/static/assets/[name].[hash].[ext]'
                    }
                }
            ]
        }
    ];

    return {
        rules: _rules
    }
};

const getPlugins = ()=>{
    let _plugins = [
        // extractSass,
        new ExtractTextPlugin(__DEV__ ? '[name].css' : '[name].[contenthash:12].css'),
        new AssetsWebpackPlugin({
            path: __dirname,
            filename: 'assetsMap.js'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "static/common/index",
            filename: __DEV__ ? '[name].js' : '[name].[hash:10].js'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': __DEV__ ? "'development'" : "'production'",
            ENV: __ENV__,
            VERSION: __VERSION__
        }),
        new webpack.ProvidePlugin(Object.assign({}, __CONFIGS__.autoImportPackages, {
            // Utils: path.join(__dirname, 'src', 'common', 'javascript', 'utils.js'),
            // $: "jquery"
        })),
        new CopyWebpackPlugin(__CONFIGS__.copyModules)
    ];
    _plugins.push(function () {
        this.plugin("done", afterPlugin);
    });
    return _plugins;
};

export default {
    entry: getEntry(),
    output: {
        path: __CONFIGS__.releasePath,
        filename: __DEV__ ? '[name].js' : '[name].[hash:12].js',
        publicPath: __CONFIGS__.publicPath
    },
    module: getModule(),
    plugins: getPlugins()
}