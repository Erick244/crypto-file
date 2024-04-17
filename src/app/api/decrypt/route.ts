import { writeFileSync } from "fs";
import { getDecipher } from "../crypto";

export async function POST(req: Request) {
    const formData = await req.formData();
    const encryptedFile = formData.get("file") as File;

    const decipher = await getDecipher();
    const fileBuffer = await encryptedFile.arrayBuffer();

    const decryptedFile = Buffer.concat([
        decipher.update(Buffer.from(fileBuffer)),
        decipher.final(),
    ]);

    const fileName = `decrypted-file_${Date.now()}_${encryptedFile.name.replace(
        /_\d+_crypto-file/,
        ""
    )}`;
    const path = `./public/decrypted-files/${fileName}`;
    writeFileSync(path, decryptedFile);

    return Response.json({
        downloadLink: `decrypted-files/${fileName}`,
    });
}
