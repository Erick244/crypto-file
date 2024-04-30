import { readFileSync } from "fs";
import { tmpdir } from "os";
import path from "path";

export async function GET(req: Request, res: Response) {
    try {
        const { searchParams } = new URL(req.url);
        const folderName = searchParams.get("folderName");
        const fileName = searchParams.get("fileName");

        if (!fileName || !folderName) {
            return new Response("No file or folder name specified", {
                status: 404,
            });
        }

        const filePath = path.join(tmpdir(), folderName, fileName);
        const file = readFileSync(filePath);

        return new Response(file, {
            headers: {
                "Content-Disposition": `attachment; filename=${fileName}`,
                "Content-Type": "application/octet-stream",
            },
        });
    } catch (error: any) {
        return new Response("An error occurred while reading the file.", {
            status: 400,
        });
    }
}
