import { cn } from "@/lib/utils";
import Link from "next/link";
import { ComponentProps } from "react";

interface HeaderLinkProps extends ComponentProps<typeof Link> {
    children: React.ReactNode;
    isActive?: boolean;
}

export function HeaderLink({ children, isActive, ...props }: HeaderLinkProps) {
    return (
        <Link
            {...props}
            className={cn(
                "relative border-b-2 border-foreground p-2 group overflow-hidden",
                props.className
            )}
        >
            <div
                className={cn(
                    "transition-all duration-300 w-full absolute top-0 left-0 h-0.5 bg-foreground",
                    isActive
                        ? "translate-x-0"
                        : "-translate-x-[101%] group-hover:translate-x-0"
                )}
            />
            <div
                className={cn(
                    "transition-all duration-300 delay-300 h-1/2 absolute top-0 left-0 w-0.5 bg-foreground",
                    isActive
                        ? "translate-y-0"
                        : "-translate-y-[101%] group-hover:translate-y-0"
                )}
            />
            <div
                className={cn(
                    "transition-all duration-300 delay-300 h-1/2 absolute bottom-0 right-0 w-0.5 bg-foreground",
                    isActive
                        ? "translate-y-0"
                        : "translate-y-[101%] group-hover:translate-y-0"
                )}
            />

            {children}
        </Link>
    );
}
