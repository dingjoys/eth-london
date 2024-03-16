
export const DefaultResponse = (data?, ctx?) => {
    return {
        data: data == null ? 200 : data,
        code: 0,
        msg: "success",
        auth: ctx?.auth
    }
}
export const DefaultError = (msg, code?) => {
    return {
        data: {},
        code: code || 99,
        msg
    }
}