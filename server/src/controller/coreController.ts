import { DefaultResponse } from "../response"
import * as safeService from '../service/safeService'

export const createAccount = async (ctx) => {
    const { owner } = ctx.request.query
    let result = await safeService.createAccount(owner)
    ctx.body = DefaultResponse(result)
}   