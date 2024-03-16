import Koa from 'koa';
import cors from "kcors";
import bodyparser from 'koa-bodyparser';
import json from 'koa-json';
import logger from 'koa-logger';
import onerror from 'koa-onerror';
import accountRouter from './router/accountRouter';
import frameRouter from './router/frameRouter';
require('dotenv').config()
// export const privatekey = process.env.PRIVATE_KEY as string
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
app.use(frameRouter.routes())