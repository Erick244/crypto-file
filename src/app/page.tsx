import { FilesForm } from "@/components/forms/FilesForm";
import { FIles } from "@/components/main/FIles";
import { H1 } from "@/components/ui/typography/H1";
import { LockKeyholeIcon } from "lucide-react";

export default function Home() {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-10">
            <H1 className="flex items-center gap-2">
                <LockKeyholeIcon className="w-10 h-10" /> | Encrypt
            </H1>
            <FilesForm postUrl="/api/encrypt" />
            <FIles />
        </div>
    );
}
