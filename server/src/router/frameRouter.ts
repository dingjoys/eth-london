import Router from "koa-router";
const frameRouter = Router();

frameRouter.prefix("/frame");

frameRouter.get("/status/:id")

frameRouter.get("/swap")

/**
 * Frame image renderer
 */
frameRouter.get("/img1")

export default frameRouter