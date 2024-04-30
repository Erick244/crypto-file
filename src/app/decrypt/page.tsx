import { DecryptedFiles } from "@/components/files/decrypted-files";
import { DecryptedFilesForm } from "@/components/forms/components/DecryptedFilesForm";
import { H1 } from "@/components/ui/typography/H1";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Decrypt",
};

export default function Page() {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-10">
            <H1>Decrypt</H1>
            <DecryptedFilesForm />
            <DecryptedFiles />
        </div>
    );
}
