import { writeFileSync } from "fs";
import { tmpdir } from "os";
import path from "path";
import { getCipher } from "../crypto";
import { createFoldersPathIfNotExist, delFileAfterTime } from "../functions";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        const cipher = await getCipher();
        const fileBuffer = await file.arrayBuffer();

        const encryptedFile = Buffer.concat([
            cipher.update(Buffer.from(fileBuffer)),
            cipher.final(),
        ]);

        const folderName = "encrypted-files";
        const foldersPath = path.join(tmpdir(), folderName);
        createFoldersPathIfNotExist(foldersPath);

        const fileName = `${file.name}_${Date.now()}_crypto-file`;
        const filePath = path.join(foldersPath, fileName);
        writeFileSync(filePath, encryptedFile);

        const fiveMinutesInMs = 60000 * 5;
        delFileAfterTime(filePath, fiveMinutesInMs);

        return Response.json({
            downloadLink: `/api/download?folderName=${folderName}&fileName=${encodeURIComponent(
                fileName
            )}`,
        });
    } catch (e) {
        return new Response(
            "An error occurred while the file was being encrypted.",
            { status: 400 }
        );
    }
}
