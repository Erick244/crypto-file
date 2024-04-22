import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface HeaderRootProps extends HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}

export function HeaderRoot({ children, ...props }: HeaderRootProps) {
    return (
        <header
            {...props}
            id="header"
            className={cn(
                "flex items-center justify-between py-5 sticky top-0 bg-background/80 backdrop-blur-sm z-10",
                props.className
            )}
        >
            {children}
        </header>
    );
}
