import { ActiveDecryptedFile } from "./ActiveDecryptedFile";
import { CompletedDecryptedFiles } from "./CompletedDecryptedFiles";
import { PendingDecryptedFiles } from "./PendingDecryptedFiles";

export function DecryptedFiles() {
    return (
        <div className="w-full space-y-10">
            <CompletedDecryptedFiles />
            <ActiveDecryptedFile />
            <PendingDecryptedFiles />
        </div>
    );
}
