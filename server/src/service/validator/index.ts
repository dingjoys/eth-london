import { holonymValidator } from "./holonymValidator";

export const IndexedCrendentials =
    ["HOLONYM"]

export declare type CredentialValidatorParam = {
    HOLONYM: { type: "phone" | "id" }
}

export type CredentialValidator<T extends keyof CredentialValidatorParam> =
    (params: CredentialValidatorParam[T], owner: string) => Promise<boolean>;

export const getValidators: (type: String) => any = (type) => {
    if (type == "HOLONYM") {
        return holonymValidator;
    } else {
        return undefined
    }
}