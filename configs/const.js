/**
 * Created by jimmy on 2017/3/25.
 */

import userConfig from './user';
const _env = process.env.NODE_ENV || 'development';
let _host = '';
if(_env == 'development'){
    _host = `${userConfig.host}:${userConfig.port}`;
}

const envOpts = {
    development: {
        host: _host,
        apiHost: "http://106.15.37.147:8090",
        staticCdnPrefix: _host + '/',
        imageUrlPrefix: "http://ojxlorj0o.bkt.clouddn.com/",
        audioUrlPrefix: "http://ojxln8n7q.bkt.clouddn.com/",
        videoUrlPrefix: "http://video.goodtalk.com/"
    },
    sandbox: {
        host: "http://tripgm-sand.vr-fans.cn",
        apiHost: "http://localhost:8090",
        staticCdnPrefix: "http://106.15.37.147:9011/",
        imageUrlPrefix: "http://ojxlorj0o.bkt.clouddn.com/",
        audioUrlPrefix: "http://ojxln8n7q.bkt.clouddn.com/",
        videoUrlPrefix: "http://video.goodtalk.com/"
    },
    production: {
        host: "http://www.tripgm.com",
        apiHost: "http://localhost:8090",
        staticCdnPrefix: "http://static.tripgm.com/",
        imageUrlPrefix: "http://ojxlorj0o.bkt.clouddn.com/",
        audioUrlPrefix: "http://ojxln8n7q.bkt.clouddn.com/",
        videoUrlPrefix: "http://video.goodtalk.com/"
    }
};

export default Object.assign(envOpts[_env], {
    env: _env,
    mapGDkey: 'bbe7ace5c56534f3887203855832c070',
    mapBDkey: 'QDamXi1FHySAvXpuG4YhSzupM2lKdEjG'
});