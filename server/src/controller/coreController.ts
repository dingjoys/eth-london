import { DefaultResponse } from "../response"
import * as safeService from '../service/safeService'

export const getAccount = async (ctx) => {
    const { fid } = ctx.params
    const { owners: ownersStr } = ctx.request.query
    
    let owners = JSON.parse(ownersStr || "[]")
    console.log(fid, owners)
    if (!fid) {
        return (ctx.body = DefaultResponse())
    }
    let result = await safeService.getAccount(fid, owners)

    ctx.body = DefaultResponse(result)
}   