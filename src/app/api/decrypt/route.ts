import { writeFileSync } from "fs";
import { getDecipher } from "../crypto";
import { createFoldersPathIfNotExist, delFileAfterTime } from "../functions";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const encryptedFile = formData.get("file") as File;

        const decipher = await getDecipher();
        const fileBuffer = await encryptedFile.arrayBuffer();

        const decryptedFile = Buffer.concat([
            decipher.update(Buffer.from(fileBuffer)),
            decipher.final(),
        ]);

        const extractSimpleNameRegex = /_\d+_crypto-file/; // Extract what is in quotation marks: file-name.txt"_123_crypto-file"
        const simpleFileName = encryptedFile.name.replace(
            extractSimpleNameRegex,
            ""
        );

        const foldersPath = "./public/decrypted-files";
        createFoldersPathIfNotExist(foldersPath);

        const fileName = `decrypted-file_${Date.now()}_${simpleFileName}`;
        const path = `${foldersPath}/${fileName}`;
        writeFileSync(path, decryptedFile);

        const fiveMinutesInMs = 60000 * 5;
        delFileAfterTime(path, fiveMinutesInMs);

        return Response.json({
            downloadLink: `decrypted-files/${fileName}`,
        });
    } catch (e) {
        console.error(e);
    }
}
