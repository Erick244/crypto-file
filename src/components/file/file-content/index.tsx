import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface FileContentProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function FileContent({ children, ...props }: FileContentProps) {
    return (
        <div
            {...props}
            className={cn(
                "grow space-y-1 text-ellipsis overflow-hidden",
                props.className
            )}
        >
            {children}
        </div>
    );
}
