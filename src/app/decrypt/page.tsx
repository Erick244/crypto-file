import { DecryptedFilesForm } from "@/components/forms/components/DecryptedFilesForm";
import { Files } from "@/components/main/FIles";
import { H1 } from "@/components/ui/typography/H1";

export default function Page() {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-10">
            <H1>Decrypt</H1>
            <DecryptedFilesForm />
            <Files />
        </div>
    );
}
