import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, res: Response) {
    try {
        const { searchParams } = new URL(req.url);

        const fileId = Number(searchParams.get("fileId"));

        if (!fileId || fileId < 1) {
            return new Response("File ID is not valid", {
                status: 400,
            });
        }

        const file = await prisma.encryptedFile.findUnique({
            where: {
                id: fileId,
            },
        });

        if (!file) {
            return new Response("File not found", {
                status: 404,
            });
        }

        const { fileData, fileName } = file;

        return new Response(fileData, {
            headers: {
                "Content-Disposition": `attachment; filename=${fileName}`,
                "Content-Type": "application/octet-stream",
            },
        });
    } catch (error: any) {
        return new Response("An error occurred while reading the file.", {
            status: 400,
        });
    } finally {
        prisma.$disconnect();
    }
}
