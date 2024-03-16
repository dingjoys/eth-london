"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const kcors_1 = __importDefault(require("kcors"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_json_1 = __importDefault(require("koa-json"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_onerror_1 = __importDefault(require("koa-onerror"));
const app = new koa_1.default();
app.use(async (ctx, next) => {
    const start = new Date();
    try {
        await next();
    }
    catch (error) {
        console.error(`APP - ${JSON.stringify({ error })} - ${error.stack}`);
        let code = 99;
        if (error.toString().indexOf("expire") > -1) {
            return code = 104;
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
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
(0, koa_onerror_1.default)(app);
app.use((0, kcors_1.default)());
app.use((0, koa_bodyparser_1.default)());
app.use((0, koa_json_1.default)());
app.use((0, koa_logger_1.default)());
