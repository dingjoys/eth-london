import { DefaultResponse } from "../response"
import * as safeService from '../service/safeService'
import * as tokenService from '../service/tokenService'

export const getAccount = async (ctx) => {
    const { fid } = ctx.params

    if (!fid) {
        return (ctx.body = DefaultResponse())
    }
    let result = await safeService.getAccount(fid)
    
    ctx.body = DefaultResponse(result)
}

export const doSwap = async (contractIndex, fid) => {
    if (!fid) {
        return
    }
    await tokenService.proxySwap(contractIndex, fid);
}

export const swapInfo = async (ctx) => {
    const { contractIndex } = ctx.request.query
    ctx.body = await tokenService.swapInfo(contractIndex)
}


