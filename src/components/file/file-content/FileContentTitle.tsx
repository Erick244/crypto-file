import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface FileContentTitleProps extends HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
}

export function FileContentTitle({
    children,
    ...props
}: FileContentTitleProps) {
    const textLength = (children as string).length;

    return (
        <div
            {...props}
            className={cn(
                "font-mono text-xs w-80 whitespace-nowrap sm:animate-none",
                textLength >= 60 ? "animate-marquee" : "animate-none",
                props.className
            )}
        >
            {children}
        </div>
    );
}
