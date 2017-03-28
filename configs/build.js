/**
 * Created by jimmy on 2017/3/24.
 */

import path from 'path';
const rootPath = process.cwd();

const baseConf = {
    rootPath,
    entriesPath: './src/views/**/index.js',
    releasePath: path.join(rootPath, './public/'),
    publicPath: '',
    sourcePath: path.join(rootPath, 'sourceMap/'),
    //配置需要拷贝的对象 | doc: https://www.npmjs.com/package/copy-webpack-plugin
    copyModules: [
        // {context: 'src/views', from: '**/*.jsx', to: '../views'}
    ],
    autoImportPackages: {
        React: 'react',
        ReactDOM: 'react-dom',
        // $: 'jquery',
        Utils: path.resolve(rootPath, 'src', 'common', 'javascript', 'utils.js'),
        Request: path.resolve(rootPath, 'src', 'common', 'javascript', 'request.js')
    },
    // server: {
    //     entriesPath: './app.js',
    //     releasePath: path.join(rootPath, './dist/'),
    //     publicPath: '',
    // }
};

export default {
    development: Object.assign({}, baseConf),
    production: Object.assign({}, baseConf)
}