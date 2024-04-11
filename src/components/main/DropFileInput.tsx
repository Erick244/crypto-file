"use client";

import { FilesIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";

export function DropFileInput() {
    const [file, setFile] = useState<File | null>(null);

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        console.log(file);

        setFile(file);
    }

    return (
        <div className="cursor-pointer overflow-ellipsis relative h-52 max-w-xl w-full border-2 border-border border-dashed rounded bg-background flex justify-center items-center">
            <Input
                name="file"
                type="file"
                className="h-full w-full absolute opacity-0 cursor-pointer"
                onChange={onChange}
            />
            <div className="flex flex-col justify-center items-center text-muted-foreground gap-2">
                <FilesIcon className="w-10 h-10" />
                <span className="text-sm">Select or drop the file.</span>
                {file?.name && <span className="text-xs">{file.name}</span>}
            </div>
        </div>
    );
}
