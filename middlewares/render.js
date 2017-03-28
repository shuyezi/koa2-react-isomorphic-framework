/**
 * Created by jimmy on 2017/3/24.
 */

import path from 'path';
import assetsMap from '../assetsMap';
import __CONFIG__ from '../configs/const';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const reactRender = (ctx, ele, internals = false) => {
    if(!ele){
        ctx.throw(404, 'Not Found React Tpl');
        return false;
    }else if(typeof ele !== 'object'){
        ctx.throw(400, 'Not Correct React Tpl');
        return false;
    }

    let render = internals ? ReactDOMServer.renderToString : ReactDOMServer.renderToStaticMarkup;
    return render(ele);
};

export default () => {

    return async (ctx, next) => {
        ctx.render = (tpl, opt = {}) => {
            const _tpl = !!tpl ? reactRender(ctx, tpl) : '';
            const _title = opt.title || '我是标题';
            const _page = opt.page || '';
            const _pageData = opt.data || {};

            const commonStatic = assetsMap[`static/common/index`];
            const pageStatic = assetsMap[`static/views/${_page}/index`];

            let _html = `
                <html>
                    <head>
                        <meta charSet="utf-8"/>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no,minimal-ui" />
                        <meta content="telephone=no,email=no" name="format-detection" />
                        <title>${_title}</title>
                        <link rel="stylesheet" href=${!!commonStatic && __CONFIG__.staticCdnPrefix + commonStatic['css']} />
                        <link rel="stylesheet" href=${!!pageStatic && __CONFIG__.staticCdnPrefix + pageStatic['css']} />
                    </head>
                    <body className="hold-transition skin-blue fixed sidebar-mini">
                        <div id="wrapper">${_tpl}</div>
                        <script>
                            window.APP = {
                                pageData: ${JSON.stringify(_pageData)}
                            };
                            //window.renderAPP && window.renderAPP();
                        </script>
                        <script src=${!!commonStatic && __CONFIG__.staticCdnPrefix + commonStatic['js']}></script>
                        <script src=${!!pageStatic && __CONFIG__.staticCdnPrefix + pageStatic['js']}></script>
                    </body>
                </html>
            `;
            ctx.body = _html;
        };

        await next();
    }
}