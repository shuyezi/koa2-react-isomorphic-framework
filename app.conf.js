/**
 * Created by jimmy on 2017/3/24.
 */

import path from 'path';
import bodyParser from 'koa-bodyparser';
import staticServer from 'koa-static';
// import webpack from 'webpack';
// import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware';
// import webpackConfig from './webpack.server.conf';
// const compile = webpack(webpackConfig);
import Koa from 'koa';
const app = new Koa();

// app.use(devMiddleware(compile, {
//     // display no info to console (only warnings and errors)
//     noInfo: false,
//
//     // display nothing to the console
//     quiet: false,
//
//     // switch into lazy mode
//     // that means no watching, but recompilation on every request
//     lazy: true,
//
//     // watch options (only lazy: false)
//     watchOptions: {
//         aggregateTimeout: 300,
//         poll: true
//     },
//
//     // public path to bind the middleware to
//     // use the same as in webpack
//     publicPath: "/public/",
//
//     // custom headers
//     headers: { "X-Custom-Header": "yes" },
//
//     // options for formating the statistics
//     stats: {
//         colors: true
//     }
// }));
// app.use(hotMiddleware(compile, {
//     // log: console.log,
//     // path: '/__webpack_hmr',
//     // heartbeat: 10 * 1000
// }));

//middlewares
import renderMiddleware from './middlewares/render';
import errorsMiddleware from './middlewares/errors';
import logsMiddleware from './middlewares/logs';
app.use(logsMiddleware());
app.use(errorsMiddleware());
app.use(renderMiddleware());
app.use(bodyParser());

app.use(staticServer(path.join(__dirname, '..', 'public')));

import demoRouter from './routers/demo';
app.use(demoRouter.routes());

let _port = process.env.PORT || 8899;
app.listen(_port, ()=>console.log(`server is running: http://localhost:${_port}`));