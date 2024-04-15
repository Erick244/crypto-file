"use client";

import { FilesIcon, PlayIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";

export function FilesForm() {
    const [files, setFiles] = useState<FileList | null>(null);

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        const filesData = e.target.files;

        if (filesNotSelected(filesData)) {
            setFiles(null);
            return;
        }

        setFiles(filesData);
    }

    function filesNotSelected(files: FileList | null) {
        return !files || files.length < 1;
    }

    async function onSubmit(e: FormEvent) {
        e.preventDefault();

        if (filesNotSelected(files)) {
            toast({
                title: "Error",
                description: "Please select any file.",
            });
            return;
        }

        console.log(files);
    }

    return (
        <form
            onSubmit={onSubmit}
            className="w-full flex flex-col items-center gap-5"
        >
            <div className="cursor-pointer overflow-ellipsis relative h-52 max-w-xl w-full border-2 border-border border-dashed rounded bg-background flex justify-center items-center">
                <Input
                    onChange={onChange}
                    name="files"
                    type="file"
                    className="h-full w-full absolute opacity-0 cursor-pointer"
                    multiple
                />
                <div className="flex flex-col justify-center items-center text-muted-foreground gap-2">
                    <FilesIcon className="w-10 h-10" />
                    <span className="text-sm">Select or drop the file.</span>
                    {files && (
                        <span className="text-xs mx-2 text-center">
                            {files.length} selected.
                        </span>
                    )}
                </div>
            </div>

            <Button
                type="submit"
                className="px-20 relative group overflow-hidden"
                aria-label="Send"
                variant="outline"
            >
                <div className="transition-all duration-300 flex flex-col items-center absolute gap-5 top-2 group-hover:-translate-y-9">
                    <span>Send</span>
                    <PlayIcon className="w-4 h-4" />
                </div>
            </Button>
        </form>
    );
}
