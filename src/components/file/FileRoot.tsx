import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";
import { HTMLAttributes } from "react";

interface FileRootProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function FileRoot({ children, ...props }: FileRootProps) {
    return (
        <div
            {...props}
            className={cn("w-full flex items-end gap-1", props.className)}
        >
            <FileIcon className="w-9 h-9 flex-shrink-0" strokeWidth={1} />
            {children}
        </div>
    );
}
