import { PrismaClient } from "@prisma/client";
import { getCipher } from "../crypto";
import { showDeleteLogMessage } from "../funcitons";

const prisma = new PrismaClient();

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

        const fileName = `${file.name}_${Date.now()}_crypto-file`;
        const encryptedFileRecord = await prisma.encryptedFile.create({
            data: {
                fileData: encryptedFile,
                fileName,
                fileType: file.type,
            },
        });

        const fiveMinutesInMs = 60000 * 5;
        setTimeout(() => {
            prisma.encryptedFile.delete({
                where: { id: encryptedFileRecord.id },
            });

            showDeleteLogMessage({
                fileId: encryptedFileRecord.id,
                fileName: encryptedFileRecord.fileName,
                title: "ENCRYPTED FILE DELETED",
            });
        }, fiveMinutesInMs);

        return Response.json({
            downloadLink: `/api/download/encrypted-file?fileId=${encryptedFileRecord.id}`,
        });
    } catch (e) {
        return new Response(
            "An error occurred while the file was being encrypted.",
            { status: 400 }
        );
    } finally {
        prisma.$disconnect();
    }
}
