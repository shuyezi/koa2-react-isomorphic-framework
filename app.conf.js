/**
 * Created by jimmy on 2017/3/24.
 */

import path from 'path';
import bodyParser from 'koa-bodyparser';
import staticServer from 'koa-static';
import Koa from 'koa';
const app = new Koa();

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