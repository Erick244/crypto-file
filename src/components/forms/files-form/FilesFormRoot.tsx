import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface FilesFormRootProps extends HTMLAttributes<HTMLFormElement> {
    children: React.ReactNode;
}

export function FilesFormRoot({ children, ...props }: FilesFormRootProps) {
    return (
        <form
            {...props}
            className={cn(
                "w-full flex flex-col items-center gap-5",
                props.className
            )}
        >
            {children}
        </form>
    );
}
