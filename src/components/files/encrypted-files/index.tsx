import { ActiveEncryptedFile } from "./ActiveEncryptedFile";
import { CompletedEncryptedFiles } from "./CompletedEncryptedFiles";
import { PendingEncryptedFiles } from "./PendingEncryptedFiles";

export function EncryptedFiles() {
    return (
        <div className="w-full space-y-10">
            <CompletedEncryptedFiles />
            <ActiveEncryptedFile />
            <PendingEncryptedFiles />
        </div>
    );
}
