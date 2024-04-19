import { existsSync, mkdirSync, unlinkSync } from "fs";

export function delFileAfterTime(filePath: string, timeInMs: number): void {
    setTimeout(() => {
        unlinkSync(filePath);
        console.log(
            `\nDate - [${new Date().toISOString()}]\nPath - [${filePath}]\n\x1b[41m DELETED \x1b[0m\n`
        );
    }, timeInMs);
}

export function createFoldersPathIfNotExist(path: string) {
    if (existsSync(path)) return;

    mkdirSync(path, { recursive: true });
}
