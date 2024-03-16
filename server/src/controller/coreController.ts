import { DefaultResponse } from "../response"

export const createAccount = async (ctx) => {
    const { owner } = ctx.request.params
    let result = await createAccount(owner)
    ctx.body = DefaultResponse(result)
}   