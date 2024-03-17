import Router from "koa-router";
import * as coreController from "../controller/coreController";
const accountRouter = Router();

accountRouter.prefix("/account");

// /**
//  * TODO - post
//  * Create internal account and initialize the credential
//  */
// accountRouter.get("/create", createAccount);

// /**
//  * TODO - post
//  * Update account credentials
//  */
// accountRouter.get("/update")


accountRouter.get("/:fid", async (ctx, next) => {
    await next()
    console.log("Next here")
});

/**
 * Fetch account status
 */
accountRouter.get("/:fid", coreController.getAccount);


export default accountRouter