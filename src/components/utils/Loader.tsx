import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function Loader(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={cn(
                "w-0.5 h-4 bg-foreground animate-spin",
                props.className
            )}
        />
    );
}
