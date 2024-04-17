import { FilesForm } from "@/components/forms/FilesForm";
import { FIles } from "@/components/main/FIles";
import { H1 } from "@/components/ui/typography/H1";
import { LockKeyholeOpenIcon } from "lucide-react";

export default function Page() {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-10">
            <H1 className="flex items-center gap-2">
                <LockKeyholeOpenIcon className="w-10 h-10" /> | Decrypt
            </H1>
            <FilesForm postUrl="/api/decrypt" />
            <FIles />
        </div>
    );
}
