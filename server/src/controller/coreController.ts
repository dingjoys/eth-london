import { DefaultResponse } from "../response"
import * as safeService from '../service/safeService'

export const getAccount = async (ctx) => {
    const { fid } = ctx.params
    
    if (!fid) {
        return (ctx.body = DefaultResponse())
    }
    let result = await safeService.getAccount(fid)

    ctx.body = DefaultResponse(result)
}   