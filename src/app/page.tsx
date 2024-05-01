import { EncryptedFiles } from "@/components/files/encrypted-files";
import { EncryptedFilesForm } from "@/components/forms/components/EncryptedFilesForm";
import { H1 } from "@/components/ui/typography/H1";

export default function Home() {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-10">
            <H1>Encrypt</H1>
            <EncryptedFilesForm />
            <p className="text-foreground text-sm bg-yellow-600/80 p-1 rounded">
                This is just a test and why Crypto-File only supports small
                files of less than 5Mb. This will change soon.
            </p>
            <EncryptedFiles />
        </div>
    );
}
