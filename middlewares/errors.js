/**
 * Created by jimmy on 2017/3/24.
 */

export default () => {
    return async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            let status = err.status || 500;
            let message = err.message || '服务器错误';
            console.log(`[ERROR] 访问方法：${ctx.method} | 访问链接：${ctx.url} | 错误状态：${status} | 错误信息：${message}`);
            ctx.body = {
                'status': status,
                'message': message
            };
        }
    }
}