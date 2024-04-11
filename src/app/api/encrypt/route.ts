import { getCipher } from "../crypto";

export async function POST(req: Request, res: Response) {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    const cipher = await getCipher();
    const fileBuffer = await file.arrayBuffer();

    const encryptedFile = Buffer.concat([
        cipher.update(Buffer.from(fileBuffer)),
        cipher.final(),
    ]);

    const encryptedBase64 = encryptedFile.toString("base64");

    return Response.json({
        encrypted: `data:application/octet-stream;base64,${encryptedBase64}`,
    });
}
