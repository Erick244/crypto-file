import { writeFileSync } from "fs";
import { tmpdir } from "os";
import path from "path";
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

        const folderName = "decrypted-files";
        const foldersPath = path.join(tmpdir(), folderName);
        createFoldersPathIfNotExist(foldersPath);

        const fileName = `decrypted-file_${Date.now()}_${simpleFileName}`;
        const filePath = path.join(foldersPath, fileName);
        writeFileSync(filePath, decryptedFile);

        const fiveMinutesInMs = 60000 * 5;
        delFileAfterTime(filePath, fiveMinutesInMs);

        return Response.json({
            downloadLink: `/api/download?folderName=${folderName}&fileName=${encodeURIComponent(
                fileName
            )}`,
        });
    } catch (e) {
        return new Response(
            "An error occurred while the file was being decrypted.",
            { status: 400 }
        );
    }
}
