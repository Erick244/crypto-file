import { FilesForm } from "@/components/forms/FilesForm";
import { FIles } from "@/components/main/FIles";
import { H1 } from "@/components/ui/typography/H1";
import FilesContextProvider from "@/contexts/FilesContext";

export default function Home() {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-10">
            <FilesContextProvider>
                <H1>Encrypt</H1>
                <FilesForm />
                <FIles />
            </FilesContextProvider>
        </div>
    );
}
