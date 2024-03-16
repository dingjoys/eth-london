import Router from "koa-router";
import { createAccount } from "../controller/coreController";
const accountRouter = Router();

accountRouter.prefix("/account");

/**
 * TODO - post
 * Create internal account and initialize the credential
 */
accountRouter.get("/create", createAccount);

/**
 * TODO - post
 * Update account credentials
 */
accountRouter.get("/update")

/**
 * Fetch account status
 */
accountRouter.get("/:address");


export default accountRouter