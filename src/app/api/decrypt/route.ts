import { PrismaClient } from "@prisma/client";
import { getDecipher } from "../crypto";
import { showDeleteLogMessage } from "../funcitons";

const prisma = new PrismaClient();

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
        const fileName = `decrypted-file_${Date.now()}_${simpleFileName}`;
        const decryptedFileRecord = await prisma.decryptedFile.create({
            data: {
                fileName,
                fileType: encryptedFile.type,
                fileData: decryptedFile,
            },
        });

        const fiveMinutesInMs = 60000 * 5;
        setTimeout(() => {
            prisma.decryptedFile.delete({
                where: { id: decryptedFileRecord.id },
            });

            showDeleteLogMessage({
                fileId: decryptedFileRecord.id,
                fileName: decryptedFileRecord.fileName,
                title: "DECRYPTED FILE DELETED",
            });
        }, fiveMinutesInMs);

        return Response.json({
            downloadLink: `/api/download/decrypted-file?fileId=${decryptedFileRecord.id}`,
        });
    } catch (e) {
        return new Response(
            "An error occurred while the file was being decrypted.",
            { status: 400 }
        );
    } finally {
        prisma.$disconnect();
    }
}
