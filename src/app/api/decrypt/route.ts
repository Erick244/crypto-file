import { getDecipher } from "../crypto";

export async function POST(req: Request, res: Response) {
    const formData = await req.formData();
    const encryptedFile = formData.get("file") as File;

    const decipher = await getDecipher();
    const fileBuffer = await encryptedFile.arrayBuffer();

    const decryptedFile = Buffer.concat([
        decipher.update(Buffer.from(fileBuffer)),
        decipher.final(),
    ]);

    const decryptedBase64 = decryptedFile.toString("base64");

    return Response.json({
        decrypted: `data:application/octet-stream;base64,${decryptedBase64}`,
    });
}
