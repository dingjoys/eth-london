import Router from "koa-router";
import * as coreController from "../controller/coreController";
import { DefaultResponse } from "../response";

const swapRouter = Router();


/**
 * Fetch account status
 */
swapRouter.get("/info", coreController.swapInfo);

swapRouter.get("/swap", async (ctx, next) => {
    let result = await next()
    const { contractIndex, fid } = ctx.request.params
    await coreController.doSwap(contractIndex, fid)
});

swapRouter.get("/swap", async (ctx, next) => {
    return ctx.body = DefaultResponse()
});

export default swapRouter