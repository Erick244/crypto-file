import { FilesForm } from "@/components/forms/FilesForm";
import { Files } from "@/components/main/FIles";
import { H1 } from "@/components/ui/typography/H1";

export default function Page() {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-10">
            <H1>Decrypt</H1>
            <FilesForm postUrl="/api/decrypt" />
            <Files />
        </div>
    );
}
