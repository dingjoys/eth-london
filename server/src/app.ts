import cors from "kcors";
import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import json from 'koa-json';
import logger from 'koa-logger';
import onerror from 'koa-onerror';
import accountRouter from './router/accountRouter';
import helloworldRouter from './router/helloworldRouter';
import swapRouter from "./router/swapRouter";
require('dotenv').config()
// export const privatekey = "e8bf34d06d398fa2998c1ec84e7e139f920d256eb43f20e8a9939f35f214bd7c"
// console.log(privatekey)
const app = new Koa();

app.use(async (ctx, next) => {
    const start = new Date();
    try {
        await next();
    } catch (error: any) {
        console.error(`APP - ${JSON.stringify({ error })} - ${error.stack}`
        );
        let code = 99
        if (error.toString().indexOf("expire") > -1) {
            return code = 104
        }

        ctx.body = {
            code: error.code || code,
            msg: error.msg || error.toString(),
        };
        return;
    }
    const ms = new Date().getTime() - start.getTime();
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});


const PORT = 3344;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

onerror(app)

app.use(cors());
app.use(bodyparser())
app.use(json())
app.use(logger())

app.use(accountRouter.routes())
app.use(swapRouter.routes())
app.use(helloworldRouter.routes())