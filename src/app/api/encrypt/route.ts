import { writeFileSync } from "fs";
import { getCipher } from "../crypto";
import { delFileAfterTime } from "../functions";

export async function POST(req: Request, res: Response) {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    const cipher = await getCipher();
    const fileBuffer = await file.arrayBuffer();

    const encryptedFile = Buffer.concat([
        cipher.update(Buffer.from(fileBuffer)),
        cipher.final(),
    ]);

    const fileName = `${file.name}_${Date.now()}_crypto-file`;
    const path = `./public/encrypted-files/${fileName}`;
    writeFileSync(path, encryptedFile);

    const fiveMinutesInMs = 60 * 60 * 5 * 1000;
    delFileAfterTime(path, 10000); // TODO: Change

    return Response.json({
        downloadLink: `encrypted-files/${fileName}`,
    });
}
