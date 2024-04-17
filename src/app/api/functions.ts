import { unlinkSync } from "fs";

export function delFileAfterTime(filePath: string, timeInMs: number): void {
    setTimeout(() => {
        unlinkSync(filePath);
        console.log(
            `\nDate - [${new Date().toISOString()}]
			 \nPath - [${filePath}] 
			 \n\x1b[41m DELETED \x1b[0m\n`
        );
    }, timeInMs);
}
