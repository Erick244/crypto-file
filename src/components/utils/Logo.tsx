import { cn } from "@/lib/utils";
import Link from "next/link";
import { ComponentProps } from "react";

export function Logo(props: ComponentProps<typeof Link>) {
    return (
        <Link className={cn("flex gap-1", props.className)} {...props}>
            <div className="relative p-2">
                <span className="text-xl font-mono">crypto</span>
                <div className="w-full absolute top-0 left-0 h-0.5 bg-foreground" />
                <div className="w-full absolute bottom-0 left-0 h-0.5 bg-foreground" />
                <div className="h-1/2 absolute top-0 left-0 w-0.5 bg-foreground" />
                <div className="h-1/2 absolute bottom-0 right-0 w-0.5 bg-foreground " />
            </div>
            <div className="relative flex">
                <span className="text-sm font-mono mr-1">file</span>
                <div className="h-5 absolute top-0 right-0 w-0.5 bg-foreground animate-blink" />
            </div>
        </Link>
    );
}
