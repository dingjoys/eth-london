import { DefaultResponse } from "../response"
import * as safeService from '../service/safeService'

export const getAccount = async (ctx) => {
    const { fid } = ctx.params
    const { owners: ownersStr } = ctx.request.query
    if (!fid) {
        return (ctx.body = DefaultResponse())
    }
    let owners = JSON.parse(ownersStr || "[]")
    let result = await safeService.getAccount(fid, owners)

    ctx.body = DefaultResponse(result)
}   