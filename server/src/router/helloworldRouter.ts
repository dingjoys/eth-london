import Router from "koa-router";
const helloworldRouter = Router();

helloworldRouter.get("/helloworld", async ctx => {
    ctx.body = { msg: "hello world" }
})

export default helloworldRouter