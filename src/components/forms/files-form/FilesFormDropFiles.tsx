import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FilesIcon } from "lucide-react";
import { HTMLAttributes } from "react";

interface FilesFormDropFilesProps extends HTMLAttributes<HTMLInputElement> {
    label: string;
    selectedFilesCount: number;
}

export function FilesFormDropFiles({
    label,
    selectedFilesCount,
    ...props
}: FilesFormDropFilesProps) {
    const existSelectedFiles = selectedFilesCount > 0;

    return (
        <div
            className={cn(
                "cursor-pointer overflow-ellipsis relative h-52 max-w-xl w-full border-2 border-border border-dashed rounded bg-background flex justify-center items-center",
                props.className
            )}
        >
            <Input
                {...props}
                name="files"
                type="file"
                className="h-full w-full absolute opacity-0 cursor-pointer"
                multiple
            />
            <div className="flex flex-col justify-center items-center text-muted-foreground gap-2">
                <FilesIcon className="w-10 h-10" />
                <span className="text-sm">{label}</span>
                {existSelectedFiles && (
                    <span className="text-xs mx-2 text-center">
                        {selectedFilesCount} selected.
                    </span>
                )}
            </div>
        </div>
    );
}
