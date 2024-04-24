import { writeFileSync } from "fs";
import { getCipher } from "../crypto";
import { createFoldersPathIfNotExist, delFileAfterTime } from "../functions";

export async function POST(req: Request, res: Response) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        const cipher = await getCipher();
        const fileBuffer = await file.arrayBuffer();

        const encryptedFile = Buffer.concat([
            cipher.update(Buffer.from(fileBuffer)),
            cipher.final(),
        ]);

        const foldersPath = `./public/encrypted-files`;
        createFoldersPathIfNotExist(foldersPath);

        const fileName = `${file.name}_${Date.now()}_crypto-file`;
        const path = `${foldersPath}/${fileName}`;
        writeFileSync(path, encryptedFile);

        const fiveMinutesInMs = 60 * 60 * 5 * 1000;
        delFileAfterTime(path, fiveMinutesInMs);

        return Response.json({
            downloadLink: `encrypted-files/${fileName}`,
        });
    } catch (e) {
        console.error(e);
    }
}
