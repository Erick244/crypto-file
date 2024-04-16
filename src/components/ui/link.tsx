import { cn } from "@/lib/utils";
import Link from "next/link";
import { ComponentProps } from "react";

interface CryptoLinkProps extends ComponentProps<typeof Link> {
    children: React.ReactNode;
}

export function CryptoLink({ children, ...props }: CryptoLinkProps) {
    return (
        <Link
            {...props}
            className={cn(
                "py-3 w-10 flex justify-center items-center group overflow-hidden border-b-2 border-foreground bg-foreground/10 backdrop-blur-sm",
                props.className
            )}
        >
            {children}
            <div className="transition-all duration-300 w-full absolute top-0 left-0 h-0.5 bg-foreground -translate-x-[101%] group-hover:translate-x-0" />
            <div className="transition-all duration-300 delay-300 h-1/2 absolute top-0 left-0 w-0.5 bg-foreground -translate-y-[101%] group-hover:translate-y-0" />
            <div className="transition-all duration-300 delay-300 h-1/2 absolute bottom-0 right-0 w-0.5 bg-foreground translate-y-[101%] group-hover:translate-y-0" />
        </Link>
    );
}
