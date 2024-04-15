import { FilesForm } from "@/components/forms/FilesForm";
import { H1 } from "@/components/ui/typography/H1";

export default function Home() {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-10">
            <H1>Encrypt</H1>
            <FilesForm />
        </div>
    );
}
