import { writeFileSync } from "fs";
import { getDecipher } from "../crypto";
import { delFileAfterTime } from "../functions";

export async function POST(req: Request) {
    const formData = await req.formData();
    const encryptedFile = formData.get("file") as File;

    const decipher = await getDecipher();
    const fileBuffer = await encryptedFile.arrayBuffer();

    const decryptedFile = Buffer.concat([
        decipher.update(Buffer.from(fileBuffer)),
        decipher.final(),
    ]);

    const extractSimpleNameRegex = /_\d+_crypto-file/;
    const simpleFileName = encryptedFile.name.replace(
        extractSimpleNameRegex,
        ""
    );

    const fileName = `decrypted-file_${Date.now()}_${simpleFileName}`;
    const path = `./public/decrypted-files/${fileName}`;
    writeFileSync(path, decryptedFile);

    const fiveMinutesInMs = 60 * 60 * 5 * 1000;
    delFileAfterTime(path, 10000); // TODO: Change

    return Response.json({
        downloadLink: `decrypted-files/${fileName}`,
    });
}
