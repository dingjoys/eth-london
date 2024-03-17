import { baseValidator } from "./baseValidator";
import { holonymValidator } from "./holonymValidator";

export const IndexedCrendentials =
    ["HOLONYM", "BASE"]

export declare type CredentialValidatorParam = {
    HOLONYM: { type: "phone" | "id" },
    BASE: {}
}

export type CredentialValidator<T extends keyof CredentialValidatorParam> =
    (params: CredentialValidatorParam[T], owner: string) => Promise<boolean>;

export const getValidators: (type: String) => any = (type) => {
    if (type == "HOLONYM") {
        return holonymValidator;
    } else if (type == "BASE") {
        return baseValidator;
    } else {
        return undefined
    }
}