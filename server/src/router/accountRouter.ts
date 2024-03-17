import Router from "koa-router";
import * as coreController from "../controller/coreController";
import { createAccount } from "../service/safeService";
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
    let result = await next()
    const { fid } = ctx.params
    const { owners: ownersStr } = ctx.request.query

    let owners = JSON.parse(ownersStr as any || "[]")
    console.log(owners)
    if (fid) {
        // createAccount(fid, owners)
        await createAccount(fid, owners)
    }
});

/**
 * Fetch account status
 */
accountRouter.get("/:fid", coreController.getAccount);


export default accountRouter