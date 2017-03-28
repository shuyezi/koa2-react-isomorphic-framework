/**
 * Created by jimmy on 2017/3/24.
 */

export default () => {
    return async (ctx, next) => {
        const start = new Date();
        await next();
        const ms = new Date() - start;
        console.log(`[INFO] 访问方法：${ctx.method} | 访问链接：${ctx.url} | 耗时：${ms}ms`);
    }
}