import { FileContainer } from "./FileContainer";
import { FileRoot } from "./FileRoot";
import { FileContent } from "./file-content";
import { FileContentTitle } from "./file-content/FileContentTitle";

export const File = {
    Root: FileRoot,
    Container: FileContainer,
    Content: {
        Root: FileContent,
        Title: FileContentTitle,
    },
};
