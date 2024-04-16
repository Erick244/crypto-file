import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface FileContentTitleProps extends HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
}

export function FileContentTitle({
    children,
    ...props
}: FileContentTitleProps) {
    return (
        <div
            {...props}
            className={cn(
                "font-mono text-xs w-10 text-nowrap",
                props.className
            )}
        >
            {children}
        </div>
    );
}
