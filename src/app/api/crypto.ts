import { createCipheriv, createDecipheriv, randomBytes, scrypt } from "crypto";
import { promisify } from "util";

const iv = randomBytes(16);
const password = ">DWA^>d12234403DÂWÇDOL!";

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
