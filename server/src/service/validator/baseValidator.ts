import { ethers } from "ethers";
import { getProvider } from "../../utils";
import { CredentialValidator } from ".";
import request from "request-promise";
// const request = require("request-promise");

export const invoke = async (method, uri, body?, header?) => {
    try {
        return await request({
            method,
            uri,
            rejectUnauthorized: false,
            body,
            timeout: 60000, //1min
            headers: Object.assign(
                {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                header
            ),
            json: true
        });
    } catch (error) {
    }
};

const fetchTxs = (owner) => {
    const host = "https://api.basescan.org/api";
    const apiKey = "TIA4PHSKSG97DMMWF8MYGQBJPRHXNYJ2AZ"
    let uri = `${host}?module=account&action=${"txlist"}&page=${1}&offset=${1000}&startblock=${1}&endblock=latest&sort=asc&apikey=${apiKey}&address=${owner}`;
    console.log(uri)
    return invoke(
        "GET",
        uri,
        {}
    );
}

export const baseValidator: CredentialValidator<"BASE"> = async (params, owner) => {
    const res = await fetchTxs(owner);
    return res?.items?.length > 0;
}