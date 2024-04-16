import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface FileContainerProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function FileContainer({ children, ...props }: FileContainerProps) {
    return (
        <div
            {...props}
            className={cn("w-full flex items-end gap-2", props.className)}
        >
            {children}
        </div>
    );
}
