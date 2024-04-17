import { createCipheriv, createDecipheriv, scrypt } from "crypto";
import { promisify } from "util";

const password = process.env.CRYPTO_PASSWORD || "";
const iv = Buffer.from(process.env.CRYPTO_IV || "", "utf-8");

export async function getCipher() {
    const key = await getKey();
    return createCipheriv("aes-256-ctr", key, iv);
}

async function getKey() {
    return (await promisify(scrypt)(password, "salt", 32)) as Buffer;
}

export async function getDecipher() {
    const key = await getKey();
    return createDecipheriv("aes-256-ctr", key, iv);
}
