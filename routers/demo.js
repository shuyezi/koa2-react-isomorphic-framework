/**
 * Created by jimmy on 2017/3/24.
 */

import React from 'react';
import koaRouter from 'koa-router';
const router = koaRouter({
    prefix: '/demo'
});

import Demo from '../src/views/demo';

router.get('/', async (ctx, next) => {
    const pageData = {
        name: '小吴',
        age: 18
    };

    ctx.render(<Demo data={pageData} source='back' />, {
        page: 'demo',
        title: '我是demo',
        data: pageData
    });
    await next();
});

export default router;