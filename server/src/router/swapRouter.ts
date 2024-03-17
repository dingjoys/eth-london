import Router from "koa-router";
import * as coreController from "../controller/coreController";
import { DefaultResponse } from "../response";

const swapRouter = Router();

swapRouter.prefix("/ifo");

/**
 * Fetch account status
 */
swapRouter.get("/info", coreController.swapInfo);

swapRouter.get("/swap", async (ctx, next) => {
    await next()
    const { contractIndex, fid } = ctx.request.query
    await coreController.doSwap(contractIndex, fid)
});

swapRouter.get("/swap", async (ctx, next) => {
    return ctx.body = DefaultResponse()
});

export default swapRouter